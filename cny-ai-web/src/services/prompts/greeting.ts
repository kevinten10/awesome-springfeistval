import type { GreetingRequest } from '@/types'

const RELATIONSHIP_LABELS: Record<string, string> = {
  elder_family: '长辈（如父母、叔伯、姑姨）',
  peer_family: '平辈亲戚（如兄弟姐妹、表亲）',
  friend: '朋友',
  colleague: '同事',
  boss: '领导/老板',
  client: '客户',
  teacher: '老师/恩师',
  neighbor: '邻居/街坊',
}

const STYLE_LABELS: Record<string, string> = {
  formal: '正式、得体、端庄',
  humorous: '幽默、搞笑、轻松',
  literary: '文艺、诗意、有文采',
  trendy: '网络流行语、潮流、年轻化',
  heartfelt: '真情实感、温暖、走心',
}

export const GREETING_SYSTEM_PROMPT = `你是一位精通中国文化的拜年话术大师。2026年是农历马年（丙午年）。
你的任务是为用户生成个性化的春节拜年祝福语。

要求：
1. 融入马年元素（马到成功、龙马精神、一马当先、万马奔腾、马年大吉等）
2. 根据对方身份和关系调整语气和措辞
3. 生成3个版本：简短版（一句话）、标准版（2-3句）、走心版（一段话）
4. 避免过于俗套的模板化表达，要有新意
5. 每个版本换行分隔，用【简短版】【标准版】【走心版】标注

直接输出祝福语，不要有多余的解释。`

export function buildGreetingPrompt(request: GreetingRequest): string {
  const relationship = RELATIONSHIP_LABELS[request.relationship] ?? request.relationship
  const style = STYLE_LABELS[request.style] ?? request.style

  let prompt = `请为我生成发给「${relationship}」的马年拜年祝福语。
风格要求：${style}。`

  if (request.recipientName) {
    prompt += `\n对方称呼：${request.recipientName}。请在祝福中自然融入对方的称呼。`
  }
  if (request.context) {
    prompt += `\n额外背景：${request.context}。请将这些信息巧妙融入祝福语中。`
  }

  return prompt
}
