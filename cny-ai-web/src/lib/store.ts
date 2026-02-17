import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GreetingRequest, DefenseRequest, CardRequest, HistoryItem } from '@/types'

interface AppState {
  greetingHistory: HistoryItem<GreetingRequest>[]
  defenseHistory: HistoryItem<DefenseRequest>[]
  cardHistory: HistoryItem<CardRequest>[]

  addGreetingHistory: (item: HistoryItem<GreetingRequest>) => void
  addDefenseHistory: (item: HistoryItem<DefenseRequest>) => void
  addCardHistory: (item: HistoryItem<CardRequest>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      greetingHistory: [],
      defenseHistory: [],
      cardHistory: [],

      addGreetingHistory: (item) =>
        set((state) => ({
          greetingHistory: [item, ...state.greetingHistory].slice(0, 20),
        })),
      addDefenseHistory: (item) =>
        set((state) => ({
          defenseHistory: [item, ...state.defenseHistory].slice(0, 20),
        })),
      addCardHistory: (item) =>
        set((state) => ({
          cardHistory: [item, ...state.cardHistory].slice(0, 20),
        })),
    }),
    {
      name: 'cny-ai-store',
      partialize: (state) => ({
        greetingHistory: state.greetingHistory,
        defenseHistory: state.defenseHistory,
        cardHistory: state.cardHistory,
      }),
    },
  ),
)
