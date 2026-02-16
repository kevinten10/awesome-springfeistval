import type { VercelRequest, VercelResponse } from '@vercel/node'

const GLM_API_KEY = process.env.GLM_API_KEY || ''
const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!GLM_API_KEY) {
    return res.status(500).json({ error: '服务端未配置 API Key' })
  }

  try {
    const { messages } = req.body as {
      messages: Array<{ role: string; content: string }>
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: '请求参数错误' })
    }

    const response = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages,
        temperature: 0.9,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({
        error: `GLM API 错误 (${response.status}): ${errorText}`,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (e) {
    const message = e instanceof Error ? e.message : '服务端错误'
    return res.status(500).json({ error: message })
  }
}
