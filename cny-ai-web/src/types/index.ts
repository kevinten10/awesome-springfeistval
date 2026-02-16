export type RelationshipType =
  | 'elder_family'
  | 'peer_family'
  | 'friend'
  | 'colleague'
  | 'boss'
  | 'client'
  | 'teacher'
  | 'neighbor'

export type GreetingStyle =
  | 'formal'
  | 'humorous'
  | 'literary'
  | 'trendy'
  | 'heartfelt'

export type DefenseCategory =
  | 'marriage'
  | 'salary'
  | 'children'
  | 'job'
  | 'house'
  | 'weight'
  | 'education'
  | 'relationship'

export type DefenseStrategy =
  | 'humor'
  | 'redirect'
  | 'counter'
  | 'philosophical'
  | 'flattery'

export type CardTemplate = 'classic' | 'modern' | 'cute' | 'calligraphy'

export interface GreetingRequest {
  relationship: RelationshipType
  style: GreetingStyle
  context?: string
  recipientName?: string
}

export interface DefenseRequest {
  question: DefenseCategory
  strategy: DefenseStrategy
  context?: string
}

export interface CardRequest {
  recipientName: string
  senderName: string
  relationship: RelationshipType
  message?: string
  template: CardTemplate
}

export interface AIGenerationResult {
  content: string
  loading: boolean
  error: string | null
}

export interface HistoryItem<T> {
  request: T
  result: string
  timestamp: number
}
