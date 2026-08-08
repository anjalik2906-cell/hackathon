import React from 'react'
import { Link } from 'react-router-dom'
import ProofGrid from '../components/ProofGrid.jsx'

// Seeded preview data — an aspirational example streak for a page visitor
// who hasn't joined yet. Not the same data as the logged-in dashboard.
const previewDays = [
  ...Array.from({ length: 23 }, (_, i) => ({ day: i + 1, status: 'done', github: true, linkedin: true })),
  { day: 24, status: 'missed', github: false, linkedin: false },
  ...Array.from({ length: 8 }, (_, i) => ({ day: i + 25, status: 'done', github: true, linkedin: true })),
]

export default function Landing() {
  return (
    <div className="rise">
      <Header />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <ProofSection />
      <TrackSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-flame/15 ring-1 ring-flame/30 flex items-center justify-center">
          <span className="font-mono text-flame text-sm font-bold">AB</span>
        </div>
        <span className="font-display font-semibold text-ink tracking-tight">ABTalks</span>
      </div>
      <Link
        to="/dashboard"
        className="text-sm text-muted hover:text-ink font-medium px-3 py-1.5"
      >
        Log in
      </Link>
    </header>
  )
}

function Hero() {
  return (
    <section className="px-5 pt-6 pb-8">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-elevated ring-1 ring-line px-3 py-1 text-xs text-muted font-mono mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-flame flicker" />
        812 students building right now
      </div>

      <h1 className="font-display text-[2.1rem] leading-[1.08] font-semibold text-ink tracking-tight">
        Build something
        <br />
        every day for <span className="text-flame">60 days.</span>
      </h1>

      <p className="mt-4 text-muted text-[15px] leading-relaxed">
        Pick a track. Ship daily. Prove it with a GitHub commit and a LinkedIn
        post. In two months, recruiters won't need your resume — they'll have
        your receipts.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-faint font-mono">
  <span className="text-flame">✓</span>
  <span>60 focused tasks · public proof · zero cost</span>
</div>

      <div className="mt-6 flex flex-col gap-2.5">
        <Link
          to="/dashboard"
          className="w-full text-center bg-flame text-base font-semibold text-[15px] py-3.5 rounded-xl shadow-glow active:scale-[0.98] transition-transform"
          style={{ color: '#0B1020' }}
        >
          Start your streak — it's free
        </Link>
        <a
          href="#how"
          className="w-full text-center text-muted text-sm py-2 font-medium"
        >
          See how it works ↓
        </a>
      </div>

      <div className="mt-8 rounded-xl2 border border-line bg-surface p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted font-mono">example streak · day 31/60</span>
          <span className="text-xs text-flame font-mono font-semibold">🔥 8-day streak</span>
        </div>
        <ProofGrid days={previewDays} totalDays={60} size="sm" />
        <div className="flex items-center gap-4 mt-3 text-[11px] text-faint font-mono">
          <Legend swatch="bg-flame" label="proved" />
          <Legend swatch="ring-1 ring-danger/60" label="missed" />
          <Legend swatch="bg-elevated/70" label="upcoming" />
        </div>
      </div>
    </section>
  )
}

function Legend({ swatch, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-[2px] ${swatch}`} />
      {label}
    </span>
  )
}

function TrustStrip() {
  const stats = [
    { value: '812', label: 'active students' },
    { value: '41', label: 'colleges' },
    { value: '2,300+', label: 'commits logged' },
  ]
  return (
    <section className="px-5 py-5 border-y border-line bg-surface/40">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-lg font-semibold text-ink">{s.value}</div>
            <div className="text-[11px] text-muted mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Pick a track',
      body: 'Full-Stack Web, DSA, Android, ML, or Design. Each track has its own 60-day task list, written for beginners with recruiter-ready output in mind.',
    },
    {
      n: '02',
      title: 'Get a daily task',
      body: 'One focused task a day, sized for 60–120 minutes. No guessing what to build next.',
    },
    {
      n: '03',
      title: 'Submit your proof',
      body: 'Link the GitHub commit and the LinkedIn post you made about it. Both are required — building in public is the whole point.',
    },
    {
      n: '04',
      title: 'Keep the streak alive',
      body: 'Miss a day and the streak resets, but your history stays visible. Recruiters see consistency, not just a badge.',
    },
  ]
  return (
    <section id="how" className="px-5 py-9">
      <p className="text-xs font-mono text-flame mb-2">the loop</p>
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        How the 60 days work
      </h2>
      <div className="space-y-5">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-3.5">
            <span className="font-mono text-xs text-faint pt-1 w-6 shrink-0">{s.n}</span>
            <div>
              <h3 className="font-display text-[15px] font-semibold text-ink">{s.title}</h3>
              <p className="text-[13.5px] text-muted mt-1 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProofSection() {
  return (
    <section className="px-5 py-9 bg-surface/40 border-y border-line">
      <p className="text-xs font-mono text-github mb-2">why two proofs</p>
      <h2 className="font-display text-xl font-semibold text-ink mb-4">
        A commit proves you built it.
        <br />
        A post proves someone saw it.
      </h2>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <ProofCard
          color="github"
          title="GitHub commit"
          body="Shows the work is real, and gives recruiters something to actually open."
        />
        <ProofCard
          color="linkedin"
          title="LinkedIn post"
          body="Shows you can explain what you built — the skill that gets you shortlisted."
        />
      </div>
    </section>
  )
}

function ProofCard({ color, title, body }) {
  const ring = color === 'github' ? 'ring-github/30' : 'ring-linkedin/30'
  const dot = color === 'github' ? 'bg-github' : 'bg-linkedin'
  return (
    <div className={`rounded-xl2 bg-elevated ring-1 ${ring} p-4`}>
      <span className={`w-2 h-2 rounded-full ${dot} inline-block mb-3`} />
      <h3 className="font-display text-sm font-semibold text-ink">{title}</h3>
      <p className="text-[12.5px] text-muted mt-1.5 leading-relaxed">{body}</p>
    </div>
  )
}

function TrackSection() {
  const tracks = [
    { name: 'Full-Stack Web', tag: 'most popular', count: 340 },
    { name: 'DSA & Interview Prep', tag: '', count: 210 },
    { name: 'Android Dev', tag: '', count: 96 },
    { name: 'Applied ML', tag: '', count: 104 },
    { name: 'Product Design', tag: 'new', count: 62 },
  ]
  return (
    <section className="px-5 py-9">
      <p className="text-xs font-mono text-linkedin mb-2">choose one</p>
      <h2 className="font-display text-xl font-semibold text-ink mb-5">Five tracks to start from</h2>
      <div className="flex flex-col gap-2.5">
        {tracks.map((t) => (
          <div
            key={t.name}
            className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-ink">{t.name}</span>
                {t.tag && (
                  <span className="text-[10px] font-mono uppercase tracking-wide text-flame bg-flame/10 rounded-full px-2 py-0.5">
                    {t.tag}
                  </span>
                )}
              </div>
              <span className="text-[12px] text-muted">{t.count} building this track</span>
            </div>
            <span className="text-faint text-lg">→</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const qas = [
    {
      q: 'What if I miss a day?',
      a: "Your streak resets to zero, but every past day stays on your profile. A missed day is visible, not hidden — that's part of the honesty recruiters trust.",
    },
    {
      q: "What if I don't have a GitHub or LinkedIn yet?",
      a: 'Day 1 of every track walks you through setting both up. No prior experience needed.',
    },
    {
      q: 'Is it really free?',
      a: 'Yes. ABTalks is free for students. No credit card, no trial period.',
    },
  ]
  return (
    <section className="px-5 py-9 border-t border-line">
      <h2 className="font-display text-xl font-semibold text-ink mb-5">Before you start</h2>
      <div className="space-y-4">
        {qas.map((qa) => (
          <div key={qa.q}>
            <h3 className="text-[14px] font-semibold text-ink">{qa.q}</h3>
            <p className="text-[13px] text-muted mt-1 leading-relaxed">{qa.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-5 py-10">
      <div className="rounded-xl2 bg-gradient-to-br from-elevated to-surface ring-1 ring-flame/20 p-6 text-center">
        <h2 className="font-display text-lg font-semibold text-ink">
          Day 1 takes 90 minutes.
          <br />
          Day 60 changes your resume.
        </h2>
        <Link
          to="/dashboard"
          className="mt-5 inline-block w-full text-center bg-flame font-semibold text-[15px] py-3.5 rounded-xl shadow-glow active:scale-[0.98] transition-transform"
          style={{ color: '#0B1020' }}
        >
          Start your streak
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-5 py-8 text-center">
      <p className="text-[11px] text-faint">ABTalks · Built for Indian college students · 2026</p>
    </footer>
  )
}
