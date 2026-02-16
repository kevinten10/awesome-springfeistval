import { useNavigate } from 'react-router-dom'
import { MessageSquareHeart, Shield, Image } from 'lucide-react'

const features = [
  {
    to: '/greeting',
    icon: MessageSquareHeart,
    emoji: '🧧',
    title: '拜年话术 Agent',
    desc: '一键生成得体拜年话，不再千篇一律',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    to: '/defense',
    icon: Shield,
    emoji: '🛡️',
    title: '亲戚防线',
    desc: '轻松应对灵魂拷问，春节社交不慌',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    to: '/card',
    icon: Image,
    emoji: '💌',
    title: '贺卡生成器',
    desc: '制作专属新年贺卡，一键保存分享',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-3">🐴</div>
        <h2 className="font-festival text-2xl font-bold text-festival-crimson mb-2">
          2026 马年大吉
        </h2>
        <p className="text-gray-500 text-sm">
          AI 春节三件套 — 拜年不慌，过年有底
        </p>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        {features.map((f) => (
          <button
            key={f.to}
            onClick={() => navigate(f.to)}
            className="w-full text-left"
          >
            <div
              className={`bg-gradient-to-r ${f.gradient} rounded-2xl p-5 text-white
                         shadow-lg active:scale-[0.98] transition-transform duration-150`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{f.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="text-white/80 text-sm mt-0.5">{f.desc}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-gray-400 text-xs">
        <p>🧧 恭喜发财 · 马到成功 · 万事如意 🧧</p>
        <p className="mt-1">Powered by AI · 智谱 GLM</p>
      </div>
    </div>
  )
}
