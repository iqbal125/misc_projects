import {describe, it, expect, vi, beforeEach} from "vitest"
import {employeeKnowledgeSearch} from "../app/server_actions/employeeKnowledgeSearch"

import {getEmbedding} from "../app/utils/openaiHelper"
import {pineconeSearch} from "../app/utils/pineconeHelper"
import {getEmployee} from "../lib/api"

vi.stubEnv("OPENAI_API_KEY", "test")

vi.mock("../app/utils/openaiHelper", () => ({
  getEmbedding: vi.fn(),
  openai: {
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  },
}))

vi.mock("../app/utils/pineconeHelper", () => ({
  pineconeSearch: vi.fn(),
}))

vi.mock("../lib/api", () => ({
  getEmployee: vi.fn(),
}))

describe("employeeKnowledgeSearch", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("should fetch and return employee knowledge data", async () => {
    const term = "SAML"
    const userId = "user123"

    vi.mocked(getEmbedding).mockResolvedValue([0.1, 0.2, 0.3])

    vi.mocked(pineconeSearch).mockResolvedValue([
      {
        id: "record1",
        score: 0.6,
        values: [],
        metadata: {
          user_id: "user123",
          date_occurred: "2021-01-01T00:00:00Z",
          score: 0.8,
          description: "Knowledge of SAML implementation.",
          commit_hash: "commit1",
        },
      },
    ])

    vi.mocked(getEmployee).mockResolvedValue({
      userId: "user123",
      knowledgeSummary: "Summary",
      knowledgeEvents: [
        {
          userId: "user123",
          dateOccurred: new Date("2021-01-01T00:00:00Z"),
          score: 0.8,
          description: "Knowledge of SAML implementation.",
          commitHash: "commit1",
        },
      ],
      memory: {
        currentRetention: 0.75,
        reviewInterval: 100000,
        seeNextAt: new Date("2021-06-01T00:00:00Z"),
        lastStudyTime: new Date("2021-05-01T00:00:00Z"),
      },
    })

    const employees = await employeeKnowledgeSearch(term, userId)

    expect(employees).toEqual([
      {
        userId: "user123",
        knowledgeSummary: "Summary",
        knowledgeEvents: [
          {
            userId: "user123",
            dateOccurred: new Date("2021-01-01T00:00:00Z"),
            score: 0.8,
            description: "Knowledge of SAML implementation.",
            commitHash: "commit1",
          },
        ],
        memory: {
          currentRetention: 0.75,
          reviewInterval: 100000,
          seeNextAt: new Date("2021-06-01T00:00:00Z"),
          lastStudyTime: new Date("2021-05-01T00:00:00Z"),
        },
      },
    ])

    expect(getEmbedding).toHaveBeenCalledWith(term)
    expect(pineconeSearch).toHaveBeenCalledWith("memre", [0.1, 0.2, 0.3], 10)
    expect(getEmployee).toHaveBeenCalledWith({
      userId: "user123",
      knowledgeEventsForUser: [
        {
          userId: "user123",
          dateOccurred: new Date("2021-01-01T00:00:00Z"),
          score: 0.8,
          description: "Knowledge of SAML implementation.",
          commitHash: "commit1",
        },
      ],
      term,
    })
  })
})
