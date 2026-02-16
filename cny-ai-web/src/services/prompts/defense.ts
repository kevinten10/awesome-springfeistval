import type { DefenseRequest } from '@/types'

const QUESTION_LABELS: Record<string, string> = {
  relationship: '有对象了吗？',
  marriage: '什么时候结婚？',
  salary: '一个月挣多少钱？',
  children: '什么时候要孩子？',
  job: '工作怎么样啊？',
  house: '买房了吗？',
  weight: '怎么胖了/瘦了？',
  education: '考研/考公了吗？',
}

const STRATEGY_LABELS: Record<string, string> = {
  humor: '用幽默搞笑的方式化解，让对方也笑起来',
  redirect: '巧妙转移话题到对方身上或其他有趣的事情',
  counter: '用高情商的反问让对方自己也不好意思继续追问',
  philosophical: '用看似深刻的哲学道理来升华话题，让对方无从反驳',
  flattery: '用彩虹屁夸对方，让对方高兴得忘了原来的问题',
}

export const DEFENSE_SYSTEM_PROMPT = `你是一位春节社交防御专家，擅长应对亲戚的各种尴尬问题。2026年是马年。

要求：
1. 生成3个不同的回复方案，每个都要实用、得体、不伤感情
2. 回复要自然口语化，像真人说话
3. 适当融入马年元素增加趣味性
4. 每个回复用【回复1】【回复2】【回复3】标注
5. 每个回复后附一句简短的(策略说明)，用括号包裹

直接输出回复，不要有多余的解释。`

export function buildDefensePrompt(request: DefenseRequest): string {
  const question = QUESTION_LABELS[request.question] ?? request.question
  const strategy = STRATEGY_LABELS[request.strategy] ?? request.strategy

  let prompt = `亲戚问我：「${question}」
请用以下策略生成回复：${strategy}。`

  if (request.context) {
    prompt += `\n我的实际情况：${request.context}。请根据我的情况定制回复。`
  }

  return prompt
}
