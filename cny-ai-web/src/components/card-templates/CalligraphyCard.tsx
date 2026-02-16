import { forwardRef } from 'react'

interface Props {
  recipientName: string
  senderName: string
  message: string
}

export const CalligraphyCard = forwardRef<HTMLDivElement, Props>(
  ({ recipientName, senderName, message }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[340px] min-h-[480px] rounded-2xl flex flex-col items-center justify-between text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FAF6EC 0%, #F2EADB 50%, #EDE4D0 100%)',
        }}
      >
        {/* Rice paper texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a97d' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Ink brush border */}
        <div
          className="absolute inset-4 rounded-xl pointer-events-none"
          style={{
            border: '1.5px solid rgba(60,40,20,0.15)',
          }}
        />

        {/* Ink splash decoration top */}
        <svg className="absolute top-0 left-0 w-24 h-24 opacity-[0.06]" viewBox="0 0 100 100">
          <path d="M10 90 Q30 30 90 10 Q50 20 40 50 Q30 70 10 90Z" fill="#2C1810" />
        </svg>

        {/* Plum blossom decoration */}
        <svg className="absolute bottom-12 right-6 w-16 h-32 opacity-[0.08]" viewBox="0 0 60 120">
          <path d="M30 120 Q30 80 20 60 Q10 40 30 0" stroke="#8B0000" strokeWidth="1.5" fill="none" />
          <circle cx="25" cy="40" r="5" fill="#8B0000" />
          <circle cx="35" cy="30" r="4" fill="#8B0000" />
          <circle cx="20" cy="55" r="4" fill="#8B0000" />
          <circle cx="38" cy="50" r="3" fill="#8B0000" />
        </svg>

        {/* Red seal stamp */}
        <div
          className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center"
          style={{
            border: '2.5px solid #b91c1c',
            borderRadius: '4px',
            transform: 'rotate(-12deg)',
            opacity: 0.75,
          }}
        >
          <span
            className="font-bold leading-none text-center"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              color: '#b91c1c',
              fontSize: '12px',
            }}
          >
            马年
            <br />
            大吉
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-12 px-10">
          {/* Top */}
          <div>
            <h3
              className="text-3xl font-black tracking-[0.2em]"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#2C1810',
              }}
            >
              新春吉祥
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, #8B6914)' }} />
              <span className="text-xs" style={{ color: '#8B6914' }}>丙午年</span>
              <div className="w-10 h-px" style={{ background: 'linear-gradient(90deg, #8B6914, transparent)' }} />
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 flex flex-col justify-center py-8">
            <p
              className="text-sm mb-5"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#8B6914',
              }}
            >
              致 {recipientName || '___'}
            </p>
            <p
              className="text-xl leading-[2.2] whitespace-pre-wrap"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#2C1810',
              }}
            >
              {message || '新春快乐\n马到成功\n万事如意'}
            </p>
          </div>

          {/* Bottom */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #8B6914)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B6914' }} />
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #8B6914, transparent)' }} />
            </div>
            <p
              className="text-sm"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: '#5C4033',
              }}
            >
              {senderName || '___'} 拜上
            </p>
            <p className="text-xs mt-1" style={{ color: '#8B6914', opacity: 0.5 }}>
              岁在丙午 · 正月
            </p>
          </div>
        </div>
      </div>
    )
  },
)

CalligraphyCard.displayName = 'CalligraphyCard'
