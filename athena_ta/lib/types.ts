export type KnowledgeEvent = {
  userId: string
  dateOccurred: Date
  score: number
  description: string
  commitHash: string
}

export type MemoryInfo = {
  currentRetention: number
  reviewInterval: number
  seeNextAt: Date
  lastStudyTime: Date
}

export type Employee = {
  userId: string
  knowledgeSummary: string
  knowledgeEvents: KnowledgeEvent[]
  memory: MemoryInfo
  name?: string
  image?: string
}
