import type { VercelRequest, VercelResponse } from '@vercel/node'

const DEFAULT_ARK_BASE_URL = 'https://ark.cn-beijing.volces.com/api/plan/v3'
const DEFAULT_ARK_MODEL = 'doubao-seed-2-0-code-preview-260215'

function chatCompletionsUrl() {
  const baseUrl = process.env.ARK_BASE_URL || DEFAULT_ARK_BASE_URL
  return `${baseUrl.replace(/\/$/, '')}/chat/completions`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ARK_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: '服务端未配置 API Key' })
  }

  try {
    const { messages } = req.body as {
      messages: Array<{ role: string; content: string }>
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: '请求参数错误' })
    }

    const response = await fetch(chatCompletionsUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.ARK_CHAT_MODEL || DEFAULT_ARK_MODEL,
        messages,
        temperature: 0.9,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({
        error: `Ark API 错误 (${response.status}): ${errorText}`,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (e) {
    const message = e instanceof Error ? e.message : '服务端错误'
    return res.status(500).json({ error: message })
  }
}
