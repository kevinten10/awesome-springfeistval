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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              智谱 API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="请输入智谱 GLM API Key"
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
              在 open.bigmodel.cn 获取 API Key，使用 GLM-4-Flash 模型（免费）
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
