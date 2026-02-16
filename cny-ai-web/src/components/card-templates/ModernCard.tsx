import { forwardRef } from 'react'

interface Props {
  recipientName: string
  senderName: string
  message: string
}

export const ModernCard = forwardRef<HTMLDivElement, Props>(
  ({ recipientName, senderName, message }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[340px] min-h-[480px] rounded-2xl flex flex-col justify-between relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #FFFDF5 0%, #FFF8E7 40%, #FFF0D0 100%)',
        }}
      >
        {/* Accent stripe at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: 'linear-gradient(90deg, #dc2626, #f59e0b, #dc2626)' }}
        />

        {/* Subtle geometric pattern */}
        <svg className="absolute top-0 right-0 w-40 h-40 opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="#dc2626" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#dc2626" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="#dc2626" strokeWidth="1" fill="none" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#dc2626" strokeWidth="0.5" />
        </svg>

        {/* Large faded horse in background */}
        <div
          className="absolute bottom-10 right-4 text-8xl opacity-[0.06] pointer-events-none"
          style={{ transform: 'rotate(-15deg)' }}
        >
          🐴
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8">
          {/* Top */}
          <div>
            <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-2">Happy New Year 2026</p>
            <h3
              className="text-3xl font-bold"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#b91c1c',
              }}
            >
              新春快乐
            </h3>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-festival-red to-transparent" />
              <span className="text-festival-gold text-xs">马年</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-festival-gold to-transparent" />
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 flex flex-col justify-center py-8">
            <p className="text-gray-400 text-sm mb-4">
              To {recipientName || '___'}
            </p>
            <p
              className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              {message || '新春快乐\n马到成功\n万事如意'}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-500 text-sm">From {senderName || '___'}</p>
              <p className="text-gray-300 text-xs mt-1">2026 · 丙午年</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #dc2626, #f59e0b)' }}
              >
                <span className="text-white text-lg">🐴</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

ModernCard.displayName = 'ModernCard'
