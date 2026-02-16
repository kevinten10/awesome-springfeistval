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

export async function callGLM(
  messages: ChatMessage[],
  apiKey: string,
): Promise<string> {
  const response = await fetch(
    'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages,
        temperature: 0.9,
        max_tokens: 1024,
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API 请求失败 (${response.status}): ${errorText}`)
  }

  const data: ChatCompletionResponse = await response.json()
  const content = data.choices[0]?.message?.content
  if (!content) {
    throw new Error('API 返回内容为空')
  }
  return content.trim()
}
