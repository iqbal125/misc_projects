"use server"
import {groupBy, sortBy} from "lodash"
import {getEmbedding, openai} from "../utils/openaiHelper"
import {pineconeSearch} from "../utils/pineconeHelper"
import {getEmployee} from "@/lib/api"
import {Employee, KnowledgeEvent} from "@/lib/types"

import {ScoredPineconeRecord, RecordMetadata, RecordMetadataValue} from "@pinecone-database/pinecone"
import {SKIP_OPENAI_FILTERING} from "../constants"

export async function employeeKnowledgeSearch(term: string, userId: string) {
  const embedding = await getEmbedding(term)

  const results = await pineconeSearch("memre", embedding, 10)

  const props = {results, term}
  const filteredResults = await filterPineconeResults(props)

  const knowledgeEvents = filteredResults.map(({metadata}) => {
    const knowledgeEvent = {
      userId: metadata?.user_id,
      dateOccurred: new Date(metadata?.date_occurred as string),
      score: metadata?.score,
      description: metadata?.description,
      commitHash: metadata?.commit_hash,
    } as KnowledgeEvent

    return knowledgeEvent
  })

  const groupedByUser = groupBy(knowledgeEvents, "userId")
  const sortedUsers =
    userId === "" ? sortBy(Object.keys(groupedByUser), (userId) => -groupedByUser[userId].length) : [userId]

  const employeePromises = sortedUsers.map(async (userId) => {
    const knowledgeEventsForUser = groupedByUser[userId]
    const getEmployeeProps = {userId, knowledgeEventsForUser, term}
    return await getEmployee(getEmployeeProps)
  })

  const employees: Employee[] = await Promise.all(employeePromises)
  return employees
}

export async function getRelevanceScore(description: RecordMetadataValue, term: string): Promise<string | null> {
  const prompt = `Evaluate the relevance of the following description to the term "${term}":\n\n${description}\n\nRelevance score (0-1):`

  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [{role: "system", content: prompt}],
    max_tokens: 500,
  })

  const relevanceScore = response.choices[0].message.content
  return relevanceScore
}

interface FilterPropsI {
  results: ScoredPineconeRecord<RecordMetadata>[]
  term: string
}

type withResults = Required<ScoredPineconeRecord<RecordMetadata>>

type withrelevanceResults = Required<ScoredPineconeRecord<RecordMetadata>> & {relevanceScore: string | null}

async function filterPineconeResults({results, term}: FilterPropsI): Promise<ScoredPineconeRecord<RecordMetadata>[]> {
  // TODO: Pinecone search is not perfect and can return results that are not relevant to the term
  // Use ChatGPT to further filter the results to only ones that actually are relevant to the term
  let filteredResults = results.filter((result): result is withResults => !!result.score && result.score > 0.3)

  if (!SKIP_OPENAI_FILTERING) {
    const relevanceChecks = await Promise.all(
      filteredResults.map(async (result) => {
        const relevanceScore = await getRelevanceScore(result.metadata.description, term)
        return {...result, relevanceScore}
      })
    )

    filteredResults = relevanceChecks
      .filter(
        (result): result is withrelevanceResults => !!result.relevanceScore && Number(result.relevanceScore) > 0.5
      )
      .map(({relevanceScore, ...rest}) => rest)
  }

  return filteredResults
}
