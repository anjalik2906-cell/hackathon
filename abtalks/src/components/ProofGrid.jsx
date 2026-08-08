import React from 'react'

/**
 * ProofGrid — the signature device of the redesign.
 * A 60-cell grid echoing the GitHub contribution graph the students
 * already live inside every day. Each cell encodes one day's proof state:
 *   done      -> fill amber (streak fire)
 *   partial   -> half github/half linkedin split
 *   missed    -> hollow red ring
 *   today     -> pulsing outline
 *   upcoming  -> dim placeholder
 *
 * Used three ways in this app:
 *   - Landing page: a seeded "preview" grid, sets expectation before signup
 *   - Dashboard: the student's real progress, full 60 days
 *   - Day page: a compact 12-cell slice around the current day
 */

function cellState(dayData) {
  if (!dayData) return 'upcoming'
  if (dayData.status === 'today') return 'today'
  if (dayData.status === 'missed') return 'missed'
  if (dayData.status === 'done') {
    if (dayData.github && dayData.linkedin) return 'done'
    if (dayData.github || dayData.linkedin) return 'partial'
    return 'missed'
  }
  return 'upcoming'
}

function Cell({ day, state, size = 'md', label }) {
  const sizes = {
    sm: 'w-3.5 h-3.5 rounded-[3px]',
    md: 'w-4.5 h-4.5 rounded-[4px]',
    lg: 'w-6 h-6 rounded-[5px]',
  }
  const base = sizes[size] || sizes.md

  const styles = {
    done: 'bg-flame shadow-[0_0_6px_rgba(255,176,32,0.55)]',
    partial: 'bg-gradient-to-br from-flame to-github/70',
    missed: 'bg-transparent ring-1 ring-danger/60',
    today: 'bg-elevated ring-2 ring-flame animate-pulse',
    upcoming: 'bg-elevated/70',
  }

  return (
    <div
      title={label}
      aria-label={label}
      className={`${base} ${styles[state]} transition-colors`}
    />
  )
}

export default function ProofGrid({ days, totalDays = 60, size = 'md', compact = false, focusDay = null }) {
  const byDay = {}
  days.forEach((d) => { byDay[d.day] = d })

  let range = Array.from({ length: totalDays }, (_, i) => i + 1)
  if (compact && focusDay) {
    const start = Math.max(1, focusDay - 5)
    const end = Math.min(totalDays, start + 11)
    range = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const cols = compact ? range.length : 10

  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {range.map((day) => {
        const d = byDay[day]
        const state = cellState(d)
        const label = d
          ? `Day ${day}: ${d.status === 'today' ? "today's task" : d.status}`
          : `Day ${day}: upcoming`
        return <Cell key={day} day={day} state={state} size={size} label={label} />
      })}
    </div>
  )
}
