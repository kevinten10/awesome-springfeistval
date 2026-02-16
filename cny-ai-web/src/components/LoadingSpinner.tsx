interface Props {
  message?: string
}

export function LoadingSpinner({ message = 'AI 正在创作中...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3 animate-fade-in">
      <div className="text-4xl animate-bounce">🐴</div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}
