import type { CardRequest } from '@/types'

const RELATIONSHIP_LABELS: Record<string, string> = {
  elder_family: '长辈',
  peer_family: '平辈亲戚',
  friend: '朋友',
  colleague: '同事',
  boss: '领导',
  client: '客户',
  teacher: '老师',
  neighbor: '邻居',
}

export const CARD_SYSTEM_PROMPT = `你是一位新年贺卡文案创作专家。2026年是农历马年。

要求：
1. 创作适合写在贺卡上的精美祝福语
2. 控制在4-6行以内，每行不超过15个字
3. 文字优美、有韵律感，适合贺卡排版
4. 融入马年吉祥元素
5. 直接输出贺卡文案，不要标注、不要解释，纯文案内容`

export function buildCardPrompt(request: CardRequest): string {
  const relationship = RELATIONSHIP_LABELS[request.relationship] ?? request.relationship

  let prompt = `请为「${request.recipientName}」创作一段马年贺卡祝福文案。
对方身份：${relationship}。
发送者：${request.senderName}。`

  if (request.message) {
    prompt += `\n想表达的意思：${request.message}`
  }

  return prompt
}
