import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { IoBarChart } from "react-icons/io5";
import { ImPieChart } from "react-icons/im";

// Shared Section Header component styled to match your dashboard theme
const SectionHeader = ({ icon: Icon, title, children }) => (
  <div className="mb-4 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-100 to-cyan-50 text-cyan-700 font-semibold flex items-center justify-between text-sm tracking-wide">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <span>{title}</span>
    </div>
    {children}
  </div>
);

// Custom styled layout wrapper for a cleaner tooltip interface
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 text-white p-3 rounded-lg shadow-xl text-xs font-sans">
        <p className="font-semibold text-slate-300 mb-1">
          {payload[0].payload.name}
        </p>
        <p className="font-bold text-cyan-400">
          Value: <span className="text-base">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const ReChartSetup = ({ charts }) => {
  // Local state to manage chart type toggle ('bar' or 'pie')
  const [chartMode, setChartMode] = useState("pie");

  if (!charts || !Array.isArray(charts) || charts.length === 0) return null;

  const themeColors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div className="space-y-6">
      {charts.map((chart, chartIndex) => {
        if (!chart.headers || !chart.rows) return null;

        const valueKey = chart.headers[1] || "Value";

        const formattedData = chart.rows.map((row) => {
          let cleanValue = 0;
          if (typeof row[1] === "number") {
            cleanValue = row[1];
          } else if (typeof row[1] === "string") {
            const sanitizedString = row[1].replace(/[^0-9.]/g, "");
            cleanValue = parseFloat(sanitizedString) || 0;
          }

          return {
            name: row[0],
            [valueKey]: cleanValue,
            value: cleanValue,
          };
        });

        return (
          <section
            key={`rechart-${chartIndex}`}
            className="w-full overflow-hidden"
          >
            <SectionHeader
              icon={IoBarChart}
              title={chart.title || "Data Analysis View"}
            >
              <button
                onClick={() =>
                  setChartMode(chartMode === "bar" ? "pie" : "bar")
                }
                className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white rounded-md shadow-xs border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors whitespace-nowrap shrink-0"
              >
                {chartMode === "bar" ? (
                  <>
                    <ImPieChart className="w-3.5 h-3.5 shrink-0" />
                    <span>Pie View</span>
                  </>
                ) : (
                  <>
                    <IoBarChart className="w-3.5 h-3.5 shrink-0" />
                    <span>Bar View</span>
                  </>
                )}
              </button>
            </SectionHeader>

            {/* Chart viewport canvas adapter box */}
            <div className="bg-gray-50/50 rounded-xl p-2 md:p-6 border border-gray-100 shadow-2xs w-full overflow-hidden">
              <div className="w-full h-64 md:h-72 font-sans text-[10px] md:text-xs select-none">
                <ResponsiveContainer width="100%" height="100%">
                  {chartMode === "bar" ? (
                    /* --- BAR CHART MODE --- */
                    <BarChart
                      data={formattedData}
                      margin={{ top: 15, right: 5, left: -25, bottom: 15 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E2E8F0"
                      />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        stroke="#64748B"
                        interval={0} // Forces all labels to display without skipping items on mobile
                        angle={window.innerWidth < 640 ? -15 : 0} // Rotates text strings on small viewports to prevent collision overlap
                        dx={window.innerWidth < 640 ? -5 : 0}
                        dy={window.innerWidth < 640 ? 5 : 0}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        stroke="#64748B"
                        tickFormatter={(val) => `${val}%`}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#F1F5F9", radius: 6 }}
                      />
                      <Bar
                        dataKey={valueKey}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={window.innerWidth < 640 ? 28 : 45} // Scales bar thicknesses down gracefully on narrow screens
                      >
                        {formattedData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={themeColors[index % themeColors.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    /* --- PIE CHART MODE --- */
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Pie
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value }) => `${value}%`}
                        // Dynamically reduces circular bounds on phone viewports to prevent outside marker cropping
                        outerRadius={window.innerWidth < 640 ? 60 : 85}
                        innerRadius={window.innerWidth < 640 ? 0 : 0}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {formattedData.map((entry, index) => (
                          <Cell
                            key={`pie-cell-${index}`}
                            fill={themeColors[index % themeColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ReChartSetup;
