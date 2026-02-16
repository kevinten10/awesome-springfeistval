import { forwardRef } from 'react'

interface Props {
  recipientName: string
  senderName: string
  message: string
}

export const CuteCard = forwardRef<HTMLDivElement, Props>(
  ({ recipientName, senderName, message }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[340px] min-h-[480px] rounded-2xl flex flex-col items-center justify-between text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFF0E6 0%, #FFE4D6 30%, #FFDEE9 70%, #FFD6E0 100%)',
        }}
      >
        {/* Floating decorations */}
        <div className="absolute top-8 left-6 text-2xl opacity-40 animate-bounce" style={{ animationDelay: '0s' }}>🧧</div>
        <div className="absolute top-20 right-8 text-xl opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-32 left-8 text-xl opacity-30 animate-bounce" style={{ animationDelay: '1s' }}>🏮</div>
        <div className="absolute bottom-20 right-6 text-2xl opacity-40 animate-bounce" style={{ animationDelay: '1.5s' }}>🎉</div>

        {/* Confetti dots */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 340 480">
          <circle cx="50" cy="40" r="3" fill="#f59e0b" />
          <circle cx="290" cy="60" r="2" fill="#ec4899" />
          <circle cx="80" cy="120" r="2" fill="#f97316" />
          <circle cx="310" cy="180" r="3" fill="#f59e0b" />
          <circle cx="30" cy="250" r="2" fill="#ec4899" />
          <circle cx="260" cy="300" r="3" fill="#f97316" />
          <circle cx="100" cy="380" r="2" fill="#f59e0b" />
          <circle cx="300" cy="420" r="2" fill="#ec4899" />
          <circle cx="170" cy="50" r="2" fill="#f97316" />
          <circle cx="220" cy="350" r="3" fill="#f59e0b" />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-10 px-8">
          {/* Top section with horse */}
          <div>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{
                background: 'linear-gradient(135deg, #FFF5E6, #FFE8CC)',
                boxShadow: '0 4px 15px rgba(249,115,22,0.2)',
              }}
            >
              <span className="text-4xl">🐴</span>
            </div>
            <h3
              className="text-2xl font-bold"
              style={{ color: '#E85D3A' }}
            >
              马年快乐！
            </h3>
            <div className="flex gap-2 justify-center mt-2">
              <span className="text-sm">🧧</span>
              <span className="text-sm">🎊</span>
              <span className="text-sm">🏮</span>
              <span className="text-sm">✨</span>
              <span className="text-sm">🎆</span>
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 flex flex-col justify-center py-6 w-full">
            <p className="text-sm mb-3" style={{ color: '#E8875A' }}>
              给 {recipientName || '___'} 的专属祝福 💝
            </p>
            <div
              className="rounded-2xl p-5 mx-auto w-full"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 10px rgba(249,115,22,0.1)',
              }}
            >
              <p
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ color: '#5C4033' }}
              >
                {message || '新春快乐\n马到成功\n万事如意'}
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div>
            <p className="text-sm" style={{ color: '#E8875A' }}>
              来自 {senderName || '___'} 的爱 ❤️
            </p>
            <p className="text-xs mt-1" style={{ color: '#E8875A', opacity: 0.5 }}>
              2026 马年 · 新春快乐
            </p>
          </div>
        </div>
      </div>
    )
  },
)

CuteCard.displayName = 'CuteCard'
