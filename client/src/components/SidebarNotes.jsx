import React from "react";

const SidebarNotes = ({ result }) => {
  if (!result?.subTopics || !result?.questions) {
    return null; 
  }

  const { subTopics, questions } = result;

  const hasImp1 = subTopics.Imp1?.length > 0;
  const hasImp2 = subTopics.Imp2?.length > 0;
  const hasImp3 = subTopics.Imp3?.length > 0;
  const hasQuestions = questions.short?.length > 0;

  if (!hasImp1 && !hasImp2 && !hasImp3 && !hasQuestions) {
    return null;
  }

  return (
    <aside className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-6 font-sans">
      {/* Sidebar Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        📌 Quick Exam View
      </h2>

      <div className="space-y-6">
        {/* TOP PRIORITY (IMP1) */}
        {hasImp1 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-green-600 tracking-wider uppercase mb-3">
              <span>🔥</span> TOP PRIORITY (IMP1)
            </div>
            <ul className="space-y-2 pl-2">
              {subTopics.Imp1.map((topic, index) => (
                <li
                  key={`imp1-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-green-500 mt-1 select-none">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* MEDIUM PRIORITY (IMP2) */}
        {hasImp2 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 tracking-wider uppercase mb-3">
              <span>⚡</span> MEDIUM PRIORITY (IMP2)
            </div>
            <ul className="space-y-2 pl-2">
              {subTopics.Imp2.map((topic, index) => (
                <li
                  key={`imp2-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-amber-500 mt-1 select-none">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FREQUENT TOPICS (IMP3) */}
        {hasImp3 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 tracking-wider uppercase mb-3">
              <span>🎯</span> FREQUENT TOPICS (IMP3)
            </div>
            <ul className="space-y-2 pl-2">
              {subTopics.Imp3.map((topic, index) => (
                <li
                  key={`imp3-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-indigo-500 mt-1 select-none">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FREQUENT QUESTIONS */}
        {hasQuestions && (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 tracking-wider uppercase mb-3">
              <span>❓</span> FREQUENT QUESTIONS
            </div>
            <ul className="space-y-2 pl-2">
              {questions.short.map((question, index) => (
                <li
                  key={`q-${index}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-red-500 mt-1 select-none">•</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarNotes;
