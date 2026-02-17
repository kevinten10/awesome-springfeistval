import { useState } from 'react'
import { ShieldAlert, Zap } from 'lucide-react'
import { AWKWARD_QUESTIONS, DEFENSE_STRATEGIES, QUICK_FIRE_RESPONSES } from '@/lib/constants'
import { generateDefense } from '@/services/ai-service'
import { useAppStore } from '@/lib/store'
import { ResultCard } from '@/components/ResultCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { DefenseCategory, DefenseStrategy } from '@/types'

const CONTEXT_TAGS: Record<DefenseCategory, string[]> = {
  relationship: ['单身', '刚分手', '在谈恋爱', '不想谈恋爱'],
  marriage: ['还没对象', '刚订婚', '不着急', '异地恋'],
  salary: ['程序员', '月薪2万', '自由职业', '刚转行'],
  children: ['刚结婚', '还没考虑', '有一个了还催', '丁克'],
  job: ['大厂', '创业中', '自由职业', '刚换工作'],
  house: ['在攒首付', '租房挺好', '不打算买', '在看房'],
  weight: ['过年吃多了', '在健身', '工作太忙没空运动', '本来就这样'],
  education: ['在工作了', '考虑中', '考过没上', '不想考'],
}

interface ParsedDefense {
  label: string
  content: string
  note: string
}

function parseDefenseResponses(raw: string): ParsedDefense[] {
  const sections: ParsedDefense[] = []
  const markers = raw.match(/【回复[^】]*】/g)

  if (markers && markers.length >= 2) {
    const parts = raw.split(/【回复[^】]*】/).filter(Boolean)
    parts.forEach((part, i) => {
      const trimmed = part.trim()
      // Extract strategy note in parentheses at end
      const noteMatch = trimmed.match(/[（(]([^）)]+)[）)]$/)
      const content = noteMatch ? trimmed.replace(/[（(][^）)]+[）)]$/, '').trim() : trimmed
      sections.push({
        label: `回复 ${i + 1}`,
        content,
        note: noteMatch?.[1] ?? '',
      })
    })
  }

  if (sections.length === 0) {
    sections.push({ label: '回复', content: raw.trim(), note: '' })
  }

  return sections
}

export function RelativeDefense() {
  const { addDefenseHistory } = useAppStore()
  const [question, setQuestion] = useState<DefenseCategory>('relationship')
  const [strategy, setStrategy] = useState<DefenseStrategy>('humor')
  const [context, setContext] = useState('')
  const [responses, setResponses] = useState<ParsedDefense[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showQuickFire, setShowQuickFire] = useState(true)

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    setResponses([])
    setShowQuickFire(false)
    try {
      const request = { question, strategy, context: context || undefined }
      const content = await generateDefense(request)
      setResponses(parseDefenseResponses(content))
      addDefenseHistory({ request, result: content, timestamp: Date.now() })
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = AWKWARD_QUESTIONS.find((q) => q.value === question)
  const quickFires = QUICK_FIRE_RESPONSES[question]
  const contextTags = CONTEXT_TAGS[question]

  return (
    <div className="px-4 py-5 max-w-lg mx-auto space-y-5">
      <div className="text-center">
        <h2 className="font-bold text-xl">🛡️ 亲戚防线</h2>
        <p className="text-gray-500 text-sm mt-1">选择问题和策略，AI 帮你巧妙应对</p>
      </div>

      {/* Question selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">亲戚问了什么？</label>
        <div className="grid grid-cols-2 gap-2">
          {AWKWARD_QUESTIONS.map((q) => (
            <button
              key={q.value}
              onClick={() => { setQuestion(q.value); setShowQuickFire(true); setResponses([]); setContext('') }}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all
                ${question === q.value
                  ? 'border-festival-red bg-red-50 text-festival-crimson font-medium'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <span className="text-lg">{q.icon}</span>
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current question display */}
      {currentQuestion && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <p className="text-amber-800 font-medium">&ldquo;{currentQuestion.question}&rdquo;</p>
        </div>
      )}

      {/* Quick fire responses */}
      {showQuickFire && quickFires && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-festival-gold" />
            <span className="text-sm font-medium text-gray-700">速查回复（免 AI）</span>
          </div>
          <div className="space-y-2">
            {quickFires.map((text, i) => (
              <ResultCard key={i} content={text} />
            ))}
          </div>
        </div>
      )}

      {/* Strategy selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">防御策略</label>
        <div className="flex flex-wrap gap-2">
          {DEFENSE_STRATEGIES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStrategy(s.value)}
              className={`chip ${strategy === s.value ? 'chip-active' : ''}`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Context with quick tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">你的情况（选填）</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {contextTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setContext(tag)}
              className={`text-xs px-2.5 py-1 rounded-full active:scale-95 transition-all
                ${context === tag
                  ? 'bg-festival-gold text-white border border-festival-amber'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="选择标签或自行输入情况"
          className="input-festival"
        />
      </div>

      {/* Generate */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="btn-festival-gold w-full"
      >
        <ShieldAlert size={18} />
        {loading ? 'AI 正在组织话术...' : '启动 AI 防线'}
      </button>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={handleGenerate} className="text-xs font-medium underline ml-3 flex-shrink-0">
            重试
          </button>
        </div>
      )}

      {loading && <LoadingSpinner message="AI 正在组织高情商回复..." />}

      {/* AI results - split by response */}
      {responses.length > 0 && !loading && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">AI 回复方案</h3>
          {responses.map((r, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-white bg-festival-gold rounded-full px-2 py-0.5">
                  {r.label}
                </span>
                {r.note && (
                  <span className="text-xs text-gray-400">{r.note}</span>
                )}
              </div>
              <ResultCard content={r.content} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
