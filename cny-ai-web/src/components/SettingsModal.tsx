import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface Props {
  onClose: () => void
}

export function SettingsModal({ onClose }: Props) {
  const { apiKey, setApiKey } = useAppStore()
  const [key, setKey] = useState(apiKey)
  const [showKey, setShowKey] = useState(false)

  const handleSave = () => {
    setApiKey(key.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-bounce-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">设置</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Status indicator */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
            <span className="font-medium">已就绪</span> — 可直接使用，无需填写 API Key
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              自定义 API Key（可选）
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="留空则使用内置服务"
                className="input-festival pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              填写后将直接调用你自己的智谱 GLM-4-Flash，留空则使用内置代理服务
            </p>
          </div>

          <button onClick={handleSave} className="btn-festival w-full">
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
