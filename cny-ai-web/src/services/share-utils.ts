import html2canvas from 'html2canvas'

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / WeChat
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}

export async function elementToDataUrl(
  element: HTMLElement,
  scale = 2,
): Promise<string> {
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  })
  return canvas.toDataURL('image/png')
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function saveElementAsImage(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await elementToDataUrl(element)
  downloadDataUrl(dataUrl, filename)
}
