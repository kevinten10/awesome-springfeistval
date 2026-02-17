import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

export function SettingsModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-bounce-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">关于</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🐴</div>
            <div className="font-bold text-festival-red text-base">马年春节 AI 助手</div>
            <div className="text-xs text-gray-400 mt-1">2026 · 马到成功</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-lg">🎊</span>
              <div>
                <div className="font-medium text-gray-700">拜年话术</div>
                <div className="text-xs text-gray-400">AI 生成 8 种关系 × 5 种风格的个性化祝福语</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🛡️</span>
              <div>
                <div className="font-medium text-gray-700">亲戚防线</div>
                <div className="text-xs text-gray-400">智能回复 8 类催婚催娃尴尬问题</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🎴</span>
              <div>
                <div className="font-medium text-gray-700">贺卡生成</div>
                <div className="text-xs text-gray-400">4 款精美模板，一键导出分享</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 text-xs text-gray-400 text-center space-y-1">
            <div>AI 由智谱 GLM-4-Flash 驱动</div>
            <a
              href="https://github.com/kevinten10/awesome-springfeistval"
              target="_blank"
              rel="noopener noreferrer"
              className="text-festival-red hover:underline block"
            >
              GitHub 开源项目
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
