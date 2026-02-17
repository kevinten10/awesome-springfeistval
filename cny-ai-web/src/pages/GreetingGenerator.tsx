import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { RELATIONSHIPS, GREETING_STYLES } from '@/lib/constants'
import { generateGreeting } from '@/services/ai-service'
import { useAppStore } from '@/lib/store'
import { ResultCard } from '@/components/ResultCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { RelationshipType, GreetingStyle } from '@/types'

interface ParsedGreeting {
  label: string
  emoji: string
  content: string
}

function parseGreetingVersions(raw: string): ParsedGreeting[] {
  const sections: ParsedGreeting[] = []
  const patterns = [
    { regex: /【简短版】/i, label: '简短版', emoji: '⚡' },
    { regex: /【标准版】/i, label: '标准版', emoji: '✨' },
    { regex: /【走心版】/i, label: '走心版', emoji: '💖' },
  ]

  // Try splitting by markers
  const markers = raw.match(/【[^】]+】/g)
  if (markers && markers.length >= 2) {
    const parts = raw.split(/【[^】]+】/).filter(Boolean)
    parts.forEach((part, i) => {
      const matched = patterns[i]
      sections.push({
        label: matched?.label ?? `版本${i + 1}`,
        emoji: matched?.emoji ?? '📝',
        content: part.trim(),
      })
    })
  }

  // Fallback: return as single block
  if (sections.length === 0) {
    sections.push({ label: '祝福语', emoji: '🧧', content: raw.trim() })
  }

  return sections
}

const NAME_EXAMPLES = ['王叔叔', '张阿姨', '李哥', '小美', '老板']
const CONTEXT_EXAMPLES = [
  '对方今年刚退休',
  '我们是大学同学',
  '对方刚升职加薪',
  '好久没见面了',
  '对方今年生了宝宝',
  '对方是程序员',
]

export function GreetingGenerator() {
  const { addGreetingHistory } = useAppStore()
  const [relationship, setRelationship] = useState<RelationshipType>('elder_family')
  const [style, setStyle] = useState<GreetingStyle>('formal')
  const [recipientName, setRecipientName] = useState('')
  const [context, setContext] = useState('')
  const [versions, setVersions] = useState<ParsedGreeting[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    setVersions([])
    try {
      const request = { relationship, style, recipientName: recipientName || undefined, context: context || undefined }
      const content = await generateGreeting(request)
      setVersions(parseGreetingVersions(content))
      addGreetingHistory({ request, result: content, timestamp: Date.now() })
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const appendContext = (text: string) => {
    setContext((prev) => (prev ? `${prev}，${text}` : text))
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto space-y-5">
      <div className="text-center">
        <h2 className="font-bold text-xl">🧧 拜年话术 Agent</h2>
        <p className="text-gray-500 text-sm mt-1">选择对象和风格，AI 帮你写拜年话</p>
      </div>

      {/* Relationship */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">拜年对象</label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.map((r) => (
            <button
              key={r.value}
              onClick={() => setRelationship(r.value)}
              className={`chip ${relationship === r.value ? 'chip-active' : ''}`}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">风格偏好</label>
        <div className="flex flex-wrap gap-2">
          {GREETING_STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value)}
              className={`chip ${style === s.value ? 'chip-active' : ''}`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recipient name with quick-fill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">对方称呼（选填）</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="点击下方快捷填入或自行输入"
          className="input-festival"
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {NAME_EXAMPLES.map((name) => (
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

      {/* Context with quick tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">额外信息（选填）</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="点击标签快速添加，或自行输入"
          rows={2}
          className="input-festival resize-none"
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {CONTEXT_EXAMPLES.map((text) => (
            <button
              key={text}
              onClick={() => appendContext(text)}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600
                         border border-gray-200 active:scale-95 transition-transform"
            >
              + {text}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="btn-festival w-full"
      >
        <Sparkles size={18} />
        {loading ? 'AI 正在创作...' : '生成拜年话术'}
      </button>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={handleGenerate} className="text-xs font-medium underline ml-3 flex-shrink-0">
            重试
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Results - split by version */}
      {versions.length > 0 && !loading && (
        <div className="space-y-3">
          {versions.map((v, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span>{v.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{v.label}</span>
              </div>
              <ResultCard content={v.content} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
