import { useState, useRef } from 'react'
import { Sparkles, Download } from 'lucide-react'
import { CARD_TEMPLATES, RELATIONSHIPS } from '@/lib/constants'
import { generateCardText } from '@/services/ai-service'
import { saveElementAsImage } from '@/services/share-utils'
import { useAppStore } from '@/lib/store'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ClassicCard } from '@/components/card-templates/ClassicCard'
import { ModernCard } from '@/components/card-templates/ModernCard'
import { CuteCard } from '@/components/card-templates/CuteCard'
import { CalligraphyCard } from '@/components/card-templates/CalligraphyCard'
import type { CardTemplate, RelationshipType } from '@/types'

const CARD_COMPONENTS = {
  classic: ClassicCard,
  modern: ModernCard,
  cute: CuteCard,
  calligraphy: CalligraphyCard,
} as const

const RECIPIENT_EXAMPLES = ['爸爸', '妈妈', '老师', '闺蜜', '老板']
const SENDER_EXAMPLES = ['儿子', '女儿', '学生', '你的好友']
const MESSAGE_EXAMPLES = [
  '马到成功，万事如意',
  '新春快乐，阖家幸福',
  '身体健康，工作顺利',
]

export function CardMaker() {
  const { addCardHistory } = useAppStore()
  const cardRef = useRef<HTMLDivElement>(null)

  const [template, setTemplate] = useState<CardTemplate>('classic')
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [relationship, setRelationship] = useState<RelationshipType>('friend')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAIGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const request = {
        recipientName: recipientName || '朋友',
        senderName: senderName || '我',
        relationship,
        message: message || undefined,
        template,
      }
      const content = await generateCardText(request)
      setMessage(content)
      addCardHistory({ request, result: content, timestamp: Date.now() })
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!cardRef.current) return
    setSaving(true)
    try {
      await saveElementAsImage(cardRef.current, `马年贺卡-${recipientName || '新春快乐'}.png`)
    } catch {
      setError('保存失败，请长按图片保存')
    } finally {
      setSaving(false)
    }
  }

  const CardComponent = CARD_COMPONENTS[template]

  return (
    <div className="px-4 py-5 max-w-lg mx-auto space-y-5">
      <div className="text-center">
        <h2 className="font-bold text-xl">💌 贺卡生成器</h2>
        <p className="text-gray-500 text-sm mt-1">制作专属马年贺卡，保存分享</p>
      </div>

      {/* Template selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">选择模板</label>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CARD_TEMPLATES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTemplate(t.value)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl border transition-all min-w-[80px]
                ${template === t.value
                  ? 'border-festival-red bg-red-50 shadow-sm'
                  : 'border-gray-200'
                }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recipient with quick-fill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">收件人</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="点击快速填入或自行输入"
          className="input-festival"
        />
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {RECIPIENT_EXAMPLES.map((name) => (
            <button
              key={name}
              onClick={() => setRecipientName(name)}
              className="text-xs px-2.5 py-1 rounded-full bg-festival-paper text-festival-crimson
                         border border-festival-gold/30 active:scale-95 transition-transform"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Sender with quick-fill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">发送者</label>
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="你的称呼"
          className="input-festival"
        />
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {SENDER_EXAMPLES.map((name) => (
            <button
              key={name}
              onClick={() => setSenderName(name)}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600
                         border border-gray-200 active:scale-95 transition-transform"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Relationship */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">关系</label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.slice(0, 6).map((r) => (
            <button
              key={r.value}
              onClick={() => setRelationship(r.value)}
              className={`chip text-xs ${relationship === r.value ? 'chip-active' : ''}`}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message with AI generate + quick examples */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700">贺卡文案</label>
          <button
            onClick={handleAIGenerate}
            disabled={loading}
            className="inline-flex items-center gap-1 text-xs text-festival-red hover:text-festival-crimson font-medium"
          >
            <Sparkles size={14} />
            {loading ? '生成中...' : 'AI 生成文案'}
          </button>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入祝福语，或点击标签/AI 生成"
          rows={4}
          className="input-festival resize-none"
        />
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {MESSAGE_EXAMPLES.map((text) => (
            <button
              key={text}
              onClick={() => setMessage(text)}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600
                         border border-gray-200 active:scale-95 transition-transform"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {loading && <LoadingSpinner message="AI 正在创作贺卡文案..." />}

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={handleAIGenerate} className="text-xs font-medium underline ml-3 flex-shrink-0">
            重试
          </button>
        </div>
      )}

      {/* Card Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">贺卡预览</label>
        <div className="flex justify-center overflow-x-auto pb-2">
          <CardComponent
            ref={cardRef}
            recipientName={recipientName}
            senderName={senderName}
            message={message}
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          手机端长按图片可直接保存
        </p>
      </div>

      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={saving}
        className="btn-festival w-full"
      >
        <Download size={18} />
        {saving ? '保存中...' : '保存贺卡图片'}
      </button>
    </div>
  )
}
