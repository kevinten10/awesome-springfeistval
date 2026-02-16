import { useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'
import { copyToClipboard } from '@/services/share-utils'

interface Props {
  content: string
  className?: string
}

export function ResultCard({ content, className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`card-festival animate-slide-up ${className}`}>
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
        {content}
      </div>
      <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium
                     bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
    </div>
  )
}

interface CardResultProps {
  content: string
  onDownload?: () => void
  className?: string
}

export function CardResult({ content, onDownload, className = '' }: CardResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`card-festival animate-slide-up ${className}`}>
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
        {content}
      </div>
      <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium
                     bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? '已复制' : '复制文字'}
        </button>
        {onDownload && (
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium
                       bg-festival-red text-white hover:bg-festival-crimson transition-colors"
          >
            <Download size={14} />
            保存图片
          </button>
        )}
      </div>
    </div>
  )
}
