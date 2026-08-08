import React from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ChallengeDay from './pages/ChallengeDay.jsx'

export default function App() {
  const { pathname } = useLocation()
  const showNav = pathname !== '/'

  return (
    <div className="min-h-screen bg-base">
      <div className="app-shell pb-24">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:dayId" element={<ChallengeDay />} />
        </Routes>
      </div>
      {showNav && <BottomNav pathname={pathname} />}
    </div>
  )
}

function BottomNav({ pathname }) {
  const items = [
    { to: '/dashboard', label: 'Home', icon: HomeIcon, match: '/dashboard' },
    { to: '/day/12', label: 'Today', icon: BoltIcon, match: '/day' },
  ]
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app z-40">
      <div className="mx-3 mb-3 rounded-2xl border border-line bg-surface/90 backdrop-blur px-2 py-2 shadow-card flex items-center justify-around">
        {items.map((item) => {
          const active = pathname.startsWith(item.match)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200 ${
  active
    ? 'text-flame bg-flame/10'
    : 'text-muted hover:text-ink hover:bg-black/5'
}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BoltIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
