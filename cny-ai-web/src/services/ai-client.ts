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
 * Call GLM API via server-side proxy (/api/chat).
 * The API key is stored securely in Vercel environment variables.
 */
export async function callGLM(messages: ChatMessage[]): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
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
