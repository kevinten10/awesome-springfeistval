interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

/**
 * Call GLM API.
 * - If apiKey is provided, call ZhiPu directly (user's own key).
 * - If apiKey is empty, call /api/chat proxy (server-side key).
 */
export async function callGLM(
  messages: ChatMessage[],
  apiKey: string,
): Promise<string> {
  const useProxy = !apiKey

  const url = useProxy
    ? '/api/chat'
    : 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (!useProxy) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(
      useProxy
        ? { messages }
        : { model: 'glm-4-flash', messages, temperature: 0.9, max_tokens: 1024 },
    ),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const errorMsg = errorData?.error || `API 请求失败 (${response.status})`
    throw new Error(errorMsg)
  }

  const data: ChatCompletionResponse = await response.json()
  const content = data.choices[0]?.message?.content
  if (!content) {
    throw new Error('API 返回内容为空')
  }
  return content.trim()
}
