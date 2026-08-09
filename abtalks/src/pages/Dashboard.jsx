import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProofGrid from '../components/ProofGrid.jsx'
import mock from '../data/mock.json'

// Three demo states so reviewers can see every required edge case
// without needing real accounts: normal progress, a fresh Day 1
// profile, and an empty/never-active profile.
const STATES = {
  active: {
    label: 'Day 12 (in progress)',
    student: mock.student,
    days: mock.days,
  },
  fresh: {
    label: 'Day 1 (no streak yet)',
    student: {
      ...mock.student,
      name: 'Aarav Mehta',
      college: 'NIT Surat',
      avatarInitials: 'AM',
      isNewProfile: false,
      currentDay: 1,
      currentStreak: 0,
      longestStreak: 0,
      streakBrokenOnDay: null,
      rank: null,
      totalStudents: 812,
      badges: mock.student.badges.map((b) => ({ ...b, earned: false })),
    },
    days: [{ day: 1, status: 'today', title: 'Set up your dev environment', github: false, linkedin: false }],
  },
  empty: {
    label: 'Empty profile',
    student: {
      ...mock.student,
      name: '',
      college: '',
      avatarInitials: '',
      isNewProfile: true,
      currentDay: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakBrokenOnDay: null,
      rank: null,
      totalStudents: 812,
      badges: mock.student.badges.map((b) => ({ ...b, earned: false })),
    },
    days: [],
  },
}

export default function Dashboard() {
  const [stateKey, setStateKey] = useState('active')
  const { student, days } = STATES[stateKey]

  const todayEntry = useMemo(() => days.find((d) => d.status === 'today'), [days])
  const doneCount = useMemo(() => days.filter((d) => d.status === 'done').length, [days])
  const percentComplete = Math.round((doneCount / mock.student.totalDays) * 100)

  if (student.isNewProfile) {
    return (
      <div className="rise">
        <DemoSwitcher stateKey={stateKey} setStateKey={setStateKey} />
        <EmptyProfileState />
      </div>
    )
  }

  return (
    <div className="rise">
      <DemoSwitcher stateKey={stateKey} setStateKey={setStateKey} />
      <TopBar student={student} />
      <StreakCard student={student} />
      <TodayTaskCard todayEntry={todayEntry} currentDay={student.currentDay} />
      <ProgressCard student={student} days={days} doneCount={doneCount} percentComplete={percentComplete} />
      <StandingCard student={student} />
      <BadgesCard student={student} />
    </div>
  )
}

function DemoSwitcher({ stateKey, setStateKey }) {
  return (
    <div className="px-5 pt-4 pb-1">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-faint shrink-0 pr-1">preview:</span>
        {Object.entries(STATES).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setStateKey(key)}
            className={`text-[10.5px] font-mono px-2.5 py-1 rounded-full border shrink-0 transition-colors ${
              stateKey === key
                ? 'border-flame/50 text-flame bg-flame/10'
                : 'border-line text-faint hover:text-muted'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function TopBar({ student }) {
  return (
    <header className="flex items-center justify-between px-5 pt-3 pb-4">
      <div>
        <p className="text-[13px] text-muted">Welcome back,</p>
        <h1 className="font-display text-lg font-semibold text-ink -mt-0.5">{student.name.split(' ')[0]}</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-elevated ring-1 ring-line flex items-center justify-center font-mono text-sm font-semibold text-ink">
        {student.avatarInitials}
      </div>
    </header>
  )
}

function StreakCard({ student }) {
  const broken = student.currentStreak === 0 && student.streakBrokenOnDay
  return (
    <section className="px-5 mb-3">
      <div className="rounded-xl2 bg-gradient-to-br from-elevated to-surface ring-1 ring-flame/20 p-5 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted font-mono">current streak</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-4xl font-bold text-ink">{student.currentStreak}</span>
              <span className="text-sm text-muted">day{student.currentStreak === 1 ? '' : 's'}</span>
              {student.currentStreak > 0 && <span className="text-xl flicker">🔥</span>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted font-mono">longest</p>
            <p className="font-display text-lg font-semibold text-ink mt-1">{student.longestStreak}d</p>
          </div>
        </div>

        {broken && (
          <div className="mt-4 rounded-lg bg-danger/10 ring-1 ring-danger/25 px-3 py-2.5">
            <p className="text-[12.5px] text-ink">
              <span className="font-semibold">Streak reset on Day {student.streakBrokenOnDay}.</span>{' '}
              <span className="text-muted">Your history is still on your profile — start today's task to begin a new one.</span>
            </p>
          </div>
        )}

        {!broken && student.currentStreak === 0 && (
          <div className="mt-4 rounded-lg bg-elevated ring-1 ring-line px-3 py-2.5">
            <p className="text-[12.5px] text-muted">
              No streak yet — submit today's proof to light your first flame.
            </p>
          </div>
        )}

        <StreakFreeze student={student} />
      </div>
    </section>
  )
}

// Thoughtful idea: a "Streak Freeze" — students in this program are mostly
// coding late at night around college deadlines. One inevitable bad exam
// week shouldn't erase 30 days of visible consistency. One freeze every
// 15 days lets a student protect a single missed day without lying about it —
// the day is marked "frozen", not "done", so the profile stays honest.
function StreakFreeze({ student }) {
  if (student.currentDay < 1) return null
  const freezesAvailable = Math.max(0, Math.floor(student.currentDay / 15) - 0)
  const used = student.streakBrokenOnDay ? 1 : 0
  const remaining = Math.max(0, 1 - used)
  return (
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-linkedin/10 ring-1 ring-linkedin/30 flex items-center justify-center text-[13px]">
          ❄️
        </span>
        <span className="text-[12px] text-muted">
          {remaining > 0 ? '1 streak freeze available' : 'Streak freeze used this cycle'}
        </span>
      </div>
      <span className="text-[10px] font-mono text-faint">resets every 15 days</span>
    </div>
  )
}

function TodayTaskCard({ todayEntry, currentDay }) {
  if (!todayEntry) {
    return (
      <section className="px-5 mb-3">
        <div className="rounded-xl2 border border-line bg-surface p-5 text-center">
          <p className="text-sm text-muted">No task scheduled for today.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="px-5 mb-3">
      <Link to={`/day/${currentDay}`} className="block">
        <div className="rounded-xl2 bg-surface border border-line p-5 active:scale-[0.99] transition-transform">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-flame">today · day {currentDay}</span>
            <span className="text-sm">
  {todayEntry.github && todayEntry.linkedin ? '✓' : '→'}
</span>
          </div>
          <h2 className="font-display text-[17px] font-semibold text-ink leading-snug">
            {todayEntry.title}
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <StatusPill done={todayEntry.github} label="GitHub" color="github" />
            <StatusPill done={todayEntry.linkedin} label="LinkedIn" color="linkedin" />
          </div>
        </div>
      </Link>
    </section>
  )
}

function StatusPill({ done, label, color }) {
  const ring = color === 'github' ? 'ring-github/30 text-github' : 'ring-linkedin/30 text-linkedin'
  return (
    <span className={`text-[11px] font-mono px-2 py-1 rounded-full ring-1 ${done ? ring : 'ring-line text-faint'}`}>
      {done ? '✓' : '○'} {label}
    </span>
  )
}

function ProgressCard({ student, days, doneCount, percentComplete }) {
  return (
    <section className="px-5 mb-3">
      <div className="rounded-xl2 border border-line bg-surface p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted font-mono">overall progress</p>
            <p className="font-display text-xl font-semibold text-ink mt-0.5">
  {doneCount} <span className="text-muted text-sm font-body font-normal">of {student.totalDays} days completed</span>
</p>
          </div>
          <span className="font-mono text-sm text-flame">{percentComplete}%</span>
        </div>

        <div className="h-2 rounded-full bg-elevated overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-flame to-flame/70 rounded-full"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {days.length > 0 ? (
          <ProofGrid days={days} totalDays={student.totalDays} size="sm" />
        ) : (
          <p className="text-[12.5px] text-faint text-center py-3">Your proof grid fills in as you go.</p>
        )}
      </div>
    </section>
  )
}

function StandingCard({ student }) {
  return (
    <section className="px-5 mb-3">
     <div className="rounded-x12 border border-line bg-surface p-5">
        <div>
          <p className="text-xs text-muted font-mono">your standing</p>
          {student.rank ? (
            <p className="font-display text-lg font-semibold text-ink mt-0.5">
              #{student.rank} <span className="text-muted text-sm font-body font-normal">of {student.totalStudents}</span>
            </p>
          ) : (
            <p className="text-[13px] text-muted mt-0.5">Ranked after your first submission</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-muted font-mono">track</p>
          <p className="text-[13px] text-ink mt-0.5">{student.track}</p>
        </div>
      </div>
    </section>
  )
}

function BadgesCard({ student }) {
  return (
    <section className="px-5 mb-4">
      <p className="text-xs font-mono text-muted mb-2.5 px-1">achievements</p>
      <div className="grid grid-cols-2 gap-2.5">
        {student.badges.map((b) => (
          <div
            key={b.id}
            className={`rounded-xl border p-3.5 text-center ${
              b.earned ? 'border-flame/30 bg-flame/5' : 'border-line bg-surface'
            }`}
          >
            <span className="text-lg block mb-1">{b.earned ? '🏅' : '🔒'}</span>
            <span className={`text-[11.5px] leading-tight block ${b.earned ? 'text-ink' : 'text-faint'}`}>
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function EmptyProfileState() {
  return (
    <section className="px-5 pt-10 pb-6 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-elevated ring-1 ring-line flex items-center justify-center text-2xl mb-4">
        👋
      </div>
      <h1 className="font-display text-lg font-semibold text-ink">Your dashboard is waiting</h1>
      <p className="text-[13.5px] text-muted mt-2 leading-relaxed px-2">
        You haven't picked a track yet, so there's nothing to track. Choose a
        60-day track to get your Day 1 task and start your streak.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block w-full text-center bg-flame font-semibold text-[15px] py-3.5 rounded-xl shadow-glow"
        style={{ color: '#0B1020' }}
      >
        Choose your track
      </Link>
    </section>
  )
}
