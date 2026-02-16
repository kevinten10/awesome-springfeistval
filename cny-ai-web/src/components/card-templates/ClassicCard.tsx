import { forwardRef } from 'react'

interface Props {
  recipientName: string
  senderName: string
  message: string
}

export const ClassicCard = forwardRef<HTMLDivElement, Props>(
  ({ recipientName, senderName, message }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[340px] min-h-[480px] rounded-2xl flex flex-col items-center justify-between text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(170deg, #c41e1e 0%, #8b0000 40%, #6b0000 100%)',
        }}
      >
        {/* Outer gold border */}
        <div
          className="absolute inset-2 rounded-xl pointer-events-none"
          style={{
            border: '2px solid rgba(255,215,0,0.5)',
            boxShadow: 'inset 0 0 20px rgba(255,215,0,0.1)',
          }}
        />

        {/* Corner ornaments - Chinese knot style */}
        <svg className="absolute top-4 left-4 w-8 h-8 opacity-60" viewBox="0 0 32 32">
          <path d="M4 4 L16 4 L16 8 L8 8 L8 16 L4 16 Z" fill="#FFD700" />
          <circle cx="6" cy="6" r="2" fill="#FFD700" />
        </svg>
        <svg className="absolute top-4 right-4 w-8 h-8 opacity-60" viewBox="0 0 32 32" style={{ transform: 'scaleX(-1)' }}>
          <path d="M4 4 L16 4 L16 8 L8 8 L8 16 L4 16 Z" fill="#FFD700" />
          <circle cx="6" cy="6" r="2" fill="#FFD700" />
        </svg>
        <svg className="absolute bottom-4 left-4 w-8 h-8 opacity-60" viewBox="0 0 32 32" style={{ transform: 'scaleY(-1)' }}>
          <path d="M4 4 L16 4 L16 8 L8 8 L8 16 L4 16 Z" fill="#FFD700" />
          <circle cx="6" cy="6" r="2" fill="#FFD700" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-8 h-8 opacity-60" viewBox="0 0 32 32" style={{ transform: 'scale(-1)' }}>
          <path d="M4 4 L16 4 L16 8 L8 8 L8 16 L4 16 Z" fill="#FFD700" />
          <circle cx="6" cy="6" r="2" fill="#FFD700" />
        </svg>

        {/* Decorative clouds at top */}
        <svg className="absolute top-0 left-0 right-0 h-16 opacity-10" viewBox="0 0 340 60" preserveAspectRatio="none">
          <ellipse cx="60" cy="50" rx="50" ry="30" fill="#FFD700" />
          <ellipse cx="170" cy="55" rx="60" ry="25" fill="#FFD700" />
          <ellipse cx="280" cy="50" rx="50" ry="30" fill="#FFD700" />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-10 px-8">
          {/* Top */}
          <div>
            <div className="text-5xl mb-3 drop-shadow-lg">🐴</div>
            <h3
              className="text-3xl font-black tracking-widest"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#FFD700',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              马年大吉
            </h3>
            <div
              className="w-24 h-0.5 mx-auto mt-3"
              style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}
            />
          </div>

          {/* Message */}
          <div className="flex-1 flex flex-col justify-center py-6">
            <p
              className="text-sm mb-4"
              style={{ color: 'rgba(255,215,0,0.7)' }}
            >
              亲爱的 {recipientName || '___'}
            </p>
            <p
              className="text-lg leading-loose whitespace-pre-wrap"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#FFF5D4',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {message || '新春快乐\n马到成功\n万事如意'}
            </p>
          </div>

          {/* Bottom */}
          <div>
            <div
              className="w-16 h-px mx-auto mb-3"
              style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}
            />
            <p style={{ color: 'rgba(255,215,0,0.8)', fontSize: '13px' }}>
              —— {senderName || '___'} 敬上
            </p>
            <p style={{ color: 'rgba(255,215,0,0.4)', fontSize: '11px', marginTop: '4px' }}>
              2026 丙午马年 · 新春
            </p>
          </div>
        </div>
      </div>
    )
  },
)

ClassicCard.displayName = 'ClassicCard'
