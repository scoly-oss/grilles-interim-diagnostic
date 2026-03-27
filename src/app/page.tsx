"use client";

import { useState } from "react";
import XLSX from "xlsx-js-style";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Scale,
  Building2,
  Phone,
  Mail,
  ArrowDown,
  Info,
  BookOpen,
  TrendingDown,
  Clock,
  Euro,
  Moon,
  CalendarDays,
  Percent,
  Download,
  User,
  Briefcase,
  GraduationCap,
  Calculator,
} from "lucide-react";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const POINT_OFFICIEL = 4.92278;
const POINT_CLIENT = 4.92;

const fmt = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtEuro = (n: number) => fmt(n) + " €";

function parseDuree(duree: string): number {
  if (duree === "Terminal") return Infinity;
  let total = 0;
  const anMatch = duree.match(/(\d+)\s*an/);
  if (anMatch) total += parseInt(anMatch[1]);
  const moisMatch = duree.match(/(\d+)\s*mois/);
  if (moisMatch) total += parseInt(moisMatch[1]) / 12;
  return total;
}

/* ─────────────────────────── DATA ─────────────────────────── */

interface Echelon {
  ech: number;
  ib: number;
  im: number;
  duree: string;
  tbi: number;
}

interface ClientEchelon {
  ech: number;
  im: number;
  tbi: number;
}

// Official grids
const IDE_OFFICIEL: Echelon[] = [
  { ech: 1, ib: 444, im: 395, duree: "1 an", tbi: 1944.5 },
  { ech: 2, ib: 484, im: 424, duree: "1 an 6 mois", tbi: 2087.26 },
  { ech: 3, ib: 514, im: 447, duree: "2 ans", tbi: 2200.48 },
  { ech: 4, ib: 544, im: 468, duree: "2 ans", tbi: 2303.86 },
  { ech: 5, ib: 576, im: 491, duree: "2 ans 6 mois", tbi: 2417.08 },
  { ech: 6, ib: 611, im: 518, duree: "3 ans", tbi: 2550.0 },
  { ech: 7, ib: 653, im: 550, duree: "3 ans", tbi: 2707.53 },
  { ech: 8, ib: 693, im: 580, duree: "3 ans", tbi: 2855.21 },
  { ech: 9, ib: 732, im: 610, duree: "4 ans", tbi: 3002.9 },
  { ech: 10, ib: 778, im: 645, duree: "4 ans", tbi: 3175.19 },
  { ech: 11, ib: 821, im: 678, duree: "Terminal", tbi: 3337.64 },
];

const AS_OFFICIEL: Echelon[] = [
  { ech: 1, ib: 389, im: 373, duree: "1 an 6 mois", tbi: 1836.2 },
  { ech: 2, ib: 397, im: 375, duree: "1 an 6 mois", tbi: 1846.04 },
  { ech: 3, ib: 416, im: 377, duree: "2 ans", tbi: 1855.89 },
  { ech: 4, ib: 434, im: 388, duree: "2 ans", tbi: 1910.04 },
  { ech: 5, ib: 452, im: 401, duree: "2 ans 6 mois", tbi: 1974.03 },
  { ech: 6, ib: 468, im: 414, duree: "3 ans", tbi: 2038.03 },
  { ech: 7, ib: 491, im: 429, duree: "3 ans", tbi: 2111.87 },
  { ech: 8, ib: 510, im: 444, duree: "3 ans", tbi: 2185.71 },
  { ech: 9, ib: 535, im: 461, duree: "3 ans", tbi: 2269.4 },
  { ech: 10, ib: 567, im: 485, duree: "4 ans", tbi: 2387.55 },
  { ech: 11, ib: 610, im: 517, duree: "Terminal", tbi: 2545.08 },
];

const ASHQ_OFFICIEL: Echelon[] = [
  { ech: 1, ib: 367, im: 366, duree: "1 an", tbi: 1801.74 },
  { ech: 2, ib: 368, im: 367, duree: "1 an", tbi: 1806.66 },
  { ech: 3, ib: 370, im: 368, duree: "1 an", tbi: 1811.58 },
  { ech: 4, ib: 371, im: 369, duree: "1 an", tbi: 1816.51 },
  { ech: 5, ib: 374, im: 370, duree: "1 an", tbi: 1821.43 },
  { ech: 6, ib: 378, im: 371, duree: "1 an", tbi: 1826.35 },
  { ech: 7, ib: 381, im: 372, duree: "3 ans", tbi: 1831.27 },
  { ech: 8, ib: 387, im: 373, duree: "3 ans", tbi: 1836.2 },
  { ech: 9, ib: 401, im: 376, duree: "3 ans", tbi: 1850.97 },
  { ech: 10, ib: 419, im: 377, duree: "4 ans", tbi: 1855.89 },
  { ech: 11, ib: 432, im: 387, duree: "Terminal", tbi: 1905.12 },
];

// Client (wrong) data
const IDE_CLIENT: ClientEchelon[] = [
  { ech: 1, im: 390, tbi: 390 * POINT_CLIENT },
  { ech: 2, im: 419, tbi: 419 * POINT_CLIENT },
  { ech: 3, im: 442, tbi: 442 * POINT_CLIENT },
  { ech: 4, im: 463, tbi: 463 * POINT_CLIENT },
  { ech: 5, im: 486, tbi: 486 * POINT_CLIENT },
  { ech: 6, im: 513, tbi: 513 * POINT_CLIENT },
  { ech: 7, im: 545, tbi: 545 * POINT_CLIENT },
  { ech: 8, im: 575, tbi: 575 * POINT_CLIENT },
  { ech: 9, im: 605, tbi: 605 * POINT_CLIENT },
  { ech: 10, im: 640, tbi: 640 * POINT_CLIENT },
];

const AS_CLIENT: ClientEchelon[] = [
  { ech: 1, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 2, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 3, im: 359, tbi: 359 * POINT_CLIENT },
  { ech: 4, im: 370, tbi: 370 * POINT_CLIENT },
  { ech: 5, im: 383, tbi: 383 * POINT_CLIENT },
  { ech: 6, im: 396, tbi: 396 * POINT_CLIENT },
  { ech: 7, im: 409, tbi: 409 * POINT_CLIENT },
  { ech: 8, im: 424, tbi: 424 * POINT_CLIENT },
  { ech: 9, im: 439, tbi: 439 * POINT_CLIENT },
  { ech: 10, im: 456, tbi: 456 * POINT_CLIENT },
];

const ASHQ_CLIENT: ClientEchelon[] = [
  { ech: 1, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 2, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 3, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 4, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 5, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 6, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 7, im: 352, tbi: 352 * POINT_CLIENT },
  { ech: 8, im: 354, tbi: 354 * POINT_CLIENT },
  { ech: 9, im: 363, tbi: 363 * POINT_CLIENT },
  { ech: 10, im: 372, tbi: 372 * POINT_CLIENT },
];

interface CorpsConfig {
  id: string;
  label: string;
  fullLabel: string;
  officiel: Echelon[];
  client: ClientEchelon[];
  explanation: string;
  decree: string;
}

const CORPS: CorpsConfig[] = [
  {
    id: "ide",
    label: "IDE",
    fullLabel: "Infirmier en soins généraux - Grade 1",
    officiel: IDE_OFFICIEL,
    client: IDE_CLIENT,
    explanation:
      "Vos indices correspondent aux anciennes grilles d’avant le reclassement Ségur (décret n°2021-1262 du 29/09/2021). Les indices ont été revalorisés de +5 points à chaque échelon.",
    decree: "Décret n°2021-1262 du 29 septembre 2021",
  },
  {
    id: "as",
    label: "Aide-soignant",
    fullLabel: "Aide-soignant – Classe normale",
    officiel: AS_OFFICIEL,
    client: AS_CLIENT,
    explanation:
      "Vos indices correspondent aux anciennes grilles de catégorie C. Les aides-soignants ont été reclassés en catégorie B par le décret n°2021-1260. Les écarts vont de −18 à −29 points d’indice majoré, soit jusqu’à −144 €/mois.",
    decree: "Décret n°2021-1260 du 29 septembre 2021",
  },
  {
    id: "ashq",
    label: "ASHQ",
    fullLabel:
      "Agent des services hospitaliers qualifié – Classe normale",
    officiel: ASHQ_OFFICIEL,
    client: ASHQ_CLIENT,
    explanation:
      "Vos indices sont obsolètes. La grille a été revalorisée à plusieurs reprises. Vous utilisez un IM de 352 sur les 7 premiers échelons alors que les indices officiels vont de 366 à 372.",
    decree: "Décrets successifs de revalorisation du minimum de traitement",
  },
];

/* ─────────────────────────── EXPORT EXCEL ─────────────────────────── */

// Style presets
const S = {
  titleOrange: { font: { name: "Trebuchet MS", bold: true, sz: 16, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "E8842C" } }, alignment: { horizontal: "center" as const, vertical: "center" as const } },
  subtitle: { font: { name: "Trebuchet MS", italic: true, sz: 12, color: { rgb: "666666" } } },
  headerNavy: { font: { name: "Trebuchet MS", bold: true, sz: 12, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1E2D3D" } }, border: { bottom: { style: "thin" as const, color: { rgb: "E8842C" } } }, alignment: { horizontal: "center" as const, vertical: "center" as const } },
  headerGreen: { font: { name: "Trebuchet MS", bold: true, sz: 12, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "16A34A" } }, alignment: { horizontal: "center" as const, vertical: "center" as const } },
  cellOk: { font: { name: "Trebuchet MS", sz: 12 }, fill: { fgColor: { rgb: "F0FDF4" } }, alignment: { horizontal: "center" as const, vertical: "center" as const }, border: { bottom: { style: "thin" as const, color: { rgb: "E5E7EB" } } } },
  cellBad: { font: { name: "Trebuchet MS", sz: 12, color: { rgb: "DC2626" } }, fill: { fgColor: { rgb: "FEF2F2" } }, alignment: { horizontal: "center" as const, vertical: "center" as const }, border: { bottom: { style: "thin" as const, color: { rgb: "E5E7EB" } } } },
  cellBadBold: { font: { name: "Trebuchet MS", bold: true, sz: 12, color: { rgb: "DC2626" } }, fill: { fgColor: { rgb: "FEF2F2" } }, alignment: { horizontal: "center" as const, vertical: "center" as const }, border: { bottom: { style: "thin" as const, color: { rgb: "E5E7EB" } } } },
  cellMissing: { font: { name: "Trebuchet MS", bold: true, sz: 12, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "DC2626" } }, alignment: { horizontal: "center" as const, vertical: "center" as const } },
  cellNormal: { font: { name: "Trebuchet MS", sz: 12 }, alignment: { horizontal: "center" as const, vertical: "center" as const }, border: { bottom: { style: "thin" as const, color: { rgb: "F3F4F6" } } } },
  cellAlt: { font: { name: "Trebuchet MS", sz: 12 }, fill: { fgColor: { rgb: "F9FAFB" } }, alignment: { horizontal: "center" as const, vertical: "center" as const }, border: { bottom: { style: "thin" as const, color: { rgb: "F3F4F6" } } } },
  noteLabel: { font: { name: "Trebuchet MS", bold: true, sz: 11, color: { rgb: "E8842C" } } },
  noteValue: { font: { name: "Trebuchet MS", sz: 11, color: { rgb: "4B5563" } } },
  brandFooter: { font: { name: "Trebuchet MS", bold: true, sz: 11, color: { rgb: "E8842C" } }, alignment: { horizontal: "center" as const } },
  totalRow: { font: { name: "Trebuchet MS", bold: true, sz: 13, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "E8842C" } }, alignment: { horizontal: "center" as const, vertical: "center" as const } },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type R = any;

function exportDiagnosticExcel() {
  const wb = XLSX.utils.book_new();

  // --- Diagnostic sheets ---
  CORPS.forEach((corps) => {
    const rows: R[][] = [];

    // Title row (merged)
    rows.push([{ v: "DIAGNOSTIC — " + corps.fullLabel, s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }]);
    rows.push([{ v: "Analyse réalisée par DAIRIA Avocats — " + new Date().toLocaleDateString("fr-FR"), s: S.subtitle }]);
    rows.push([{ v: "Point d'indice officiel : " + POINT_OFFICIEL + " € | Client : " + POINT_CLIENT + " €", s: S.subtitle }]);
    rows.push([]);

    // Header
    rows.push([
      { v: "Éch.", s: S.headerNavy },
      { v: "Votre IM", s: S.headerNavy },
      { v: "IM officiel", s: S.headerNavy },
      { v: "Écart IM", s: S.headerNavy },
      { v: "Votre TBI (€)", s: S.headerNavy },
      { v: "TBI officiel (€)", s: S.headerNavy },
      { v: "Écart (€/mois)", s: S.headerNavy },
    ]);

    const maxLen = Math.max(corps.client.length, corps.officiel.length);
    for (let i = 0; i < maxLen; i++) {
      const c = corps.client[i];
      const o = corps.officiel[i];
      if (c && o) {
        const diffIM = c.im - o.im;
        const diffTBI = Math.round((c.tbi - o.tbi) * 100) / 100;
        const bad = diffIM !== 0;
        const cs = bad ? S.cellBad : S.cellOk;
        const csB = bad ? S.cellBadBold : S.cellOk;
        rows.push([
          { v: i + 1, s: S.cellNormal },
          { v: c.im, s: cs },
          { v: o.im, s: S.cellNormal },
          { v: diffIM, s: csB },
          { v: Math.round(c.tbi * 100) / 100, s: cs },
          { v: Math.round(o.tbi * 100) / 100, s: S.cellNormal },
          { v: diffTBI, s: csB },
        ]);
      } else if (o) {
        rows.push([
          { v: i + 1, s: S.cellNormal },
          { v: "MANQUANT", s: S.cellMissing },
          { v: o.im, s: S.cellNormal },
          { v: "", s: S.cellNormal },
          { v: "", s: S.cellNormal },
          { v: Math.round(o.tbi * 100) / 100, s: S.cellNormal },
          { v: "", s: S.cellNormal },
        ]);
      }
    }

    rows.push([]);
    rows.push([{ v: "Explication :", s: S.noteLabel }, { v: corps.explanation, s: S.noteValue }]);
    rows.push([{ v: "Décret :", s: S.noteLabel }, { v: corps.decree, s: S.noteValue }]);
    rows.push([]);
    rows.push([{ v: "DAIRIA Avocats — s.coly@dairia-avocats.com — 06 72 42 24 86", s: S.brandFooter }]);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    ];
    XLSX.utils.book_append_sheet(wb, ws, corps.label.substring(0, 31));
  });

  // --- Grilles officielles sheets ---
  CORPS.forEach((corps) => {
    const rows: R[][] = [];
    rows.push([{ v: corps.fullLabel + " — Grille officielle", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }]);
    rows.push([{ v: "Point d'indice : " + POINT_OFFICIEL + " € (arrêté 13/07/2023) — " + corps.decree, s: S.subtitle }]);
    rows.push([]);
    rows.push([
      { v: "Éch.", s: S.headerGreen },
      { v: "IB", s: S.headerGreen },
      { v: "IM", s: S.headerGreen },
      { v: "Durée", s: S.headerGreen },
      { v: "TBI mensuel (€)", s: S.headerGreen },
    ]);
    corps.officiel.forEach((o, i) => {
      const s = i % 2 === 0 ? S.cellNormal : S.cellAlt;
      rows.push([
        { v: o.ech, s },
        { v: o.ib, s },
        { v: o.im, s },
        { v: o.duree, s },
        { v: Math.round(o.tbi * 100) / 100, s },
      ]);
    });
    rows.push([]);
    rows.push([{ v: "DAIRIA Avocats — s.coly@dairia-avocats.com", s: S.brandFooter }]);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 16 }, { wch: 20 }];
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];
    XLSX.utils.book_append_sheet(wb, ws, "Officiel " + corps.label.substring(0, 21));
  });

  // --- Primes sheet ---
  const primesRows: R[][] = [];
  primesRows.push([{ v: "PRIMES ET INDEMNITÉS OBLIGATOIRES — FPH", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }]);
  primesRows.push([]);
  primesRows.push([
    { v: "Prime", s: S.headerNavy },
    { v: "Montant", s: S.headerNavy },
    { v: "Base de calcul", s: S.headerNavy },
    { v: "Référence légale", s: S.headerNavy },
  ]);
  const primesList = [
    ["CTI (Prime Ségur)", "241,22 €/mois", "49 points × 4,92278 €", "Décret 2020-1152"],
    ["Prime de nuit", "25% du traitement horaire", "Par heure entre 21h et 6h", "Décret 2023-1238"],
    ["IDJF (Dimanches/Fériés)", "60 €/jour", "Forfaitaire pour 8h", "Décret 2021-1411"],
    ["IFM (Intérim)", "10% du brut total", "Code du travail L.1251-32", "IDCC 1413"],
    ["ICCP (Intérim)", "10% du (brut + IFM)", "Code du travail L.1251-19", "IDCC 1413"],
  ];
  primesList.forEach((p, i) => {
    const s = i % 2 === 0 ? S.cellNormal : S.cellAlt;
    primesRows.push(p.map(v => ({ v, s })));
  });
  primesRows.push([]);
  primesRows.push([{ v: "DAIRIA Avocats — Expert en droit du travail et de la paie", s: S.brandFooter }]);

  const wsPrimes = XLSX.utils.aoa_to_sheet(primesRows);
  wsPrimes["!cols"] = [{ wch: 26 }, { wch: 24 }, { wch: 32 }, { wch: 28 }];
  wsPrimes["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
  XLSX.utils.book_append_sheet(wb, wsPrimes, "Primes FPH");

  XLSX.writeFile(wb, "diagnostic_grilles_remuneration_DAIRIA.xlsx");
}

function exportGrillesExcel() {
  const wb = XLSX.utils.book_new();

  CORPS.forEach((corps) => {
    const rows: R[][] = [];
    rows.push([{ v: corps.fullLabel, s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }, { v: "", s: S.titleOrange }]);
    rows.push([{ v: "Source : décrets publiés au Journal Officiel — " + corps.decree, s: S.subtitle }]);
    rows.push([{ v: "Valeur du point d'indice : " + POINT_OFFICIEL + " € (arrêté du 13/07/2023)", s: S.subtitle }]);
    rows.push([]);
    rows.push([
      { v: "Échelon", s: S.headerNavy },
      { v: "Indice brut (IB)", s: S.headerNavy },
      { v: "Indice majoré (IM)", s: S.headerNavy },
      { v: "Durée dans l'échelon", s: S.headerNavy },
      { v: "Traitement brut mensuel (€)", s: S.headerNavy },
    ]);
    corps.officiel.forEach((o, i) => {
      const s = i % 2 === 0 ? S.cellNormal : S.cellAlt;
      rows.push([
        { v: o.ech, s },
        { v: o.ib, s },
        { v: o.im, s },
        { v: o.duree, s },
        { v: Math.round(o.tbi * 100) / 100, s },
      ]);
    });
    rows.push([]);
    rows.push([{ v: "DAIRIA Avocats — s.coly@dairia-avocats.com — 06 72 42 24 86", s: S.brandFooter }]);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 10 }, { wch: 18 }, { wch: 18 }, { wch: 22 }, { wch: 28 }];
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];
    XLSX.utils.book_append_sheet(wb, ws, corps.label.substring(0, 31));
  });

  XLSX.writeFile(wb, "grilles_officielles_FPH_2026_DAIRIA.xlsx");
}

/* ─────────────────────────── NAV ─────────────────────────── */

const NAV_ITEMS = [
  { href: "#constat", label: "Constat" },
  { href: "#diagnostic", label: "Diagnostic" },
  { href: "#risques", label: "Risques" },
  { href: "#plafonds", label: "Plafonds" },
  { href: "#plan", label: "Plan d'action" },
  { href: "#anciennete", label: "Ancienneté" },
  { href: "#grilles", label: "Grilles officielles" },
  { href: "#primes", label: "Primes FPH" },
  { href: "#fpt", label: "FP Territoriale" },
  { href: "#contact", label: "Contact" },
];

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

function DairiaLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-primary to-orange-light flex items-center justify-center">
        <Scale className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-bold text-lg tracking-tight text-navy">
          DAIRIA <span className="text-orange-primary">Avocats</span>
        </div>
        <div className="text-[11px] text-navy-light/70 -mt-0.5 tracking-wide">
          Droit du travail &amp; de la paie
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  children,
  subtitle,
  id,
}: {
  children: React.ReactNode;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy">{children}</h2>
      {subtitle && (
        <p className="mt-2 text-navy-light/70 text-lg">{subtitle}</p>
      )}
      <div className="mt-3 w-16 h-1 bg-gradient-to-r from-orange-primary to-orange-light rounded-full" />
    </div>
  );
}

function StatCard({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "danger" | "warning" | "orange";
}) {
  const colorMap = {
    danger: "bg-danger/10 text-danger border-danger/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    orange: "bg-orange-primary/10 text-orange-primary border-orange-primary/20",
  };
  return (
    <div
      className={`rounded-xl border p-6 text-center ${colorMap[color]}`}
    >
      <Icon className="w-8 h-8 mx-auto mb-3" />
      <div className="text-2xl sm:text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 opacity-80">{label}</div>
    </div>
  );
}

function ComparisonTable({
  corps,
}: {
  corps: CorpsConfig;
}) {
  const maxEchelons = Math.max(corps.officiel.length, corps.client.length);
  const rows = [];
  for (let i = 0; i < maxEchelons; i++) {
    const off = corps.officiel[i];
    const cli = corps.client[i];
    const ecartIM = off && cli ? off.im - cli.im : null;
    const tbiOff = off ? off.tbi : null;
    const tbiCli = cli ? cli.tbi : null;
    const ecartEuro = tbiOff !== null && tbiCli !== null ? tbiOff - tbiCli : null;
    const isMissing = off && !cli;
    const isMatch = ecartIM !== null && ecartIM === 0;
    const isWrong = ecartIM !== null && ecartIM !== 0;

    rows.push(
      <tr
        key={i}
        className={`border-b border-gray-100 ${
          isMissing
            ? "bg-danger/5"
            : isWrong
            ? "bg-danger/5"
            : isMatch
            ? "bg-success/5"
            : ""
        }`}
      >
        <td className="px-3 py-2.5 text-center font-semibold text-sm">
          {off?.ech ?? cli?.ech}
        </td>
        <td className="px-3 py-2.5 text-center text-sm">
          {cli ? cli.im : (
            <span className="text-danger font-medium text-xs">Absent</span>
          )}
        </td>
        <td className="px-3 py-2.5 text-center text-sm font-medium">
          {off?.im ?? "–"}
        </td>
        <td className="px-3 py-2.5 text-center text-sm">
          {isMissing ? (
            <span className="inline-flex items-center gap-1 text-danger font-semibold">
              <XCircle className="w-3.5 h-3.5" /> Manquant
            </span>
          ) : ecartIM !== null ? (
            ecartIM === 0 ? (
              <span className="inline-flex items-center gap-1 text-success font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> 0
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-danger font-semibold">
                <XCircle className="w-3.5 h-3.5" /> +{ecartIM}
              </span>
            )
          ) : (
            "–"
          )}
        </td>
        <td className="px-3 py-2.5 text-center text-sm hidden sm:table-cell">
          {tbiCli !== null ? fmtEuro(tbiCli) : "–"}
        </td>
        <td className="px-3 py-2.5 text-center text-sm font-medium hidden sm:table-cell">
          {tbiOff !== null ? fmtEuro(tbiOff) : "–"}
        </td>
        <td className="px-3 py-2.5 text-center text-sm hidden sm:table-cell">
          {isMissing ? (
            <span className="text-danger font-semibold text-xs">
              Échelon manquant
            </span>
          ) : ecartEuro !== null ? (
            ecartEuro === 0 ? (
              <span className="text-success font-medium">0 €</span>
            ) : (
              <span className="text-danger font-semibold">
                +{fmtEuro(ecartEuro)}
              </span>
            )
          ) : (
            "–"
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-navy">
        <thead>
          <tr className="bg-navy text-white text-xs uppercase tracking-wider">
            <th className="px-3 py-3 rounded-tl-lg">Éch.</th>
            <th className="px-3 py-3">Vos IM</th>
            <th className="px-3 py-3">IM officiels</th>
            <th className="px-3 py-3">Écart IM</th>
            <th className="px-3 py-3 hidden sm:table-cell">Votre TBI</th>
            <th className="px-3 py-3 hidden sm:table-cell">TBI officiel</th>
            <th className="px-3 py-3 rounded-tr-lg hidden sm:table-cell">
              Écart €/mois
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function OfficialGrid({ data, title }: { data: Echelon[]; title: string }) {
  return (
    <div>
      <h4 className="font-semibold text-navy mb-3">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy/5 text-navy text-xs uppercase tracking-wider">
              <th className="px-3 py-2">Éch.</th>
              <th className="px-3 py-2">IB</th>
              <th className="px-3 py-2">IM</th>
              <th className="px-3 py-2 hidden sm:table-cell">Durée</th>
              <th className="px-3 py-2">TBI mensuel</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.ech} className="border-b border-gray-100">
                <td className="px-3 py-2 text-center font-semibold">
                  {e.ech}
                </td>
                <td className="px-3 py-2 text-center">{e.ib}</td>
                <td className="px-3 py-2 text-center font-medium">{e.im}</td>
                <td className="px-3 py-2 text-center hidden sm:table-cell text-navy-light/70">
                  {e.duree}
                </td>
                <td className="px-3 py-2 text-center font-semibold text-orange-primary">
                  {fmtEuro(e.tbi)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RiskCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-danger/20 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-danger" />
        </div>
        <div>
          <h4 className="font-bold text-navy text-lg">{title}</h4>
          <p className="mt-1 text-navy-light/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── CALCULATEUR ANCIENNETÉ ─────────────────────────── */

function AncienneteCalculateur() {
  const [selectedCorps, setSelectedCorps] = useState("ide");
  const [annees, setAnnees] = useState(0);

  const corpsMap: Record<string, { label: string; data: Echelon[] }> = {
    ide: { label: "IDE — Infirmier en soins généraux", data: IDE_OFFICIEL },
    as: { label: "Aide-soignant", data: AS_OFFICIEL },
    ashq: { label: "ASHQ", data: ASHQ_OFFICIEL },
  };

  const data = corpsMap[selectedCorps].data;

  // Walk through echelons to find the right one
  let cumul = 0;
  let resultEchelon = data[data.length - 1]; // default to last
  for (const ech of data) {
    const dureeVal = parseDuree(ech.duree);
    if (dureeVal === Infinity || annees < cumul + dureeVal) {
      resultEchelon = ech;
      break;
    }
    cumul += dureeVal;
  }

  return (
    <div className="bg-gradient-to-br from-navy/5 to-orange-primary/5 border border-orange-primary/20 rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-orange-primary" />
        Calculateur d&apos;échelon par ancienneté
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Corps
          </label>
          <select
            value={selectedCorps}
            onChange={(e) => setSelectedCorps(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange-primary/50 focus:border-orange-primary bg-white"
          >
            {Object.entries(corpsMap).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Années d&apos;ancienneté dans le corps
          </label>
          <input
            type="number"
            min={0}
            max={40}
            value={annees}
            onChange={(e) => setAnnees(Math.max(0, Math.min(40, Number(e.target.value))))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange-primary/50 focus:border-orange-primary bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-orange-primary/20 p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-navy-light/70 mb-1">Échelon calculé</p>
            <p className="text-3xl font-bold text-navy">{resultEchelon.ech}</p>
          </div>
          <div>
            <p className="text-sm text-navy-light/70 mb-1">Indice majoré (IM)</p>
            <p className="text-3xl font-bold text-orange-primary">{resultEchelon.im}</p>
          </div>
          <div>
            <p className="text-sm text-navy-light/70 mb-1">Traitement brut mensuel</p>
            <p className="text-3xl font-bold text-navy">{fmtEuro(resultEchelon.tbi)}</p>
          </div>
        </div>
        <p className="text-xs text-navy-light/60 mt-4 text-center">
          Durée dans cet échelon : {resultEchelon.duree} — Point d&apos;indice : {fmt(POINT_OFFICIEL)} €
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */

export default function Page() {
  const [activeCorps, setActiveCorps] = useState("ide");
  const [openGrids, setOpenGrids] = useState<Record<string, boolean>>({
    ide: true,
    as: false,
    ashq: false,
  });
  const [mobileNav, setMobileNav] = useState(false);

  const toggleGrid = (id: string) =>
    setOpenGrids((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeCorpsData = CORPS.find((c) => c.id === activeCorps)!;

  // compute max ecart for stats
  const allEcarts: number[] = [];
  for (const corps of CORPS) {
    for (let i = 0; i < corps.client.length; i++) {
      const off = corps.officiel[i];
      const cli = corps.client[i];
      if (off && cli) {
        const ecart = off.tbi - cli.tbi;
        if (ecart > 0) allEcarts.push(ecart);
      }
    }
  }
  const maxEcart = Math.max(...allEcarts);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <DairiaLogo />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-navy-light/70 hover:text-orange-primary transition-colors rounded-lg hover:bg-orange-primary/5"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Menu"
            >
              <div className="w-5 h-0.5 bg-navy mb-1" />
              <div className="w-5 h-0.5 bg-navy mb-1" />
              <div className="w-5 h-0.5 bg-navy" />
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileNav && (
            <div className="md:hidden pb-4 border-t border-gray-100 pt-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNav(false)}
                  className="block px-3 py-2 text-sm font-medium text-navy-light/70 hover:text-orange-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-light rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Shield className="w-4 h-4" />
            Cabinet expert en droit du travail et de la paie
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Diagnostic de vos grilles
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-primary to-orange-light">
              de r&eacute;mun&eacute;ration
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Analyse comparative de vos grilles int&eacute;rimaires avec les
            grilles officielles en vigueur dans la Fonction Publique
            Hospitali&egrave;re et Territoriale
          </p>
          <a
            href="#constat"
            className="inline-flex items-center gap-2 mt-10 bg-gradient-to-r from-orange-primary to-orange-light text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            D&eacute;couvrir le diagnostic
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── SECTION 2: LE CONSTAT ── */}
      <section id="constat" className="scroll-mt-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Des écarts significatifs identifiés">
            Le constat
          </SectionTitle>

          <div className="bg-gradient-to-r from-danger/5 to-warning/5 border border-danger/20 rounded-2xl p-6 sm:p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-danger" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-danger">
                  Alerte : grilles non conformes
                </h3>
                <p className="mt-2 text-navy-light leading-relaxed">
                  Vos grilles de r&eacute;mun&eacute;ration pr&eacute;sentent
                  des{" "}
                  <strong>
                    &eacute;carts significatifs avec les grilles officielles en
                    vigueur
                  </strong>
                  . Les indices utilis&eacute;s ne correspondent pas aux grilles
                  actuelles issues des d&eacute;crets de revalorisation
                  S&eacute;gur de 2021. De plus, il manque le 11&egrave;me
                  &eacute;chelon sur chaque corps dans vos grilles.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <StatCard
              value={`-${Math.round(maxEcart)} €/mois`}
              label="Écart maximum constaté (AS)"
              icon={TrendingDown}
              color="danger"
            />
            <StatCard
              value="3 corps"
              label="concernés : IDE, AS, ASHQ"
              icon={AlertTriangle}
              color="warning"
            />
            <StatCard
              value="Obsolètes"
              label="Grilles pré-Ségur 2021"
              icon={Clock}
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DIAGNOSTIC DÉTAILLÉ ── */}
      <section
        id="diagnostic"
        className="scroll-mt-20 py-16 sm:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Comparaison échelon par échelon">
            Diagnostic détaillé par corps
          </SectionTitle>

          <div className="flex justify-end mb-4">
            <button
              onClick={exportDiagnosticExcel}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Exporter le diagnostic en Excel
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {CORPS.map((corps) => (
              <button
                key={corps.id}
                onClick={() => setActiveCorps(corps.id)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  activeCorps === corps.id
                    ? "bg-orange-primary text-white shadow-md"
                    : "bg-gray-100 text-navy-light hover:bg-gray-200"
                }`}
              >
                {corps.label}
              </button>
            ))}
          </div>

          {/* Active corps */}
          <div className="bg-warm-bg rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-navy/[0.02]">
              <h3 className="font-bold text-navy text-lg">
                {activeCorpsData.fullLabel}
              </h3>
              <p className="text-sm text-navy-light/60 mt-0.5">
                {activeCorpsData.decree}
              </p>
            </div>

            <div className="p-4 sm:p-6">
              <ComparisonTable corps={activeCorpsData} />

              {/* Info about missing 11th echelon */}
              <div className="mt-4 flex items-start gap-3 bg-warning/5 border border-warning/20 rounded-xl p-4">
                <Info className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-navy-light leading-relaxed">
                  <strong>11&egrave;me &eacute;chelon manquant.</strong> Il
                  manque &eacute;galement le 11&egrave;me &eacute;chelon dans
                  vos grilles pour chaque corps. La grille officielle comporte 11
                  &eacute;chelons.
                </p>
              </div>

              {/* Explanation card */}
              <div className="mt-4 bg-orange-primary/5 border border-orange-primary/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-orange-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-navy mb-1">
                      Pourquoi cet &eacute;cart ?
                    </h4>
                    <p className="text-sm text-navy-light leading-relaxed">
                      {activeCorpsData.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Point d'indice note */}
              <div className="mt-4 flex items-start gap-3 bg-navy/5 border border-navy/10 rounded-xl p-4">
                <Info className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
                <p className="text-sm text-navy-light leading-relaxed">
                  <strong>Valeur du point d&apos;indice :</strong> Vous utilisez{" "}
                  {fmt(POINT_CLIENT)} €. La valeur officielle est de{" "}
                  <strong>{fmt(POINT_OFFICIEL)} €</strong> (depuis le 1er
                  juillet 2023). Cet &eacute;cart de{" "}
                  {fmt(POINT_OFFICIEL - POINT_CLIENT)} € par point
                  s&apos;ajoute aux erreurs d&apos;indice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LES RISQUES ── */}
      <section id="risques" className="scroll-mt-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Évaluation des conséquences juridiques et financières">
            Les risques encourus
          </SectionTitle>

          <div className="grid gap-4 sm:gap-6">
            <RiskCard
              icon={Scale}
              title="Risque prud’homal"
              description="Les intérimaires sous-payés peuvent réclamer un rappel de salaire sur 3 ans (article L.3245-1 du Code du travail). Avec des écarts pouvant atteindre 144 €/mois par agent, le montant cumulé de rappels peut représenter des sommes très significatives."
            />
            <RiskCard
              icon={Building2}
              title="Risque URSSAF"
              description="L’application de mauvaises grilles indiciaires peut entraîner un redressement de cotisations sociales. L’URSSAF peut requalifier les bases de calcul et appliquer des majorations de retard sur les cotisations insuffisamment déclarées."
            />
            <RiskCard
              icon={Euro}
              title="Risque de sous-facturation"
              description="En appliquant des indices inférieurs aux grilles officielles, vous sous-facturez vos prestations aux établissements hospitaliers. Concrètement, vous payez vos intérimaires moins que ce que la réglementation impose — et vous facturez vos clients sur cette base trop basse. C’est un double manque à gagner : vous perdez de la marge, et en cas de régularisation, vous devrez assumer les rappels de salaire sans pouvoir les refacturer rétroactivement à l’hôpital."
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4ter: PLAFONNEMENT DE LA FACTURATION ── */}
      <section id="plafonds" className="scroll-mt-20 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Arrêté du 5 septembre 2025 — en vigueur depuis le 10 septembre 2025">
            Plafonnement de la facturation intérimaire
          </SectionTitle>

          <p className="text-navy-light/70 mb-8 leading-relaxed max-w-4xl">
            Depuis le 10 septembre 2025, un arrêté encadre strictement les montants
            que les entreprises de travail temporaire (ETT) peuvent facturer aux
            établissements de santé et médico-sociaux pour la mise à disposition de
            personnel soignant intérimaire. Ces plafonds horaires, exprimés en euros
            HT par heure, constituent le montant maximum que l&apos;ETT peut facturer
            à l&apos;établissement — toutes charges comprises.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Qualification</th>
                  <th className="text-center px-4 py-3 font-semibold">Plafond métropole (/h HT)</th>
                  <th className="text-center px-4 py-3 font-semibold rounded-tr-lg">Plafond outre-mer (/h HT)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { qual: "Médecin, odontologiste, pharmacien", metro: "2 681 €/24h (~111,71 €/h)", outremer: "3 752 €/24h" },
                  { qual: "IDE (Infirmier diplômé d\u2019État)", metro: "54 €/h", outremer: "75 €/h" },
                  { qual: "IBODE", metro: "73 €/h", outremer: "102 €/h" },
                  { qual: "IADE", metro: "73 €/h", outremer: "102 €/h" },
                  { qual: "MEM (Manip. électroradiologie)", metro: "56 €/h", outremer: "78 €/h" },
                  { qual: "PPH (Préparateur pharmacie)", metro: "56 €/h", outremer: "78 €/h" },
                  { qual: "Masseur-kinésithérapeute", metro: "62 €/h", outremer: "86 €/h" },
                  { qual: "Sage-femme", metro: "78 €/h", outremer: "109 €/h" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"} hover:bg-orange-primary/5 transition-colors`}
                  >
                    <td className="px-4 py-3 font-medium text-navy">{row.qual}</td>
                    <td className="px-4 py-3 text-center text-navy-light">{row.metro}</td>
                    <td className="px-4 py-3 text-center text-navy-light">{row.outremer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Warning box */}
          <div className="bg-orange-primary/5 border border-orange-primary/20 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy mb-1">Attention : plafonds tout compris</p>
                <p className="text-navy-light/70 text-sm leading-relaxed">
                  Ces plafonds incluent la rémunération de l&apos;intérimaire ET la marge
                  de l&apos;entreprise de travail temporaire. Pour un IDE facturé 54 €/h HT
                  maximum, l&apos;ETT doit couvrir : le salaire brut + charges patronales
                  (~33,7 %) + IFM (10 %) + ICCP (10 %) + frais de gestion et marge.
                </p>
              </div>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy mb-1">Important : métiers non plafonnés</p>
                <p className="text-navy-light/70 text-sm leading-relaxed">
                  Les aides-soignants et ASHQ ne figurent pas dans la liste des
                  professions plafonnées. La facturation pour ces métiers n&apos;est pas
                  soumise au plafonnement.
                </p>
              </div>
            </div>
          </div>

          {/* Legal references */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-navy-light/50 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy mb-2">Références juridiques</p>
                <ul className="text-sm text-navy-light/70 space-y-1">
                  <li>Art. R. 6146-26 à R. 6146-28 du Code de la santé publique (établissements publics de santé)</li>
                  <li>Art. R. 313-30-8 à R. 313-30-10 du Code de l&apos;action sociale et des familles (CASF)</li>
                  <li>
                    <a
                      href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050180498"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-primary hover:underline inline-flex items-center gap-1"
                    >
                      Consulter l&apos;arrêté sur Légifrance
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4bis: PLAN D'ACTION ── */}
      <section id="plan" className="scroll-mt-20 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Les étapes concrètes pour vous mettre en conformité">
            Plan d&apos;action recommandé
          </SectionTitle>

          <p className="text-navy-light/70 mb-10 leading-relaxed max-w-3xl">
            Voici les actions à mener en priorité pour corriger vos grilles et sécuriser votre activité.
            Chaque étape est essentielle — ne pas les réaliser vous expose aux risques détaillés ci-dessus.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                urgency: "Immédiat",
                urgencyColor: "DC2626",
                title: "Mettre à jour vos indices majorés",
                description: "Remplacez les anciennes grilles par les grilles officielles en vigueur (décrets Ségur 2021). Pour les IDE : passez de l'IM 390 à l'IM 395 au 1er échelon, et ainsi de suite pour tous les échelons. Pour les AS : passez de la grille catégorie C à la grille catégorie B. Pour les ASHQ : mettez à jour les 7 premiers échelons bloqués à l'IM 352.",
                action: "Utilisez les grilles officielles fournies dans la section suivante ou exportez le fichier Excel."
              },
              {
                step: 2,
                urgency: "Immédiat",
                urgencyColor: "DC2626",
                title: "Ajouter le 11ème échelon manquant",
                description: "Vos grilles s'arrêtent au 10ème échelon. Or, les 3 corps (IDE, AS, ASHQ) comportent 11 échelons. Les intérimaires en fin de carrière doivent être positionnés sur le bon échelon.",
                action: "Ajoutez l'échelon 11 pour chaque corps avec les indices officiels."
              },
              {
                step: 3,
                urgency: "Immédiat",
                urgencyColor: "DC2626",
                title: "Corriger la valeur du point d'indice",
                description: "Vous utilisez 4,92 € au lieu de 4,92278 €. Cet arrondi à lui seul génère un écart de 0,5 à 1,5 €/mois par agent. C'est un détail, mais sur l'ensemble de vos intérimaires et sur 3 ans de prescription, ça s'additionne.",
                action: "Mettez à jour la valeur du point d'indice à 4,92278 € (arrêté du 13 juillet 2023)."
              },
              {
                step: 4,
                urgency: "Sous 30 jours",
                urgencyColor: "E8842C",
                title: "Recalculer vos tarifs de facturation",
                description: "Vos facturations aux établissements hospitaliers sont basées sur vos grilles actuelles (erronées). Vous sous-facturez donc vos prestations. Recalculez vos coefficients de facturation sur la base des nouvelles grilles pour ne plus perdre de marge.",
                action: "Appuyez-vous sur le simulateur de coût employeur pour recalculer le coût complet (traitement + primes + IFM + ICCP + charges)."
              },
              {
                step: 5,
                urgency: "Sous 30 jours",
                urgencyColor: "E8842C",
                title: "Vérifier les primes obligatoires",
                description: "Assurez-vous que le complément de traitement indiciaire (CTI / Prime Ségur, 241,22 €/mois) est bien versé à chaque intérimaire éligible. Vérifiez également le calcul des primes de nuit (25%) et des indemnités de dimanches/jours fériés (60 €/jour).",
                action: "Consultez la section Primes FPH ci-dessous pour les montants et références légales."
              },
              {
                step: 6,
                urgency: "Recommandé",
                urgencyColor: "16A34A",
                title: "Évaluer le risque de rappels de salaire",
                description: "Avec des écarts pouvant atteindre 144 €/mois sur les aides-soignants, un intérimaire pourrait réclamer jusqu'à 5 184 € de rappel sur 3 ans (144 € × 36 mois). Multipliez par le nombre d'intérimaires concernés pour évaluer votre exposition financière totale.",
                action: "Faites un audit de vos missions passées pour chiffrer le montant total d'exposition. DAIRIA Avocats peut vous accompagner dans cette démarche."
              },
              {
                step: 7,
                urgency: "Recommandé",
                urgencyColor: "16A34A",
                title: "Mettre en place une veille réglementaire",
                description: "Les grilles indiciaires évoluent régulièrement (revalorisations du point d'indice, réformes statutaires, nouvelles primes). Sans veille active, vos grilles seront à nouveau obsolètes dans quelques mois.",
                action: "DAIRIA Avocats peut mettre en place un suivi réglementaire adapté à votre activité d'intérim hospitalier."
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 sm:gap-6 items-start p-5 sm:p-6 rounded-xl border border-gray-200 hover:border-orange-primary/30 hover:shadow-md transition-all">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-primary to-orange-light flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-navy text-sm sm:text-base">{item.title}</h3>
                    <span
                      className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: `#${item.urgencyColor}` }}
                    >
                      {item.urgency}
                    </span>
                  </div>
                  <p className="text-navy-light/70 text-sm leading-relaxed mb-2">{item.description}</p>
                  <div className="flex items-start gap-2 bg-orange-primary/5 rounded-lg px-3 py-2">
                    <CheckCircle className="w-4 h-4 text-orange-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-navy-light/80 font-medium">{item.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: ANCIENNETÉ ET POSITIONNEMENT ── */}
      <section id="anciennete" className="scroll-mt-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            id="anciennete-title"
            subtitle="Comment déterminer le bon échelon pour chaque intérimaire"
          >
            Ancienneté et positionnement sur la grille
          </SectionTitle>

          <p className="text-navy-light/80 leading-relaxed mb-10 max-w-4xl">
            Dans la Fonction Publique Hospitalière, le positionnement d&apos;un agent (ou d&apos;un intérimaire) sur la grille indiciaire dépend de son ancienneté dans le corps. Chaque échelon a une durée minimale de séjour avant de passer au suivant. Pour une entreprise d&apos;intérim, il est essentiel de positionner correctement l&apos;intérimaire : un mauvais échelon signifie un salaire erroné, et donc un risque de rappel ou de sous-facturation.
          </p>

          {/* Règles de reprise d'ancienneté */}
          <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-primary" />
            Règles de reprise d&apos;ancienneté
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-orange-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-orange-primary/10 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-orange-primary" />
              </div>
              <h4 className="font-bold text-navy text-lg mb-2">Intérimaire avec expérience FPH</h4>
              <p className="text-navy-light/80 text-sm leading-relaxed mb-3">
                Si l&apos;intérimaire a déjà travaillé dans la FPH (titulaire ou contractuel), son ancienneté est reprise intégralement. Il doit être positionné à l&apos;échelon correspondant à ses années de service.
              </p>
              <p className="text-xs text-orange-primary font-medium">
                Réf : Décret n°88-976 du 13 octobre 1988, art. 6 et 7
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-orange-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-orange-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-orange-primary" />
              </div>
              <h4 className="font-bold text-navy text-lg mb-2">Intérimaire venant du secteur privé</h4>
              <p className="text-navy-light/80 text-sm leading-relaxed mb-3">
                L&apos;expérience professionnelle dans le secteur privé peut être partiellement reprise (en général aux 2/3 de la durée). Un IDE ayant 9 ans d&apos;expérience en clinique privée peut prétendre à une reprise de 6 ans, soit un positionnement au 5ème ou 6ème échelon selon le corps.
              </p>
              <p className="text-xs text-orange-primary font-medium">
                Réf : Décret n°2010-1139 du 29 septembre 2010, art. 10
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-orange-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-orange-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-orange-primary" />
              </div>
              <h4 className="font-bold text-navy text-lg mb-2">Intérimaire en début de carrière</h4>
              <p className="text-navy-light/80 text-sm leading-relaxed mb-3">
                Sans expérience préalable, l&apos;intérimaire est positionné au 1er échelon du grade correspondant à sa qualification. Attention : même au 1er échelon, le salaire ne peut être inférieur au SMIC (1 823,03 € brut au 01/01/2026).
              </p>
            </div>
          </div>

          {/* Calculateur d'échelon */}
          <AncienneteCalculateur />

          {/* Tableaux récapitulatifs */}
          <h3 className="text-xl font-bold text-navy mb-6 mt-12 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-primary" />
            Tableaux récapitulatifs par corps
          </h3>

          {CORPS.map((corps) => {
            const rows = corps.officiel.map((e, idx) => {
              const cumul = corps.officiel.slice(0, idx).reduce((acc, cur) => acc + parseDuree(cur.duree), 0);
              const dureeVal = parseDuree(e.duree);
              const cumulEnd = dureeVal === Infinity ? "Terminal" : fmt(cumul + dureeVal);
              return { ...e, cumulStart: fmt(cumul), cumulEnd };
            });
            return (
              <div key={corps.id} className="mb-8">
                <h4 className="font-semibold text-navy mb-3">{corps.fullLabel}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy/5 text-navy text-xs uppercase tracking-wider">
                        <th className="px-3 py-2">Éch.</th>
                        <th className="px-3 py-2">Durée dans l&apos;échelon</th>
                        <th className="px-3 py-2">Ancienneté cumulée</th>
                        <th className="px-3 py-2">IM</th>
                        <th className="px-3 py-2">Traitement brut mensuel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.ech} className="border-b border-gray-100">
                          <td className="px-3 py-2 text-center font-semibold">{r.ech}</td>
                          <td className="px-3 py-2 text-center text-navy-light/70">{r.duree}</td>
                          <td className="px-3 py-2 text-center text-navy-light/70">
                            {r.cumulEnd === "Terminal" ? `À partir de ${r.cumulStart} ans` : `${r.cumulStart} → ${r.cumulEnd} ans`}
                          </td>
                          <td className="px-3 py-2 text-center font-medium">{r.im}</td>
                          <td className="px-3 py-2 text-center font-semibold text-orange-primary">{fmtEuro(r.tbi)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 5: GRILLES OFFICIELLES COMPLÈTES ── */}
      <section id="grilles" className="scroll-mt-20 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Grilles indiciaires en vigueur – Fonction Publique Hospitalière">
            Les grilles officielles complètes
          </SectionTitle>

          <p className="text-navy-light/70 mb-4 leading-relaxed">
            Ci-dessous les grilles indiciaires officielles en vigueur pour les
            trois corps concernés. Le traitement brut indiciaire (TBI) est
            calculé sur la base de la valeur du point d&apos;indice :{" "}
            <strong>{fmt(POINT_OFFICIEL)} €</strong>.
          </p>

          <div className="flex justify-end mb-6">
            <button
              onClick={exportGrillesExcel}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Télécharger les grilles en Excel
            </button>
          </div>

          <div className="space-y-4">
            {CORPS.map((corps) => (
              <div
                key={corps.id}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleGrid(corps.id)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-warm-bg hover:bg-gray-100 transition-colors"
                >
                  <div className="text-left">
                    <span className="font-bold text-navy">
                      {corps.fullLabel}
                    </span>
                    <span className="ml-3 text-sm text-navy-light/60">
                      {corps.decree}
                    </span>
                  </div>
                  {openGrids[corps.id] ? (
                    <ChevronUp className="w-5 h-5 text-navy-light" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy-light" />
                  )}
                </button>
                {openGrids[corps.id] && (
                  <div className="p-4 sm:p-6 bg-white">
                    <OfficialGrid
                      data={corps.officiel}
                      title={corps.fullLabel}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PRIMES OBLIGATOIRES FPH ── */}
      <section id="primes" className="scroll-mt-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Rappel des primes et indemnités applicables à l’intérim hospitalier">
            Primes obligatoires FPH
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-orange-primary/10 flex items-center justify-center mb-4">
                <Euro className="w-5 h-5 text-orange-primary" />
              </div>
              <h4 className="font-bold text-navy">
                CTI (Prime S&eacute;gur)
              </h4>
              <p className="text-2xl font-bold text-orange-primary mt-2">
                241,22 €/mois
              </p>
              <p className="text-sm text-navy-light/70 mt-1">
                49 points &times; {fmt(POINT_OFFICIEL)} €
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                <Moon className="w-5 h-5 text-navy" />
              </div>
              <h4 className="font-bold text-navy">Prime de nuit</h4>
              <p className="text-2xl font-bold text-orange-primary mt-2">
                25%
              </p>
              <p className="text-sm text-navy-light/70 mt-1">
                du traitement horaire (21h&ndash;6h)
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-orange-light/10 flex items-center justify-center mb-4">
                <CalendarDays className="w-5 h-5 text-orange-light" />
              </div>
              <h4 className="font-bold text-navy">
                IDJF (Dimanches/F&eacute;ri&eacute;s)
              </h4>
              <p className="text-2xl font-bold text-orange-primary mt-2">
                60 €/jour
              </p>
              <p className="text-sm text-navy-light/70 mt-1">
                Indemnit&eacute; forfaitaire par journ&eacute;e travaill&eacute;e
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Percent className="w-5 h-5 text-success" />
              </div>
              <h4 className="font-bold text-navy">
                IFM (Indemnit&eacute; de fin de mission)
              </h4>
              <p className="text-2xl font-bold text-orange-primary mt-2">
                10%
              </p>
              <p className="text-sm text-navy-light/70 mt-1">
                du salaire brut total
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                <Percent className="w-5 h-5 text-warning" />
              </div>
              <h4 className="font-bold text-navy">
                ICCP (Cong&eacute;s pay&eacute;s)
              </h4>
              <p className="text-2xl font-bold text-orange-primary mt-2">
                10%
              </p>
              <p className="text-sm text-navy-light/70 mt-1">
                du brut + IFM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FP TERRITORIALE ── */}
      <section id="fpt" className="scroll-mt-20 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Analyse des grilles Fonction Publique Territoriale">
            Fonction Publique Territoriale
          </SectionTitle>

          {/* Note générale */}
          <div className="bg-orange-primary/5 border border-orange-primary/20 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-navy-light leading-relaxed">
                <strong>
                  Les grilles indiciaires sont identiques entre FPH et FPT pour
                  les m&ecirc;mes corps.
                </strong>{" "}
                La diff&eacute;rence r&eacute;side dans le r&eacute;gime
                indemnitaire (RIFSEEP/IFSE en FPT vs primes sp&eacute;cifiques
                en FPH). Les indices relev&eacute;s dans vos grilles FPT IDE
                (IM 390&ndash;640) sont &eacute;galement erron&eacute;s : ce
                sont les m&ecirc;mes anciennes grilles pr&eacute;-S&eacute;gur.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* IDE FPT */}
            <div className="border border-danger/20 bg-danger/[0.02] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-5 h-5 text-danger" />
                <h4 className="font-bold text-navy">IDE territorial</h4>
                <span className="text-xs bg-danger/10 text-danger px-2 py-0.5 rounded-full font-semibold">
                  Grille erron&eacute;e
                </span>
              </div>
              <p className="text-sm text-navy-light leading-relaxed">
                Vos grilles FPT pour les IDE affichent les IM 390 &agrave; 640
                (10 &eacute;chelons). Ce sont les <strong>m&ecirc;mes indices
                obsol&egrave;tes</strong> que vos grilles FPH. Les grilles
                correctes post-S&eacute;gur (IM 395 &agrave; 678 sur 11
                &eacute;chelons) s&apos;appliquent aussi en FPT.
              </p>
            </div>

            {/* AS FPT */}
            <div className="border border-danger/20 bg-danger/[0.02] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-5 h-5 text-danger" />
                <h4 className="font-bold text-navy">
                  Aide-soignant territorial
                </h4>
                <span className="text-xs bg-danger/10 text-danger px-2 py-0.5 rounded-full font-semibold">
                  À vérifier
                </span>
              </div>
              <p className="text-sm text-navy-light leading-relaxed">
                Les aides-soignants territoriaux rel&egrave;vent de la
                m&ecirc;me grille indiciaire que les AS hospitaliers
                (cat&eacute;gorie B depuis le reclassement). La grille correcte
                est celle pr&eacute;sent&eacute;e dans la section{" "}
                <a
                  href="#grilles"
                  className="text-orange-primary underline font-medium"
                >
                  Grilles officielles
                </a>{" "}
                ci-dessus.
              </p>
            </div>

            {/* FFAS */}
            <div className="border border-success/20 bg-success/[0.02] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <h4 className="font-bold text-navy">
                  FFAS / Agent social territorial
                </h4>
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-semibold">
                  Conforme
                </span>
              </div>
              <p className="text-sm text-navy-light leading-relaxed">
                La grille utilis&eacute;e pour les FFAS / agents sociaux
                territoriaux semble conforme aux grilles en vigueur.
              </p>
            </div>
          </div>

          {/* RIFSEEP note */}
          <div className="mt-6 bg-navy/5 border border-navy/10 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-navy text-sm mb-1">
                  R&eacute;gime indemnitaire FPT (RIFSEEP/IFSE)
                </h4>
                <p className="text-sm text-navy-light/80 leading-relaxed">
                  En FPT, les agents b&eacute;n&eacute;ficient du
                  r&eacute;gime indemnitaire RIFSEEP (comprenant l&apos;IFSE et
                  le CIA) qui se substitue aux primes sp&eacute;cifiques de la
                  FPH. Les montants varient selon les collectivit&eacute;s et
                  doivent &ecirc;tre v&eacute;rifi&eacute;s aupr&egrave;s de
                  chaque &eacute;tablissement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CTA ── */}
      <section
        id="contact"
        className="scroll-mt-20 py-16 sm:py-20 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-orange-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-orange-light rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Shield className="w-4 h-4" />
            Accompagnement sur mesure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            DAIRIA Avocats peut
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-primary to-orange-light">
              vous accompagner
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Nous avons d&eacute;velopp&eacute; cet outil de diagnostic en
            moins de 24h. Imaginez ce que nous pouvons faire pour
            s&eacute;curiser l&apos;ensemble de votre activit&eacute;
            d&apos;int&eacute;rim hospitalier.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:s.coly@dairia-avocats.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-primary to-orange-light text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Nous contacter
            </a>
            <a
              href="tel:+33672422486"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy text-white/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <DairiaLogo />
            <div className="text-center sm:text-right text-sm space-y-1">
              <p>
                Sources : L&eacute;gifrance &ndash; D&eacute;crets
                n&deg;2021-1260 et n&deg;2021-1262 du 29/09/2021
              </p>
              <p>
                Valeur du point d&apos;indice : {fmt(POINT_OFFICIEL)} €
                (01/07/2023)
              </p>
              <p className="text-white/40 text-xs mt-2">
                Ce document a &eacute;t&eacute; &eacute;tabli &agrave; titre
                informatif et ne constitue pas un avis juridique. Pour toute
                d&eacute;cision, consultez un professionnel qualifi&eacute;.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} DAIRIA Avocats &ndash; Tous droits
            r&eacute;serv&eacute;s
          </div>
        </div>
      </footer>
    </>
  );
}
