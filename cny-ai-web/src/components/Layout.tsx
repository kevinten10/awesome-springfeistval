import { NavLink, Outlet } from 'react-router-dom'
import { Home, MessageSquareHeart, Shield, Image, Settings } from 'lucide-react'
import { useState } from 'react'
import { SettingsModal } from './SettingsModal'

const tabs = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/greeting', icon: MessageSquareHeart, label: '拜年' },
  { to: '/defense', icon: Shield, label: '防线' },
  { to: '/card', icon: Image, label: '贺卡' },
]

export function Layout() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-festival-red to-festival-crimson text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <h1 className="font-festival text-lg font-bold tracking-wide">
          🐴 马年春节AI助手
        </h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="打开设置"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-safe">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                  isActive
                    ? 'text-festival-red'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon size={22} />
              <span className="text-xs">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
