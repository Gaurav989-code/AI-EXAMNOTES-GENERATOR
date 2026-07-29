import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";
import MermaidSetup from "./MermaidSetup";
import ReChartSetup from "./ReChartSetup";
import { downloadPdf } from "../services/api";

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-4 flex items-center gap-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-gray-800 mt-5 mb-3 border-b border-gray-100 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-gray-600 leading-relaxed mb-4 pl-2">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="space-y-2 pl-4 mb-4">{children}</ul>,
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm text-gray-600">
      <span className="text-indigo-500 mt-1 select-none">•</span>
      <span>{children}</span>
    </li>
  ),
};

const FinalResult = ({ result }) => {
  const [quickRevision, setQuickRevision] = useState(false);

  if (!result || !result.notes || !result.subTopics) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 font-sans">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 shrink-0">
          <span>📝</span> Generated Notes
        </h2>

        <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`w-full cursor-pointer md:w-auto px-3 py-2 text-center text-[11px] md:text-xs font-bold transition-colors tracking-wider uppercase rounded-lg shadow-sm border whitespace-nowrap min-h-[38px] flex items-center justify-center
                      ${quickRevision ? "bg-green-400 text-black border-green-400 hover:bg-green-500" : "text-green-600 bg-white border-green-200 hover:bg-green-50"}`}
          >
            {quickRevision ? "exit revision mode" : "quick revision (5 min)"}
          </button>

          <button
            onClick={() => downloadPdf(result)}
            className="w-full md:w-auto px-3 py-2 text-center cursor-pointer text-[11px] md:text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors tracking-wider uppercase shadow-sm whitespace-nowrap min-h-[38px] flex items-center justify-center"
          >
            Download Pdf
          </button>
        </div>
      </div>

      {/* --- NORMAL VIEW MODE --- */}
      {!quickRevision && (
        <div className="space-y-8">
          {/* Sub Topics Section */}
          <section>
            <SectionHeader
              icon="📚"
              title="Sub Topics Breakdown"
              color="indigo"
            />
            <ul className="space-y-2 pl-2">
              {result.subTopics.Imp1?.map((topic, index) => (
                <li
                  key={`imp1-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-red-500 mt-1 select-none">•</span>
                  <span>{topic}</span>
                </li>
              ))}
              {result.subTopics.Imp2?.map((topic, index) => (
                <li
                  key={`imp2-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-amber-500 mt-1 select-none">•</span>
                  <span>{topic}</span>
                </li>
              ))}
              {result.subTopics.Imp3?.map((topic, index) => (
                <li
                  key={`imp3-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-indigo-500 mt-1 select-none">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Notes Section */}
          <section className="prose max-w-none">
            <SectionHeader
              icon="📄"
              title="Detailed Study Notes"
              color="purple"
            />
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <ReactMarkdown components={markDownComponent}>
                {result.notes}
              </ReactMarkdown>
            </div>
          </section>

          {/* Questions Section */}
          {(result.questions?.long?.length > 0 ||
            result.questions?.short?.length > 0 ||
            result.questions?.diagram) && (
            <section>
              <SectionHeader
                icon="❓"
                title="Important Exam Questions"
                color="rose"
              />

              {result.questions.long?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-2 pl-2 uppercase tracking-wide">
                    Long Answer Questions
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {result.questions.long.map((question, index) => (
                      <li
                        key={`long-${index}`}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-rose-500 mt-1 select-none">
                          •
                        </span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.questions.short?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-2 pl-2 uppercase tracking-wide">
                    Short Answer Questions
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {result.questions.short.map((question, index) => (
                      <li
                        key={`short-${index}`}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-rose-400 mt-1 select-none">
                          •
                        </span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.questions?.diagram && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-2 pl-2 uppercase tracking-wide">
                    Diagram Questions
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {Array.isArray(result.questions.diagram) ? (
                      result.questions.diagram.map((question, index) => (
                        <li
                          key={`diag-q-${index}`}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-rose-400 mt-1 select-none">
                            •
                          </span>
                          <span>{question}</span>
                        </li>
                      ))
                    ) : (
                      // Completed the fallback block for single string string types
                      <li className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-rose-400 mt-1 select-none">
                          •
                        </span>
                        <span>{result.questions.diagram}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {/* --- QUICK REVISION MODE --- */}
      {quickRevision && (
        <section className="prose max-w-none animate-fadeIn">
          <SectionHeader
            icon="⚡"
            title="Exam Quick Revision Points"
            color="green"
          />
          <ul className="space-y-3 pl-2 mt-4">
            {result.revisionPoints?.map((point, index) => (
              <li
                key={`rev-${index}`}
                className="flex items-start gap-2 text-sm text-gray-700 bg-green-50/30 border border-green-100/50 rounded-xl p-3 shadow-2xs"
              >
                <span className="text-green-500 font-bold select-none">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mermaid Diagram Section */}
      {result.diagram?.data && (
        <section className="mt-6 space-y-4">
          <SectionHeader
            icon="🗺️"
            title="System Flowchart Diagram"
            color="blue"
          />

          <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
            <MermaidSetup diagram={result.diagram.data} />
          </div>

          <p className="text-xs text-slate-500 italic mt-2 flex items-center gap-1">
            💡{" "}
            <span>
              If you need this diagram for future reference, please take a
              screenshot to save it.
            </span>
          </p>
        </section>
      )}

      {/* Chart Section */}
      {Array.isArray(result.charts) && result.charts.length > 0 ? (
        <section className="mt-6 space-y-4">
          {/* Clean section header integration matching your design system */}
          <SectionHeader
            icon="📊"
            title="Data Visualization Charts"
            color="cyan"
          />

          <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
            {/* Pass result.charts array directly to the Recharts setup component */}
            <ReChartSetup charts={result.charts} />
          </div>

          <p className="text-xs text-slate-500 italic mt-2 flex items-center gap-1">
            💡{" "}
            <span>
              If you need this chart for future reference, please take a
              screenshot to save it.
            </span>
          </p>
        </section>
      ) : (
        <p className="text-xs text-slate-500 italic mt-2 flex items-center gap-1">
          💡 <span> Charts are not relevant to this topic. </span>
        </p>
      )}
    </div>
  );
};

function SectionHeader({ icon, title, color }) {
  const colors = {
    indigo: "from-indigo-100 to-indigo-50 text-indigo-700",
    purple: "from-purple-100 to-purple-50 text-purple-700",
    blue: "from-blue-100 to-blue-50 text-blue-700",
    green: "from-green-100 to-green-50 text-green-700",
    cyan: "from-cyan-100 to-cyan-50 text-cyan-700",
    rose: "from-rose-100 to-rose-50 text-rose-700",
  };

  return (
    <div
      className={`
          mb-4 px-4 py-2 rounded-lg
          bg-gradient-to-r ${colors[color] || colors.indigo}
          font-semibold flex items-center gap-2 text-sm tracking-wide
        `}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
}
export default FinalResult;
