import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BenchmarkResponse, FacilitySize, Region } from '../types/benchmark';
import { DIMENSIONS_META } from '../constants/dimensions';

export interface PDFReportData {
  apiResponse: BenchmarkResponse | null;
  facilitySize: FacilitySize;
  region: Region;
  finalScore: number;
  percentile: number;
  dimensionScores: Record<string, number>;
  weakestDimensionKey: string;
}

const REGION_LABELS: Record<string, string> = {
  latam: 'Latinoamérica',
  usa: 'Estados Unidos',
  europe: 'Europa',
  apac: 'Asia Pacífico',
  north_america: 'Norteamérica',
  asia_pacific: 'Asia Pacífico',
  other: 'Global / Otra',
};

const SIZE_LABELS: Record<string, string> = {
  small: 'Pequeño (< 1 MW)',
  medium: 'Mediano (1 - 5 MW)',
  large: 'Grande (5 - 20 MW)',
  mega: 'Hiperescala / Mega (> 20 MW)',
};

export const generateBenchmarkPDF = (data: PDFReportData): void => {
  const {
    apiResponse,
    facilitySize,
    region,
    finalScore,
    percentile,
    dimensionScores,
    weakestDimensionKey,
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let currentY = 16;

  // -------------------------------------------------------------
  // 1. Header Banner & Branding
  // -------------------------------------------------------------
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 30, 'F');

  // Accent line
  doc.setFillColor(59, 130, 246); // blue-500
  doc.rect(0, 30, pageWidth, 1.5, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('BENCHMARK·DC', margin, 13);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Informe Ejecutivo de Madurez Operativa y Eficiencia en Data Centers', margin, 19);

  // Date & Audit UUID
  const today = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`Fecha: ${today}`, pageWidth - margin, 13, { align: 'right' });
  doc.text(
    `UUID: ${apiResponse?.evaluation_id ? apiResponse.evaluation_id.slice(0, 22) + '...' : 'ANÓNIMO'}`,
    pageWidth - margin,
    19,
    { align: 'right' }
  );

  currentY = 38;

  // -------------------------------------------------------------
  // 2. Metadata / Context Box
  // -------------------------------------------------------------
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 12, 1.5, 1.5, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.text('Contexto:', margin + 4, currentY + 7.5);

  doc.setFont('helvetica', 'normal');
  const sizeText = SIZE_LABELS[facilitySize] || facilitySize;
  const regionText = REGION_LABELS[region] || region;
  doc.text(
    `Tamaño: ${sizeText}   |   Región: ${regionText}   |   Privacidad: Privacy by Design (K-Anonimato)`,
    margin + 24,
    currentY + 7.5
  );

  currentY += 17;

  // -------------------------------------------------------------
  // 3. Score Cards Grid
  // -------------------------------------------------------------
  const cardWidth = (pageWidth - margin * 2 - 6) / 2;
  const cardHeight = 24;

  // Card 1: Score Global
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 64, 175);
  doc.text('PUNTAJE GLOBAL DE MADUREZ', margin + 5, currentY + 6);

  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`${finalScore}`, margin + 5, currentY + 16);
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('/ 100', margin + 22, currentY + 16);

  const maturityLevel =
    finalScore >= 80
      ? 'Nivel 5: Élite / Autónomo'
      : finalScore >= 60
      ? 'Nivel 4: Avanzado / Proactivo'
      : finalScore >= 40
      ? 'Nivel 3: Estándar / Integrado'
      : finalScore >= 20
      ? 'Nivel 2: Básico / Fragmentado'
      : 'Nivel 1: Inicial / Reactivo';

  doc.setFontSize(7.5);
  doc.setTextColor(30, 58, 138);
  doc.text(maturityLevel, margin + 5, currentY + 21);

  // Card 2: Posicionamiento (Percentil)
  const card2X = margin + cardWidth + 6;
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(card2X, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 110);
  doc.text('POSICIONAMIENTO EN LA INDUSTRIA', card2X + 5, currentY + 6);

  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`Top ${Math.max(1, 100 - percentile)}%`, card2X + 5, currentY + 16);

  doc.setFontSize(7.5);
  doc.setTextColor(15, 118, 110);
  doc.text(`Percentil ${percentile}% vs universo de operadores`, card2X + 5, currentY + 21);

  currentY += cardHeight + 8;

  // -------------------------------------------------------------
  // 4. Dimension Breakdown Table (AutoTable)
  // -------------------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Evaluación por Dimensión Operativa', margin, currentY);
  currentY += 2.5;

  const tableBody = Object.keys(DIMENSIONS_META).map((key) => {
    const meta = DIMENSIONS_META[key];
    const likertScore = dimensionScores[key] || 3.0;
    const normalizedScore = Math.round(((likertScore - 1) / 4) * 100);
    const dimPercentile = apiResponse?.percentiles?.[key] ?? normalizedScore;
    const isWeakest = key.toLowerCase() === weakestDimensionKey.toLowerCase();

    return [
      isWeakest ? `${meta.name} (Cuello de Botella)` : meta.name,
      `${likertScore.toFixed(1)} / 5.0`,
      `${normalizedScore} / 100`,
      `Percentil ${dimPercentile}%`,
      isWeakest ? 'Atención Prioritaria' : normalizedScore >= 70 ? 'Fuerte' : 'Estándar',
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Dimensión Evaluada', 'Score Likert', 'Score 0-100', 'Posición', 'Diagnóstico']],
    body: tableBody,
    theme: 'striped',
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [51, 65, 85],
      cellPadding: 2,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 58 },
      1: { halign: 'center' },
      2: { halign: 'center' },
      3: { halign: 'center' },
      4: { halign: 'center', fontStyle: 'bold' },
    },
    margin: { left: margin, right: margin },
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  currentY = doc.lastAutoTable.finalY + 8;

  // -------------------------------------------------------------
  // 5. Weakness & AI Insights Block (DYNÁMICO)
  // -------------------------------------------------------------
  const weakestMeta = DIMENSIONS_META[weakestDimensionKey.toLowerCase()] || {
    name: weakestDimensionKey,
  };

  const explanation =
    apiResponse?.narratives?.weakness_explanation ||
    `Su centro de datos presenta oportunidades clave de mejora en ${weakestMeta.name}. Se identificaron discrepancias entre las capas operativas que incrementan la capacidad ociosa (Stranded Capacity).`;

  const practices =
    apiResponse?.narratives?.top_quartile_practices ||
    'Los operadores líderes del cuartil superior sincronizan telemetría en tiempo real, automatizan la atribución de cargas térmicas y reducen la intervención manual en ajustes de cooling y energía.';

  // Calculate text wrap lines
  const textWidth = pageWidth - margin * 2 - 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const splitExplanation = doc.splitTextToSize(explanation, textWidth);
  const splitPractices = doc.splitTextToSize(practices, textWidth);

  const expHeight = splitExplanation.length * 3.6;
  const pracHeight = splitPractices.length * 3.6;
  const weaknessBoxHeight = 8 + expHeight + 8 + pracHeight + 5;

  // Page break check if weakness box overflows
  if (currentY + weaknessBoxHeight > pageHeight - 20) {
    doc.addPage();
    currentY = 16;
  }

  // Draw container box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, weaknessBoxHeight, 1.5, 1.5, 'FD');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(153, 27, 27);
  doc.text(`Fricción Principal Identificada: ${weakestMeta.name}`, margin + 5, currentY + 6);

  // Explanation
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text(splitExplanation, margin + 5, currentY + 11.5);

  // Practices Title
  const practicesY = currentY + 11.5 + expHeight + 3.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('¿Qué hacen los operadores del Cuartil Superior (Top 25% Élite)?', margin + 5, practicesY);

  // Practices Content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(splitPractices, margin + 5, practicesY + 4.5);

  currentY += weaknessBoxHeight + 8;

  // -------------------------------------------------------------
  // 6. Actionable Recommendations (Plan Prioritario)
  // -------------------------------------------------------------
  // Check if we need a new page for recommendations
  if (currentY + 45 > pageHeight - 20) {
    doc.addPage();
    currentY = 16;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Plan de Acción Prioritario (Recomendaciones Técnicas)', margin, currentY);
  currentY += 4.5;

  const recs =
    apiResponse?.main_weakness?.recommendations && apiResponse.main_weakness.recommendations.length > 0
      ? apiResponse.main_weakness.recommendations
      : [
          'Implementar medición continua de telemetría y consolidar dashboards entre capas IT y electromecánica.',
          'Establecer umbrales dinámicos de balanceo térmico basados en la demanda real de cargas de trabajo.',
          'Automatizar los procesos de notificación y mitigación de capacidad ociosa (Stranded Capacity).',
        ];

  recs.forEach((rec, idx) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const splitRec = doc.splitTextToSize(rec, pageWidth - margin * 2 - 14);
    const itemHeight = Math.max(8.5, splitRec.length * 3.6 + 4);

    if (currentY + itemHeight > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
    }

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, itemHeight, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(37, 99, 235);
    doc.text(`${idx + 1}.`, margin + 3.5, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text(splitRec, margin + 9, currentY + 5);

    currentY += itemHeight + 2.5;
  });

  currentY += 3;

  // -------------------------------------------------------------
  // 7. Peer Comparison & Privacy Disclaimer
  // -------------------------------------------------------------
  if (apiResponse?.peer_comparison && apiResponse.peer_comparison.peers_count >= 3) {
    const peerComp = apiResponse.peer_comparison;
    const gapStr =
      peerComp.gap_vs_peers !== null
        ? `${peerComp.gap_vs_peers > 0 ? '+' : ''}${peerComp.gap_vs_peers}`
        : 'N/D';

    if (currentY + 12 > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(
      `Comparación de Pares: ${peerComp.peers_count} centros de datos similares evaluados en ${regionText} (Score promedio: ${peerComp.peer_average_score ?? 'N/D'}/5.0 | Gap: ${gapStr}).`,
      margin,
      currentY + 4
    );
  }

  // -------------------------------------------------------------
  // 8. Footer (in all pages)
  // -------------------------------------------------------------
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'BENCHMARK·DC Engine • Simulación No Country S07-26-Team-21 • Privacy by Design & Rebalanceo Bayesiano',
      pageWidth / 2,
      pageHeight - 7,
      { align: 'center' }
    );
    doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  }

  // Save the PDF
  const filename = `BENCHMARK_DC_Reporte_Ejecutivo_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
};
