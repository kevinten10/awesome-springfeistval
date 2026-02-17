import { callGLM } from './ai-client'
import { GREETING_SYSTEM_PROMPT, buildGreetingPrompt } from './prompts/greeting'
import { DEFENSE_SYSTEM_PROMPT, buildDefensePrompt } from './prompts/defense'
import { CARD_SYSTEM_PROMPT, buildCardPrompt } from './prompts/card'
import type { GreetingRequest, DefenseRequest, CardRequest } from '@/types'

export async function generateGreeting(request: GreetingRequest): Promise<string> {
  return callGLM([
    { role: 'system', content: GREETING_SYSTEM_PROMPT },
    { role: 'user', content: buildGreetingPrompt(request) },
  ])
}

export async function generateDefense(request: DefenseRequest): Promise<string> {
  return callGLM([
    { role: 'system', content: DEFENSE_SYSTEM_PROMPT },
    { role: 'user', content: buildDefensePrompt(request) },
  ])
}

export async function generateCardText(request: CardRequest): Promise<string> {
  return callGLM([
    { role: 'system', content: CARD_SYSTEM_PROMPT },
    { role: 'user', content: buildCardPrompt(request) },
  ])
}
