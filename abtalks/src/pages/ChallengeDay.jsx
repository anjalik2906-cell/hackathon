import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProofGrid from '../components/ProofGrid.jsx'
import mock from '../data/mock.json'

export default function ChallengeDay() {
  const { dayId } = useParams()
  const dayNum = parseInt(dayId, 10)

  const detail = mock.dayDetail[dayId]
  const dayEntry = mock.days.find((d) => d.day === dayNum)

  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [submitted, setSubmitted] = useState(dayEntry?.status === 'done')
  const [error, setError] = useState('')

  const githubValid = /^https:\/\/(www\.)?github\.com\/.+/.test(githubUrl)
  const linkedinValid = /^https:\/\/(www\.)?linkedin\.com\/.+/.test(linkedinUrl)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!githubValid || !linkedinValid) {
      setError('Add a valid GitHub link and a valid LinkedIn link before submitting.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (!detail) {
    return <FallbackDay dayNum={dayNum} dayEntry={dayEntry} />
  }

  return (
    <div className="rise">
      <TopBar dayNum={dayNum} track={detail.track} />
      <MiniGrid dayNum={dayNum} />
      <TaskBrief detail={detail} />
      <Requirements detail={detail} />
      <Resources detail={detail} />
      <SubmitSection
        submitted={submitted}
        githubUrl={githubUrl}
        linkedinUrl={linkedinUrl}
        setGithubUrl={setGithubUrl}
        setLinkedinUrl={setLinkedinUrl}
        githubValid={githubValid}
        linkedinValid={linkedinValid}
        error ={error}
        onSubmit={handleSubmit}
        dayNum={dayNum}
      />
    </div>
  )
}

function TopBar({ dayNum, track }) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <Link to="/dashboard" className="text-muted text-sm flex items-center gap-1.5">
        <span className="text-base">←</span> Dashboard
      </Link>
      <span className="text-[11px] font-mono text-faint">{track}</span>
    </header>
  )
}

function MiniGrid({ dayNum }) {
  return (
    <div className="px-5 mb-4">
      <div className="rounded-xl border border-line bg-surface p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10.5px] font-mono text-faint">days {Math.max(1, dayNum - 5)}–{Math.min(60, dayNum + 6)}</span>
          <span className="text-[10.5px] font-mono text-flame">day {dayNum} / 60</span>
        </div>
        <ProofGrid days={mock.days} totalDays={60} size="sm" compact focusDay={dayNum} />
      </div>
    </div>
  )
}

function TaskBrief({ detail }) {
  return (
    <section className="px-5 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10.5px] font-mono uppercase tracking-wide text-flame bg-flame/10 rounded-full px-2 py-0.5">
          {detail.difficulty}
        </span>
        <span className="text-[10.5px] font-mono text-faint">⏱ {detail.estimatedTime}</span>
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink leading-tight">{detail.title}</h1>
      <p className="text-[14px] text-muted mt-3 leading-relaxed">{detail.brief}</p>
    </section>
  )
}

function Requirements({ detail }) {
  return (
    <section className="px-5 mb-5">
      <h2 className="text-xs font-mono text-muted mb-2.5">what to build</h2>
      <div className="rounded-xl2 border border-line bg-surface p-4">
        <ul className="space-y-2.5">
          {detail.requirements.map((r, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] text-ink">
              <span className="text-flame font-mono text-xs pt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
        {detail.stretchGoal && (
          <div className="mt-3.5 pt-3.5 border-t border-line">
            <p className="text-[12.5px] text-muted">
              <span className="text-linkedin font-medium">Stretch goal — </span>
              {detail.stretchGoal}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function Resources({ detail }) {
  if (!detail.resources?.length) return null
  return (
    <section className="px-5 mb-6">
      <h2 className="text-xs font-mono text-muted mb-2.5">helpful references</h2>
      <div className="flex flex-col gap-2">
        {detail.resources.map((r) => (
          <a
            key={r.label}
            href={r.url}
            className="text-[13px] text-ink bg-surface border border-line rounded-lg px-3.5 py-2.5 flex items-center justify-between"
          >
            {r.label}
            <span className="text-faint">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function SubmitSection({
  submitted,
  githubUrl,
  linkedinUrl,
  setGithubUrl,
  setLinkedinUrl,
  githubValid,
  linkedinValid,
  error,
  onSubmit,
  dayNum,
}) {
  if (submitted) {
    return (
      <section className="px-5 mb-8">
        <div className="rounded-xl2 bg-flame/10 ring-1 ring-flame/30 p-5 text-center">
          <span className="text-2xl block mb-2">✓</span>
          <h2 className="font-display text-[15px] font-semibold text-ink">Day {dayNum} proof submitted</h2>
          <p className="text-[12.5px] text-muted mt-1.5">
            Your streak is safe. Tomorrow's task unlocks at midnight.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block text-[13px] font-semibold text-flame"
          >
            Back to dashboard →
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5 mb-10">
      <h2 className="text-xs font-mono text-muted mb-2.5">submit your proof</h2>
      <form onSubmit={onSubmit} className="rounded-xl2 border border-line bg-surface p-4 space-y-4">
        <ProofField
          label="GitHub repository or commit"
          placeholder="https://github.com/you/habit-tracker"
          value={githubUrl}
          onChange={setGithubUrl}
          valid={githubValid}
          color="github"
        />
        <ProofField
          label="LinkedIn post"
          placeholder="https://linkedin.com/posts/you_day12..."
          value={linkedinUrl}
          onChange={setLinkedinUrl}
          valid={linkedinValid}
          color="linkedin"
        />

        {error && (
          <p className="text-[12.5px] text-danger bg-danger/10 ring-1 ring-danger/25 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-flame font-semibold text-[15px] py-3.5 rounded-xl shadow-glow active:scale-[0.98] transition-transform"
          style={{ color: '#0B1020' }}
        >
          Submit today's proof
        </button>
        <p className="text-[11px] text-faint text-center">
          Both links are required — a commit without a post doesn't count as proof of work here.
        </p>
      </form>
    </section>
  )
}

function ProofField({ label, placeholder, value, onChange, valid, color }) {
  const ring = color === 'github' ? 'focus:ring-github/40' : 'focus:ring-linkedin/40'
  const dot = color === 'github' ? 'bg-github' : 'bg-linkedin'
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-[12.5px] text-ink font-medium mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        {label}
      </span>
      <input
        type="url"
        inputMode="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-elevated border border-line rounded-lg px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-faint outline-none focus:ring-2 ${ring}`}
      />
      {value.length > 0 && (
        <span className={`text-[11px] mt-1 block ${valid ? 'text-github' : 'text-danger'}`}>
          {valid ? '✓ looks good' : 'must be a valid link'}
        </span>
      )}
    </label>
  )
}

function FallbackDay({ dayNum, dayEntry }) {
  return (
    <div className="rise px-5 pt-6 pb-10 text-center">
      <Link to="/dashboard" className="text-muted text-sm flex items-center gap-1.5 mb-8">
        <span className="text-base">←</span> Dashboard
      </Link>
      <div className="w-14 h-14 mx-auto rounded-full bg-elevated ring-1 ring-line flex items-center justify-center text-2xl mb-4">
        🗓️
      </div>
      <h1 className="font-display text-lg font-semibold text-ink">
        {dayEntry ? dayEntry.title : `Day ${dayNum} isn't available yet`}
      </h1>
      <p className="text-[13.5px] text-muted mt-2 leading-relaxed">
        {dayNum > 12
          ? "This task unlocks once you've caught up to it in your streak."
          : 'Full task details for this day are being finalized. Check back soon.'}
      </p>
      <Link
        to="/day/12"
        className="mt-6 inline-block text-[13px] font-semibold text-flame"
      >
        Go to today's task (Day 12) →
      </Link>
    </div>
  )
}
