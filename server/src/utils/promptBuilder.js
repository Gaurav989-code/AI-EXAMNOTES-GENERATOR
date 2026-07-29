export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
You are a STRICT JSON generator for an exam preparation system.

⚠️ JSON INTEGRITY & STREAMING RULES (CRITICAL):
- Output MUST be valid JSON. Your response is parsed using JSON.parse().
- To prevent network truncation/timeouts, keep your entire response compact.
- Keep array lengths small: maximum 3-4 items per array.
- Use ONLY double quotes ".
- NO comments, NO trailing commas.
- Escape line breaks using \\n.
- Do NOT use emojis inside text values.

TASK:
Convert the given topic into exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language.
- Notes MUST be Markdown formatted. Headings and bullet points only, you can use paragraph, make visually impactful.
- Keep the "notes" string brief (max 300 words) to avoid JSON payload cutting off.

REVISION MODE RULES (CRITICAL):
- If REVISION MODE is ON:
  - Notes must be VERY SHORT (max 40 words). Only bullet points. Two-line answers only.
  - Definitions, formulas, keywords. No paragraphs. No explanations.
  - Content must feel like a last-day revision cheat sheet.
  - revisionPoints MUST summarize ALL important facts.
- If REVISION MODE is OFF:
  - Notes must be DETAILED but exam-focused. Max 4-5 lines per topic.
  - No storytelling, no extra theory.

IMPORTANCE RULES:
- Divide sub-topics into THREE categories:
  - Imp1: High priority core chapters (Max 5 items)
  - Imp2: Medium priority chapters (Max 3 items)
  - Imp3: Low priority/frequent side topics (Max 3 items)
- All three categories MUST be present.

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
  - diagram.data MUST be a SINGLE STRING of valid Mermaid syntax starting with: graph TD
  - Wrap EVERY node label in square brackets [ ]. Do NOT use special characters inside labels.
- If INCLUDE DIAGRAM is NO: diagram.data MUST be ""

CHART RULES (DATA TABLES):
- If INCLUDE CHARTS is YES:
  - charts array MUST contain exactly ONE chart object to save token space.
  - The object MUST follow this exact schema:
    {
      "title": "Clear Chart Title",
      "headers": ["Category Header Label", "Numerical Value Header (e.g. Weightage (%) or Effort (%))"],
      "rows": [
        ["Label 1", 45],
        ["Label 2", 40],
        ["Label 3", 15]
      ]
    }
  - Value column elements MUST be raw numbers (not strings) so the UI data bar component can render them accurately out of 100.
- If INCLUDE CHARTS is NO: charts MUST be []

STRICT STRUCTURAL ORDERING ORDER (Optimized for Early Sidebar Rendering):
You MUST output keys exactly in this order. Keep arrays short so the payload never cuts off mid-way.

{ 
  "subTopics": {
    "Imp1": ["Max 3 high-weightage topics"],
    "Imp2": ["Max 3 medium-weightage topics"],
    "Imp3": ["Max 3 minor topics"]
  },
  "importance": "Imp1",
  "notes": "Markdown formatted summary here (Max 200 words)",
  "revisionPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "questions": { 
    "short": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"], 
    "long": ["Q1", "Q2", "Q3", "Q4"], 
    "diagram": "Prompt string"
  },
  "diagram": { "type": "flowchart", "data": "graph TD\\n  A[Start] --> B[Process]" },
  "charts": [
    {
      "title": "Effort Distribution",
      "headers": ["Phase", "Effort (%)"],
      "rows": [
        ["Front-end Dev", 45],
        ["Back-end Dev", 40],
        ["Database Mgt", 15]
      ]
    }
  ]
}

RETURN ONLY VALID JSON. DO NOT ADD INTRO OR OUTRO TEXT.
`;
};
