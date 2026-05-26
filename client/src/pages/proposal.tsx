import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Crown,
  Droplet,
  Gift,
  HeartPulse,
  Leaf,
  LineChart as LineChartIcon,
  Lock,
  Quote,
  ShieldCheck,
  Sparkles,
  Syringe,
  TrendingDown,
  TrendingUp,
  Users,
  DollarSign,
  BarChart2,
  Clock,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

const GREEN = "#009547";
const GREEN2 = "#009430";
const LIME = "#8DC63F";
const CHARCOAL = "#333333";
const FAIL = "#ef4444";

const money = (n: number, frac = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: frac,
  }).format(n);

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

/* ─────────────────────────── shared bits ─────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <Leaf size={16} style={{ color: GREEN }} />
      <span
        className="text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: GREEN }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-14`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="font-condensed leading-[1.02] mb-4"
        style={{
          color: dark ? "#fff" : GREEN,
          fontSize: "clamp(28px, 4.4vw, 46px)",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="text-lg leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,.78)" : "#58595B" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="relative inline-flex items-center justify-center"
        style={{
          width: 34,
          height: 34,
          background: GREEN,
          borderRadius: "50% 50% 50% 4px",
        }}
      >
        <span className="font-condensed italic text-white" style={{ fontSize: 17 }}>
          iV
        </span>
      </span>
      <span
        className="font-condensed tracking-[0.25em] text-lg"
        style={{ color: light ? "#fff" : CHARCOAL }}
      >
        NUTRITION
      </span>
    </div>
  );
}

/* ─────────────────────────────── NAV ───────────────────────────────────── */

const NAV = [
  ["problem", "The Problem"],
  ["solution", "Solution"],
  ["offer", "The Offer"],
  ["calculator", "Calculator"],
  ["founding", "Founding Campaign"],
  ["corporate", "Corporate Upside"],
  ["ask", "Next Steps"],
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-semibold transition-colors"
              style={{ color: "#58595B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#58595B")}
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#calculator" className="iv-btn px-5 py-2.5 text-sm">
          See the Guarantee
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────────── HERO ──────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(20,40,28,.78), rgba(20,40,28,.86)), url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1920&q=80') center/cover",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 text-center">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 mb-8">
            <Droplet size={15} style={{ color: LIME }} />
            <span className="text-white/90 text-xs font-bold uppercase tracking-[0.2em]">
              IV Nutrition &times; Revryze
            </span>
          </div>
          <h1
            className="font-condensed text-white mb-6"
            style={{ fontSize: "clamp(40px, 8vw, 78px)", lineHeight: 0.98 }}
          >
            100 Members Guaranteed.
            <br />
            <span style={{ color: LIME }}>Or Your Money Back.</span>
          </h1>
          <p
            className="font-script mb-6"
            style={{ color: LIME, fontSize: "clamp(22px, 3vw, 30px)" }}
          >
            Refresh. Restore. Renew.
          </p>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            We fill your founding membership roster before you open your doors —
            and we put our fee on the line. Predictable openings, derisked
            economics, and pure upside for corporate.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href="#calculator" className="iv-btn px-8 py-3.5 text-base" data-testid="button-explore-guarantee">
              Explore the Guarantee
            </a>
            <a
              href="#offer"
              className="px-8 py-3.5 text-base rounded-[5px] font-cta font-bold text-white border border-white/40 hover:bg-white/10 transition-colors"
              data-testid="button-see-pricing"
            >
              See Pricing
            </a>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            ["100", "Members Guaranteed"],
            ["16 wks", "Pre-Open Campaign"],
            ["$0", "Cost to Corporate"],
            ["$1 : $1", "Refund if We Miss"],
          ].map(([big, label]) => (
            <div
              key={label}
              className="rounded-xl bg-white/10 border border-white/15 px-4 py-5 backdrop-blur-sm"
            >
              <div className="font-mono text-2xl md:text-3xl font-bold text-white">
                {big}
              </div>
              <div className="text-white/70 text-xs uppercase tracking-wider mt-1">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────── PROBLEM ───────────────────────────────────── */

const rampData = [
  { m: "Open", without: 18, with: 100 },
  { m: "Mo 1", without: 27, with: 108 },
  { m: "Mo 2", without: 38, with: 119 },
  { m: "Mo 3", without: 49, with: 131 },
  { m: "Mo 4", without: 61, with: 142 },
  { m: "Mo 5", without: 72, with: 150 },
];

function Problem() {
  return (
    <section
      id="problem"
      className="py-24 px-6"
      style={{ background: CHARCOAL }}
      data-testid="section-problem"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionHeading
            dark
            eyebrow="The Cold-Start Problem"
            title="A great wellness brand still has to fill the room."
            sub="Opening a new location is the riskiest moment in the franchise journey. Without a pre-built membership base, owners burn cash chasing a slow ramp — and corporate waits months for royalties to follow."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div {...fadeUp} className="space-y-4">
            {[
              [
                "Empty-room openings",
                "Doors open to a trickle of walk-ins, not a roster of committed founding members.",
              ],
              [
                "Cash-flow strain",
                "Lease, staff, and inventory costs hit on day one — membership revenue lags far behind.",
              ],
              [
                "Slow, unpredictable ramp",
                "Months of guesswork before a location reaches a healthy, self-sustaining member base.",
              ],
              [
                "Delayed royalties for corporate",
                "Every slow opening pushes royalty revenue further out and strains the brand's growth model.",
              ],
            ].map(([t, d]) => (
              <div
                key={t}
                className="flex gap-4 rounded-xl p-5"
                style={{ background: "#3c4146", border: "1px solid #4a5055" }}
              >
                <AlertTriangle
                  size={22}
                  style={{ color: FAIL }}
                  className="shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="text-white font-bold mb-1">{t}</h4>
                  <p className="text-white/65 text-sm leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{ background: "#3c4146", border: "1px solid #4a5055" }}
          >
            <h4 className="text-white font-bold mb-1">
              Membership ramp: with vs. without Revryze
            </h4>
            <p className="text-white/55 text-sm mb-5">
              Active members by month from opening day.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rampData} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555b60" />
                <XAxis dataKey="m" stroke="#9aa0a5" fontSize={12} />
                <YAxis stroke="#9aa0a5" fontSize={12} />
                <RTooltip
                  contentStyle={{
                    background: "#2b2e2d",
                    border: "1px solid #4a5055",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "#fff" }} />
                <Line
                  type="monotone"
                  dataKey="without"
                  name="Without Revryze"
                  stroke={FAIL}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="with"
                  name="With Revryze"
                  stroke={LIME}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
              <TrendingDown size={16} style={{ color: FAIL }} />
              <span>
                A cold start can mean a half-empty location for months. Revryze
                opens you at 100.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── SOLUTION ──────────────────────────────────── */

const solutionCards = [
  [
    Users,
    "A full founding roster",
    "We run a 16-week pre-open campaign that fills 100 founding members before day one — so you open warm, not cold.",
  ],
  [
    HeartPulse,
    "Science-backed wellness story",
    "Your IV and injection protocols, translated into a warm, member-first message that turns curiosity into commitment.",
  ],
  [
    Activity,
    "Community-driven growth",
    "Local events plus targeted Meta ads generate qualified, community-rooted leads — not anonymous cold clicks.",
  ],
  [
    ShieldCheck,
    "Derisked economics",
    "A 100-member guarantee with a dollar-for-dollar pro-rata refund. If we miss, you don't pay for what we didn't deliver.",
  ],
  [
    Lock,
    "Lifetime-locked founders",
    "Founding offers lock members in for life — building durable, high-retention recurring revenue from your very first day.",
  ],
  [
    Sparkles,
    "Pure upside for corporate",
    "Corporate pays nothing. Every membership and every royalty dollar is incremental growth for the brand.",
  ],
];

function Solution() {
  return (
    <section id="solution" className="py-24 px-6 bg-white" data-testid="section-solution">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="The Revryze Solution"
            title="We bring your wellness promise to life — at scale."
            sub="Revryze is the derisking partner that fills your founding membership roster before you open, so every new location starts strong."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionCards.map(([Icon, title, desc], i) => (
            <motion.div
              key={title as string}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="iv-dashed-card p-7"
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                style={{ border: `2px dashed ${GREEN}` }}
              >
                <Icon size={26} style={{ color: GREEN }} />
              </div>
              <h4
                className="font-condensed text-xl mb-2"
                style={{ color: CHARCOAL }}
              >
                {title as string}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#58595B" }}>
                {desc as string}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-14 text-center max-w-3xl mx-auto">
          <p
            className="font-script"
            style={{ color: GREEN, fontSize: "clamp(22px,3vw,30px)" }}
          >
            "Our IV and injection nutrient protocols are custom-made just for you
            based on your unique needs."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────── OFFER ─────────────────────────────────────── */

type Tier = "standard" | "volume" | "pilot";

const TIERS: Record<
  Tier,
  { label: string; price: number; tag: string; blurb: string }
> = {
  standard: {
    label: "Standard",
    price: 30000,
    tag: "Single opening",
    blurb: "Per opening for a 100-member guarantee.",
  },
  volume: {
    label: "Volume",
    price: 25000,
    tag: "10+ openings / 12 mo",
    blurb: "Locked-in rate when you commit to 10 or more openings.",
  },
  pilot: {
    label: "Pilot",
    price: 25000,
    tag: "Launch pilot",
    blurb: "Pilot openings get the volume rate from day one.",
  },
};

function Offer({
  tier,
  setTier,
}: {
  tier: Tier;
  setTier: (t: Tier) => void;
}) {
  return (
    <section
      id="offer"
      className="py-24 px-6"
      style={{ background: "#F4F4F4" }}
      data-testid="section-offer"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="The Offer"
            title="100 Members Guaranteed — or your money back."
            sub="Simple, transparent pricing with a guarantee that puts our fee on the line. Choose the structure that fits your growth plan."
          />
        </motion.div>

        <motion.div {...fadeUp} className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-white p-1.5 shadow-sm border border-black/5">
            {(Object.keys(TIERS) as Tier[]).map((t) => {
              const active = t === tier;
              return (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  data-testid={`toggle-tier-${t}`}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold font-cta transition-all"
                  style={{
                    background: active ? GREEN : "transparent",
                    color: active ? "#fff" : "#58595B",
                  }}
                >
                  {TIERS[t].label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <motion.div
            {...fadeUp}
            className="lg:col-span-1 rounded-2xl bg-white p-8 shadow-lg border-t-4 flex flex-col"
            style={{ borderTopColor: GREEN }}
          >
            <span
              className="self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
              style={{ background: "#e8f5ee", color: GREEN }}
            >
              {TIERS[tier].tag}
            </span>
            <div
              className="font-mono font-bold"
              style={{ color: CHARCOAL, fontSize: 52, lineHeight: 1 }}
              data-testid="text-tier-price"
            >
              {money(TIERS[tier].price)}
            </div>
            <p className="mt-2 text-sm" style={{ color: "#666" }}>
              per opening &middot; paid by franchisee
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#58595B" }}>
              {TIERS[tier].blurb}
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 space-y-3">
              {[
                "100 founding members guaranteed at open",
                "Dollar-for-dollar pro-rata refund if we miss",
                "16-week pre-open campaign, fully managed",
                "Lifetime-locked founding offers",
              ].map((f) => (
                <div key={f} className="flex gap-2.5 text-sm" style={{ color: "#58595B" }}>
                  <CheckCircle2 size={18} style={{ color: GREEN }} className="shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2 grid sm:grid-cols-2 gap-6"
          >
            <div className="rounded-2xl bg-white p-7 shadow-sm border border-black/5">
              <h4 className="font-condensed text-xl mb-4" style={{ color: GREEN }}>
                To invoke the guarantee
              </h4>
              <p className="text-sm mb-5" style={{ color: "#58595B" }}>
                The guarantee is a true partnership. To activate it, the
                franchisee simply commits to the fuel that makes a founding
                campaign work:
              </p>
              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{ background: "#F7F8F9" }}>
                  <div className="font-mono text-2xl font-bold" style={{ color: CHARCOAL }}>
                    $20,000
                  </div>
                  <div className="text-sm" style={{ color: "#666" }}>
                    invested in local ad spend over the campaign
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "#F7F8F9" }}>
                  <div className="font-mono text-2xl font-bold" style={{ color: CHARCOAL }}>
                    250 leads
                  </div>
                  <div className="text-sm" style={{ color: "#666" }}>
                    generated through community-driven outreach &amp; events
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-7 text-white flex flex-col"
              style={{ background: CHARCOAL }}
            >
              <Quote size={32} style={{ color: LIME }} className="mb-4" />
              <h4 className="font-condensed text-xl mb-3">
                How the refund works
              </h4>
              <p className="text-sm text-white/75 leading-relaxed mb-5">
                If we deliver fewer than 100 members, you get a dollar-for-dollar
                pro-rata refund. You only ever pay for the members we actually
                bring through your doors.
              </p>
              <div className="mt-auto space-y-2 text-sm">
                {[
                  ["50 members", "50% refund"],
                  ["75 members", "25% refund"],
                  ["100+ members", "$0 refund — full delivery"],
                ].map(([a, b]) => (
                  <div
                    key={a}
                    className="flex justify-between border-b border-white/10 pb-2"
                  >
                    <span className="text-white/70">{a}</span>
                    <span className="font-mono font-bold" style={{ color: LIME }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CALCULATOR ────────────────────────────────── */

const GUARANTEE = 100;
const AD_SPEND = 20000;

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  testId,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  testId: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "#58595B" }}>
          {label}
        </label>
        <span className="font-mono font-bold text-xl" style={{ color: GREEN }} data-testid={`text-${testId}`}>
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="iv-range w-full"
        data-testid={`slider-${testId}`}
      />
      <div className="flex justify-between text-xs" style={{ color: "#bbb" }}>
        <span>{min === 79 ? `$${min}` : min}</span>
        <span>{max === 400 ? `$${max}` : max === 20 ? `${max} mo` : max}</span>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  sub,
  color,
  large,
  testId,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
  large?: boolean;
  testId?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-black/5 last:border-0">
      <div>
        <div className="text-sm font-semibold" style={{ color: "#58595B" }}>{label}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: "#aaa" }}>{sub}</div>}
      </div>
      <span
        className="font-mono font-bold shrink-0 ml-4"
        style={{ color: color || CHARCOAL, fontSize: large ? 22 : 16 }}
        data-testid={testId}
      >
        {value}
      </span>
    </div>
  );
}

function Calculator({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  const [sold, setSold] = useState(100);
  const [avgValue, setAvgValue] = useState(199);
  const [lifetime, setLifetime] = useState(10);

  const fee = TIERS[tier].price;

  const calc = useMemo(() => {
    const refundPct = Math.max(0, (GUARANTEE - sold) / GUARANTEE);
    const refund = refundPct * fee;
    const netRevryzeCost = fee - refund;
    const totalInvestment = netRevryzeCost + AD_SPEND;
    const mrr = sold * avgValue;
    const totalRevenue = mrr * lifetime;
    const netProfit = totalRevenue - totalInvestment;
    const roi = totalInvestment > 0 ? totalRevenue / totalInvestment : 0;
    const payback = mrr > 0 ? totalInvestment / mrr : 0;
    const fillPct = Math.min((sold / GUARANTEE) * 100, 100);
    const hit = sold >= GUARANTEE;
    return {
      refundPct, refund, netRevryzeCost,
      totalInvestment, mrr, totalRevenue,
      netProfit, roi, payback, fillPct, hit,
    };
  }, [sold, avgValue, lifetime, fee]);

  const cashFlowData = useMemo(() => {
    return Array.from({ length: lifetime + 1 }, (_, i) => ({
      month: i,
      cumulative: i === 0
        ? -calc.totalInvestment
        : -calc.totalInvestment + calc.mrr * i,
    }));
  }, [calc.totalInvestment, calc.mrr, lifetime]);

  return (
    <section id="calculator" className="py-24 px-6 bg-white" data-testid="section-calculator">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Franchisee ROI Calculator"
            title="See your full return — in real time."
            sub="Adjust the sliders to any scenario. All ten financial outputs update live so you can see exactly what the numbers look like for your opening."
          />
        </motion.div>

        {/* Tier toggle */}
        <motion.div {...fadeUp} className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl p-1.5 border border-black/10" style={{ background: "#F4F4F4" }}>
            {(Object.keys(TIERS) as Tier[]).map((t) => {
              const active = t === tier;
              return (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  data-testid={`calc-tier-${t}`}
                  className="px-5 py-2 rounded-lg text-sm font-bold font-cta transition-all"
                  style={{
                    background: active ? GREEN : "transparent",
                    color: active ? "#fff" : "#58595B",
                  }}
                >
                  {TIERS[t].label} · {money(TIERS[t].price)}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* ── LEFT: Sliders ── */}
          <motion.div {...fadeUp} className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white p-7 shadow-lg border border-black/5 space-y-7">
              <SliderRow
                label="Memberships Sold"
                value={sold}
                min={1}
                max={100}
                step={1}
                display={String(sold)}
                onChange={setSold}
                testId="memberships"
              />
              <SliderRow
                label="Avg Membership Value"
                value={avgValue}
                min={79}
                max={400}
                step={1}
                display={`$${avgValue}/mo`}
                onChange={setAvgValue}
                testId="avg-value"
              />
              <SliderRow
                label="Avg Member Lifetime"
                value={lifetime}
                min={1}
                max={20}
                step={1}
                display={`${lifetime} mo`}
                onChange={setLifetime}
                testId="lifetime"
              />
            </div>

            {/* Guarantee qualification box */}
            <div className="rounded-2xl border border-dashed p-6 space-y-3" style={{ borderColor: GREEN, background: "#f7fdf9" }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: GREEN }}>
                Qualification requirements (to invoke guarantee)
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#58595B" }}>Ad spend</span>
                <span className="font-mono font-bold" style={{ color: CHARCOAL }}>$20,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#58595B" }}>Community leads generated</span>
                <span className="font-mono font-bold" style={{ color: CHARCOAL }}>250</span>
              </div>
              <p className="text-xs" style={{ color: "#999" }}>These are fixed requirements — not sliders. Meet them and the 100-member guarantee activates.</p>
            </div>

            {/* Progress bar */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: "#58595B" }}>Guarantee progress</span>
                <span className="font-mono font-bold text-sm" style={{ color: calc.hit ? GREEN : "#58595B" }}>
                  {sold} / {GUARANTEE}
                </span>
              </div>
              <div className="h-5 rounded-full overflow-hidden" style={{ background: "#e3e8e5" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${GREEN}, ${LIME})` }}
                  animate={{ width: `${calc.fillPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: calc.hit ? GREEN : FAIL, color: "#fff" }}
                >
                  {calc.hit ? <ShieldCheck size={15} /> : <TrendingUp size={15} />}
                </div>
                <span style={{ color: "#58595B" }}>
                  {calc.hit
                    ? "Full delivery — no refund owed."
                    : `${sold} of 100 → ${(calc.refundPct * 100).toFixed(0)}% refund back to you.`}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Outputs ── */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Investment section */}
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-black/5">
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GREEN }}>
                Franchisee investment
              </div>
              <MetricRow
                label="Revryze fee paid"
                value={money(fee)}
                color={CHARCOAL}
                testId="text-fee"
              />
              <MetricRow
                label="Refund earned"
                value={calc.refund > 0 ? `+${money(calc.refund)}` : "$0"}
                sub={calc.refund > 0 ? `${(calc.refundPct * 100).toFixed(0)}% pro-rata refund` : "Full delivery — no refund"}
                color={calc.refund > 0 ? GREEN : "#aaa"}
                testId="text-refund"
              />
              <MetricRow
                label="Net Revryze cost"
                value={money(calc.netRevryzeCost)}
                color={CHARCOAL}
                testId="text-net-revryze"
              />
              <MetricRow
                label="Ad spend (fixed requirement)"
                value={money(AD_SPEND)}
                color={CHARCOAL}
              />
              <div className="mt-3 pt-3 border-t-2 flex items-center justify-between" style={{ borderColor: GREEN }}>
                <span className="font-bold text-sm" style={{ color: CHARCOAL }}>Total franchisee investment</span>
                <span className="font-mono font-bold text-xl" style={{ color: CHARCOAL }} data-testid="text-total-investment">
                  {money(calc.totalInvestment)}
                </span>
              </div>
            </div>

            {/* Revenue section */}
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-black/5">
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GREEN }}>
                Membership revenue
              </div>
              <MetricRow
                label="Monthly recurring revenue at open"
                value={money(calc.mrr)}
                sub={`${sold} members × $${avgValue}/mo`}
                color={GREEN}
                testId="text-mrr"
              />
              <MetricRow
                label="Total membership revenue"
                value={money(calc.totalRevenue)}
                sub={`${sold} members × $${avgValue} × ${lifetime} months`}
                color={GREEN}
                large
                testId="text-total-revenue"
              />
            </div>

            {/* ROI summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: DollarSign,
                  label: "Net Profit",
                  value: money(calc.netProfit),
                  color: calc.netProfit >= 0 ? GREEN : FAIL,
                  testId: "text-net-profit",
                },
                {
                  icon: BarChart2,
                  label: "ROI Multiple",
                  value: `${calc.roi.toFixed(1)}x`,
                  color: calc.roi >= 1 ? GREEN : FAIL,
                  testId: "text-roi",
                },
                {
                  icon: Clock,
                  label: "Payback",
                  value: `${calc.payback.toFixed(1)} mo`,
                  color: CHARCOAL,
                  testId: "text-payback",
                },
              ].map(({ icon: Icon, label, value, color, testId }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white p-4 shadow-md border border-black/5 text-center"
                >
                  <Icon size={18} style={{ color: GREEN }} className="mx-auto mb-1" />
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#999" }}>
                    {label}
                  </div>
                  <div
                    className="font-mono font-bold"
                    style={{ color, fontSize: 20 }}
                    data-testid={testId}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Cash flow chart */}
            <div className="rounded-2xl bg-white p-6 shadow-md border border-black/5">
              <div className="flex items-center gap-2 mb-1">
                <LineChartIcon size={16} style={{ color: GREEN }} />
                <h4 className="font-bold text-sm" style={{ color: CHARCOAL }}>
                  Cumulative cash flow over member lifetime
                </h4>
              </div>
              <p className="text-xs mb-4" style={{ color: "#999" }}>
                Starts negative (your total investment), then climbs as MRR compounds each month.
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={cashFlowData} margin={{ left: -8, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="cfFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GREEN} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={GREEN} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    stroke="#bbb"
                    fontSize={11}
                    tickFormatter={(v) => `M${v}`}
                  />
                  <YAxis
                    stroke="#bbb"
                    fontSize={11}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <ReferenceLine y={0} stroke={CHARCOAL} strokeDasharray="4 4" strokeWidth={1.5} />
                  <RTooltip
                    formatter={(v: number) => [money(v), "Cumulative"]}
                    labelFormatter={(l) => `Month ${l}`}
                    contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 12 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke={GREEN}
                    strokeWidth={2.5}
                    fill="url(#cfFill)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── FOUNDING CAMPAIGN ─────────────────────────────── */

const vitalStack: [string, number][] = [
  ["Mega Myers IV", 179],
  ["NAD 50mg IM", 50],
  ["B12 injection", 25],
  ["Glutathione push", 50],
  ["Beauty Boost OR Belly Buster add-on", 50],
  ["Branded welcome kit", 35],
];

const eliteStack: [string, number][] = [
  ["Mega Myers IV", 179],
  ["Inner Immune OR Repair & Rebuild IV — your choice", 179],
  ["Founder's Choice: NAD IV 250mg OR Blood Panel + consult", 250],
  ["Glutathione push", 50],
  ["B12 injection", 25],
  ["Premium add-on choice", 72],
  ["Premium branded welcome kit", 75],
];

const cohorts = [
  { name: "Cohort 1", seats: "First 25 seats", price: 299, color: GREEN },
  { name: "Cohort 2", seats: "Next 25 seats", price: 309, color: GREEN2 },
  { name: "Cohort 3", seats: "Next 50 seats", price: 319, color: CHARCOAL },
];

const phases = [
  {
    tag: "Phase 1",
    weeks: "Weeks 1–6",
    title: "Launch",
    points: [
      "Both founding offers go live",
      "Elite Cohort 1 ($299) + Vital selling",
      "Meta ads + community events",
      "Scarcity on Cohort 1 seats",
    ],
  },
  {
    tag: "Phase 2",
    weeks: "Weeks 7–12",
    title: "Mid-flight",
    points: [
      "Cohort 1 fills → Cohort 2 ($309)",
      "Continued Meta + community events",
      "Cohort scarcity messaging",
      "Pipeline self-segments by Founder's Choice",
    ],
  },
  {
    tag: "Phase 3",
    weeks: "Weeks 13–16",
    title: "T-30 Final Push",
    points: [
      "Cohort 3 ($319) live",
      "\"Doors open in 30 days\"",
      "Lifetime lock closes at open",
      "Aggressive retargeting",
    ],
  },
  {
    tag: "Open Day",
    weeks: "Week 17",
    title: "Doors Open",
    points: [
      "Founding offer closes",
      "Standard pricing only",
      "$99 Vital / $375 Elite forward",
      "100 founders already inside",
    ],
  },
];

const mechanics = [
  { icon: Lock, t: "Lifetime rate lock", d: "The load-bearing promise across both offers — members lock today's rate forever." },
  { icon: Sparkles, t: "Escalating cohorts", d: "Cohort prices rise as seats fill, creating genuine urgency without fake countdowns." },
  { icon: Syringe, t: "Founder's Choice", d: "NAD IV vs. Foundation Panel self-segments leads for ad optimization and seeds your functional-health pipeline." },
  { icon: Gift, t: "Front-loaded wow", d: "The entire welcome stack is delivered at the first appointment for maximum founding-member delight." },
];

function ValueStack({
  title,
  items,
  total,
  dark = false,
}: {
  title: string;
  items: [string, number][];
  total: number;
  dark?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: dark ? LIME : GREEN }}>
        {title}
      </div>
      <div className="space-y-2">
        {items.map(([n, v]) => (
          <div key={n} className="flex justify-between gap-3 text-sm">
            <span style={{ color: dark ? "rgba(255,255,255,.7)" : "#58595B" }}>{n}</span>
            <span className="font-mono shrink-0" style={{ color: dark ? "#fff" : CHARCOAL }}>
              {money(v)}
            </span>
          </div>
        ))}
        <div
          className="flex justify-between pt-2 mt-2 border-t border-dashed"
          style={{ borderColor: dark ? LIME : GREEN }}
        >
          <span className="font-bold" style={{ color: dark ? "#fff" : CHARCOAL }}>
            Visit One value
          </span>
          <span className="font-mono font-bold" style={{ color: dark ? LIME : GREEN }}>
            ~{money(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

function Founding() {
  return (
    <section
      id="founding"
      className="py-24 px-6"
      style={{ background: "#F4F4F4" }}
      data-testid="section-founding"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Founding Member Campaign"
            title="16 weeks. 100 founders. Locked in for life."
            sub="Two irresistible founding offers, front-loaded with a Visit One welcome bundle that delivers the entire wow factor on day one."
          />
        </motion.div>

        {/* Offer cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* Vital */}
          <motion.div {...fadeUp} className="rounded-2xl bg-white p-8 shadow-lg border border-black/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "#e8f5ee", color: GREEN }}>
                <Droplet size={12} className="inline mr-1" /> Founding Vital Starter
              </span>
              <Gift size={22} style={{ color: GREEN }} />
            </div>
            <div className="flex items-end gap-2 mt-4 mb-1">
              <span className="font-mono font-bold" style={{ color: CHARCOAL, fontSize: 48, lineHeight: 1 }}>
                $79
              </span>
              <span className="text-sm mb-1.5" style={{ color: "#666" }}>
                /mo · locked for life
              </span>
            </div>
            <p className="text-sm mb-5" style={{ color: "#58595B" }}>
              $79 down (your first month, rolls into MTM). $79 monthly credit, 25mg
              NAD+ monthly, Compression + Red Light, 6% off.
            </p>
            <ValueStack title="Visit One Welcome Bundle" items={vitalStack} total={389} />
            <div className="mt-6 rounded-xl p-4" style={{ background: "#F7F8F9" }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#58595B" }}>Lifetime lock saves</span>
                <span className="font-mono font-bold" style={{ color: GREEN }}>
                  $240/yr forever
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span style={{ color: "#58595B" }}>Total Year 1 value</span>
                <span className="font-mono font-bold" style={{ color: CHARCOAL }}>
                  ~$629 for $79 today
                </span>
              </div>
            </div>
          </motion.div>

          {/* Elite */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden"
            style={{ background: CHARCOAL }}
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full" style={{ background: GREEN, opacity: 0.18, filter: "blur(40px)" }} />
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "rgba(141,198,63,.2)", color: LIME }}>
                <Crown size={12} className="inline mr-1" /> Founding Elite Wellness
              </span>
              <Crown size={22} style={{ color: LIME }} />
            </div>
            <div className="flex items-end gap-2 mt-4 mb-1">
              <span className="font-mono font-bold" style={{ color: LIME, fontSize: 48, lineHeight: 1 }}>
                $299+
              </span>
              <span className="text-sm mb-1.5 text-white/70">/mo · locked for life</span>
            </div>
            <p className="text-sm mb-5 text-white/75">
              Cohort-priced from $299. Monthly credit, 50mg NAD+ monthly, Deep Detox
              IV monthly, Compression + Red Light, 15% off, VIP scheduling.
            </p>
            <ValueStack title="Visit One Welcome Bundle" items={eliteStack} total={830} dark />
            <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(255,255,255,.06)" }}>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Lifetime lock saves</span>
                <span className="font-mono font-bold" style={{ color: LIME }}>
                  $672–$912/yr
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-white/70">Total Year 1 value</span>
                <span className="font-mono font-bold text-white">~$1,500–$1,725</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elite cohort cards — 3 clean side-by-side cards */}
        <motion.div {...fadeUp} className="mb-16">
          <h4 className="font-condensed text-2xl mb-2 text-center" style={{ color: GREEN }}>
            Elite cohorts: prices escalate as seats fill
          </h4>
          <p className="text-sm mb-8 text-center" style={{ color: "#666" }}>
            Urgency without manufactured deadlines — the next seat always costs more.
          </p>
          <div className="grid grid-cols-3 gap-5">
            {cohorts.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl p-7 text-white flex flex-col items-center text-center shadow-lg"
                style={{ background: c.color }}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
                  {c.name}
                </span>
                <span className="font-mono font-bold" style={{ fontSize: 38, lineHeight: 1 }}>
                  ${c.price}/mo
                </span>
                <span className="mt-2 text-sm text-white/80">{c.seats}</span>
                <span className="mt-2 text-xs text-white/60">locked for life</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-white p-6 border border-black/5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GREEN }}>
              All Elite cohorts include
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Down payment = first month, rolls into MTM",
                "Monthly credit, 50mg NAD+ monthly",
                "Deep Detox IV monthly",
                "Compression + Red Light access",
                "15% off all à la carte services",
                "VIP scheduling priority",
              ].map((f) => (
                <div key={f} className="flex gap-2 text-sm" style={{ color: "#58595B" }}>
                  <CheckCircle2 size={15} style={{ color: GREEN }} className="shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div {...fadeUp}>
          <h4 className="font-condensed text-2xl mb-6 text-center" style={{ color: GREEN }}>
            The 16-week campaign arc
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            {phases.map((p, i) => (
              <div key={p.tag} className="relative">
                <div className="iv-dashed-card p-6 h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays size={16} style={{ color: GREEN }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="font-mono text-sm mb-1" style={{ color: "#999" }}>
                    {p.weeks}
                  </div>
                  <h5 className="font-condensed text-xl mb-3" style={{ color: CHARCOAL }}>
                    {p.title}
                  </h5>
                  <ul className="space-y-1.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm" style={{ color: "#58595B" }}>
                        <ArrowRight size={14} style={{ color: LIME }} className="shrink-0 mt-1" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {i < phases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight size={20} style={{ color: GREEN }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key mechanics */}
        <motion.div {...fadeUp} className="mt-14 grid md:grid-cols-2 gap-5">
          {mechanics.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm border border-black/5">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ border: `2px dashed ${GREEN}` }}>
                <Icon size={22} style={{ color: GREEN }} />
              </div>
              <div>
                <h5 className="font-bold mb-1" style={{ color: CHARCOAL }}>
                  {t}
                </h5>
                <p className="text-sm" style={{ color: "#58595B" }}>
                  {d}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CORPORATE UPSIDE ───────────────────────────── */

const AVG_MONTHLY = 150;
const ROYALTY_RATE = 0.07;

function Corporate() {
  const [openings, setOpenings] = useState<1 | 10>(10);

  const data = useMemo(() => {
    const monthly = GUARANTEE * AVG_MONTHLY * ROYALTY_RATE;
    return Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      return {
        month: `M${m}`,
        one: Math.round(monthly * m),
        ten: Math.round(monthly * m * 10),
      };
    });
  }, []);

  const perLocAnnual = GUARANTEE * AVG_MONTHLY * 12 * ROYALTY_RATE;
  const total = perLocAnnual * openings;

  return (
    <section id="corporate" className="py-24 px-6 bg-white" data-testid="section-corporate">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Corporate Upside"
            title="$0 cost to corporate. Pure royalty upside."
            sub="Franchisees pay Revryze directly. Every membership we generate and every royalty dollar that follows is incremental growth for the brand."
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            ["$0", "Cost to corporate", "Franchisees pay all Revryze fees directly."],
            ["100", "Members per opening", "A full founding roster before doors open."],
            ["7%", "Royalty on revenue", "Captured from day one, not month six."],
          ].map(([big, label, sub]) => (
            <motion.div key={label} {...fadeUp} className="rounded-2xl p-7 text-center shadow-sm border border-black/5" style={{ background: "#F7F8F9" }}>
              <div className="font-mono font-bold mb-1" style={{ color: GREEN, fontSize: 44 }}>
                {big}
              </div>
              <div className="font-bold mb-1" style={{ color: CHARCOAL }}>
                {label}
              </div>
              <p className="text-sm" style={{ color: "#666" }}>
                {sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="rounded-2xl p-8 shadow-lg border border-black/5" style={{ background: "#F4F4F4" }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="font-condensed text-2xl" style={{ color: GREEN }}>
                Cumulative royalty revenue (Year 1)
              </h4>
              <p className="text-sm" style={{ color: "#666" }}>
                Illustrative at {GUARANTEE} members &times; {money(AVG_MONTHLY)}/mo blended &times; {ROYALTY_RATE * 100}% royalty.
              </p>
            </div>
            <div className="inline-flex rounded-xl bg-white p-1.5 border border-black/10">
              {([1, 10] as const).map((o) => {
                const active = o === openings;
                return (
                  <button
                    key={o}
                    onClick={() => setOpenings(o)}
                    data-testid={`toggle-openings-${o}`}
                    className="px-5 py-2 rounded-lg text-sm font-bold font-cta transition-all"
                    style={{ background: active ? GREEN : "transparent", color: active ? "#fff" : "#58595B" }}
                  >
                    {o === 1 ? "1 opening" : "10+ openings"}
                  </button>
                );
              })}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ left: -8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
              <XAxis dataKey="month" stroke="#999" fontSize={12} />
              <YAxis stroke="#999" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <RTooltip formatter={(v: number) => money(v)} contentStyle={{ borderRadius: 8, border: "1px solid #eee" }} />
              <Bar dataKey={openings === 1 ? "one" : "ten"} name="Cumulative royalty" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === data.length - 1 ? GREEN : LIME} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white p-5 text-center border border-black/5">
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#999" }}>
                Royalty per opening / yr
              </div>
              <div className="font-mono font-bold" style={{ color: CHARCOAL, fontSize: 30 }}>
                {money(perLocAnnual)}
              </div>
            </div>
            <div className="rounded-xl p-5 text-center" style={{ background: GREEN }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-1 text-white/80">
                Total at {openings} opening{openings > 1 ? "s" : ""} / yr
              </div>
              <div className="font-mono font-bold text-white" style={{ fontSize: 30 }}>
                {money(total)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────── THE ASK ───────────────────────────────────── */

function Ask() {
  return (
    <section id="ask" className="relative" data-testid="section-ask">
      {/* Testimonial side-label flourish + pull quote */}
      <div className="bg-white py-24 px-6 relative overflow-hidden">
        <div
          className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "#e0e6e2",
            letterSpacing: "0.4em",
          }}
        >
          <span className="font-condensed text-5xl">TESTIMONIALS</span>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Quote size={48} style={{ color: GREEN }} className="mx-auto mb-6" />
            <p className="font-script mb-3" style={{ color: GREEN, fontSize: "clamp(24px,3.4vw,34px)" }}>
              "Nourish Your Body, Nourish Your Soul."
            </p>
            <p className="text-lg" style={{ color: "#58595B" }}>
              IV Nutrition has built a wellness brand people love. Revryze makes
              sure every new location opens to a room already full of believers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA band */}
      <div className="py-20 px-6" style={{ background: GREEN }}>
        <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-condensed mb-4" style={{ fontSize: "clamp(30px,5vw,54px)", lineHeight: 1.02 }}>
            Let's fill your next opening — guaranteed.
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            100 founding members at open, or a dollar-for-dollar refund. Zero cost
            to corporate, predictable economics for franchisees, and pure royalty
            upside for the brand.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
            {[
              ["1. Approve the pilot", "Green-light a pilot opening at the $25k rate."],
              ["2. Launch the 16-week arc", "We build the founding roster before you open."],
              ["3. Open at 100", "Day-one momentum, locked-in recurring revenue."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl bg-white/10 border border-white/20 p-5">
                <h4 className="font-bold mb-1">{t}</h4>
                <p className="text-sm text-white/80">{d}</p>
              </div>
            ))}
          </div>
          <a
            href="mailto:partnerships@revryze.com?subject=IV%20Nutrition%20x%20Revryze%20Pilot"
            className="inline-flex items-center gap-2 bg-white px-9 py-4 rounded-[5px] font-cta font-bold text-base"
            style={{ color: GREEN }}
            data-testid="button-start-conversation"
          >
            Start the Conversation <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 text-center" style={{ background: "#2B2E2D" }}>
        <div className="flex justify-center mb-3">
          <Logo light />
        </div>
        <p className="text-white/60 text-sm font-semibold uppercase tracking-[0.18em] mb-2">
          Growth Point Solutions LLC dba Revryze
        </p>
        <p className="text-white/35 text-xs">
          Proprietary &amp; Confidential. Prepared for IV Nutrition corporate
          leadership. Figures are illustrative and for discussion purposes.
        </p>
      </footer>
    </section>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────────────────── */

export default function ProposalPage() {
  const [tier, setTier] = useState<Tier>("pilot");

  return (
    <div className="min-h-screen bg-white font-sans" style={{ color: CHARCOAL }}>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Offer tier={tier} setTier={setTier} />
      <Calculator tier={tier} setTier={setTier} />
      <Founding />
      <Corporate />
      <Ask />
    </div>
  );
}
