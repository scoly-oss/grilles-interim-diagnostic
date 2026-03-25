"use client";

import { useState } from "react";
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
} from "lucide-react";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const POINT_OFFICIEL = 4.92278;
const POINT_CLIENT = 4.92;

const fmt = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtEuro = (n: number) => fmt(n) + " €";

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

/* ─────────────────────────── NAV ─────────────────────────── */

const NAV_ITEMS = [
  { href: "#constat", label: "Constat" },
  { href: "#diagnostic", label: "Diagnostic" },
  { href: "#risques", label: "Risques" },
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
            Diagnostic d&eacute;taill&eacute; par corps
          </SectionTitle>

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
              title="Risque commercial"
              description="Les établissements hospitaliers clients peuvent contester vos factures si les bases de calcul de la rémunération sont erronées. Cela peut entraîner des renégociations tarifaires, des litiges contractuels et une perte de confiance de vos donneurs d’ordre."
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: GRILLES OFFICIELLES COMPLÈTES ── */}
      <section id="grilles" className="scroll-mt-20 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Grilles indiciaires en vigueur – Fonction Publique Hospitalière">
            Les grilles officielles complètes
          </SectionTitle>

          <p className="text-navy-light/70 mb-8 leading-relaxed">
            Ci-dessous les grilles indiciaires officielles en vigueur pour les
            trois corps concern&eacute;s. Le traitement brut indiciaire (TBI) est
            calcul&eacute; sur la base de la valeur du point d&apos;indice :{" "}
            <strong>{fmt(POINT_OFFICIEL)} €</strong>.
          </p>

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
              href="mailto:contact@dairia-avocats.fr"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-primary to-orange-light text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Nous contacter
            </a>
            <a
              href="tel:+33100000000"
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
