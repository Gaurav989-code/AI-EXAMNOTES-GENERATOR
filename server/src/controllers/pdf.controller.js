import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({
        error: "No Content Provided",
      });
    }

    // Initialize document layout with comfortable margins for multi-page documents
    const doc = new PDFDocument({ margin: 50, bufferPages: true });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAi.pdf"',
    );

    doc.pipe(res);

    // --- BRAND PALETTE CONSTANTS (Clean and emoji-free) ---
    const colors = {
      textDark: "#1e293b", // slate-800
      textMuted: "#475569", // slate-600
      indigo: "#4f46e5", // indigo-600
      red: "#e11d48", // rose-600/red
      amber: "#d97706", // amber-600
      rose: "#db2777", // rose-600
      green: "#16a34a", // green-600
      purple: "#9333ea", // purple-600
    };

    // --- 1. TITLE & SUBTITLE ---
    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .fillColor(colors.indigo)
      .text("ExamNotes AI");

    doc
      .fontSize(10)
      .font("Helvetica-Oblique")
      .fillColor(colors.textMuted)
      .text("Your Personalized Study Companion", { lineGap: 15 });

    // Importance Priority Line
    if (result.importance) {
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor(colors.red)
        .text(`Priority Status: ${result.importance.toUpperCase()}`);
      doc.moveDown(1.5);
    }

    // --- 2. SUB TOPICS SECTION ---
    if (result.subTopics && typeof result.subTopics === "object") {
      renderSimpleHeader(doc, "Sub Topics Breakdown", colors.indigo);

      Object.entries(result.subTopics).forEach(([priority, topics]) => {
        if (Array.isArray(topics) && topics.length > 0) {
          let currentPriorityColor = colors.indigo;
          if (priority.toLowerCase() === "imp1")
            currentPriorityColor = colors.red;
          if (priority.toLowerCase() === "imp2")
            currentPriorityColor = colors.amber;

          doc.moveDown(0.2);
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor(currentPriorityColor)
            .text(`${priority.toUpperCase()} Chapters:`);

          topics.forEach((t) => {
            doc
              .fontSize(11)
              .font("Helvetica")
              .fillColor(currentPriorityColor)
              .text("  • ", { continued: true })
              .fillColor(colors.textDark)
              .text(t);
          });
          doc.moveDown(0.5);
        }
      });
      doc.moveDown(1);
    }

    // --- 3. REVISION POINTS ---
    if (
      Array.isArray(result.revisionPoints) &&
      result.revisionPoints.length > 0
    ) {
      renderSimpleHeader(doc, "Last-Minute Revision Points", colors.green);

      result.revisionPoints.forEach((p) => {
        doc
          .fontSize(11)
          .font("Helvetica")
          .fillColor(colors.green)
          .text("  - ", { continued: true })
          .fillColor(colors.textDark)
          .text(p);
        doc.moveDown(0.3);
      });
      doc.moveDown(1);
    }

    // --- 4. EXAM QUESTIONS SECTION ---
    if (result.questions) {
      renderSimpleHeader(doc, "Important Exam Questions", colors.rose);

      // Short Questions
      if (
        Array.isArray(result.questions.short) &&
        result.questions.short.length > 0
      ) {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor(colors.rose)
          .text("Short Answer Questions:");
        result.questions.short.forEach((q) => {
          doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor(colors.rose)
            .text("  • ", { continued: true })
            .fillColor(colors.textDark)
            .text(q);
        });
        doc.moveDown(0.8);
      }

      // Long Questions
      if (
        Array.isArray(result.questions.long) &&
        result.questions.long.length > 0
      ) {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor(colors.rose)
          .text("Long Answer Questions:");
        result.questions.long.forEach((q) => {
          doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor(colors.rose)
            .text("  • ", { continued: true })
            .fillColor(colors.textDark)
            .text(q);
        });
        doc.moveDown(0.8);
      }

      // Diagram Based Questions
      if (result.questions.diagram) {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor(colors.rose)
          .text("Diagram Target Questions:");
        if (Array.isArray(result.questions.diagram)) {
          result.questions.diagram.forEach((q) => {
            doc
              .fontSize(11)
              .font("Helvetica")
              .fillColor(colors.rose)
              .text("  • ", { continued: true })
              .fillColor(colors.textDark)
              .text(q);
          });
        } else if (typeof result.questions.diagram === "string") {
          doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor(colors.rose)
            .text("  • ", { continued: true })
            .fillColor(colors.textDark)
            .text(result.questions.diagram);
        }
      }
      doc.moveDown(1);
    }

    // --- 5. DETAILED STUDY NOTES (Line-by-Line Markdown Parser) ---
    if (result.notes) {
      renderSimpleHeader(doc, "Detailed Study Notes", colors.purple);

      // Split notes by line break to format sub-headings correctly
      const lines = result.notes.split("\n");

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          doc.moveDown(0.5); // Add spacing for empty lines
          return;
        }

        // Check if the page is running out of space before rendering a new line
        if (doc.y > doc.page.height - doc.page.margins.bottom - 20) {
          doc.addPage();
        }

        // Parse Heading 1 or Heading 2 (e.g., # Title or ## Subtitle)
        if (trimmed.startsWith("##") || trimmed.startsWith("#")) {
          const cleanHeading = trimmed.replace(/^[#\s]+/, "");
          doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor(colors.purple)
            .text(cleanHeading, { lineGap: 4 });
          doc.moveDown(0.2);
        }
        // Parse Heading 3 (e.g., ### Concept)
        else if (trimmed.startsWith("###")) {
          const cleanSubHeading = trimmed.replace(/^[#\s]+/, "");
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor(colors.textDark)
            .text(cleanSubHeading, { lineGap: 3 });
          doc.moveDown(0.2);
        }
        // Parse Bullet Points (e.g., - item or * item)
        else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          const cleanBullet = trimmed.replace(/^[-\*\s]+/, "");
          doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor(colors.purple)
            .text("  • ", { continued: true })
            .fillColor(colors.textDark)
            .text(cleanBullet, { align: "justify", lineGap: 2 });
        }
        // Regular Paragraphs
        else {
          const cleanText = trimmed.replace(/[\*]/g, ""); // Clean up any lingering bold asterisks
          doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor(colors.textDark)
            .text(cleanText, { align: "justify", lineGap: 2 });
        }
      });
    }

    doc.end();
  } catch (error) {
    console.error(
      "PDF generation pipeline encountered a critical error:",
      error,
    );
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Failed to generate PDF document.",
        details: error.message,
      });
    }
  }
};

// --- HELPER FUNCTION: Renders clean text headers ---
function renderSimpleHeader(doc, title, textColor) {
  // Prevent headers from being orphaned at the absolute bottom of a page
  if (doc.y > doc.page.height - doc.page.margins.bottom - 40) {
    doc.addPage();
  }

  doc.fontSize(14).font("Helvetica-Bold").fillColor(textColor).text(title);

  const currentY = doc.y;
  doc
    .moveTo(50, currentY - 2)
    .lineTo(562, currentY - 2)
    .strokeColor(textColor)
    .lineWidth(0.5)
    .stroke();

  doc.moveDown(1);
}
