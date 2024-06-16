import {SKIP_OPENAI_SUMMARY, SMART_API_HOST, KNOWLEDGE_SUMMARY_SYSTEM_PROMPT} from "@/app/constants"
import {KnowledgeEvent, MemoryInfo} from "./types"
import {openai} from "@/app/utils/openaiHelper"
import {formatDistance, formatDistanceToNow} from "date-fns"
import axios from "axios"
import rateLimit from "axios-rate-limit"

const http = rateLimit(axios.create(), {maxRequests: 1, perMilliseconds: 1000})

interface getEmployeePropsI {
  userId: string
  knowledgeEventsForUser: KnowledgeEvent[]
  term: string
}

export const getEmployee = async ({userId, knowledgeEventsForUser, term}: getEmployeePropsI) => {
  let userMemory

  //await PostData(knowledgeEventsForUser, userId, term)

  try {
    const response = await fetch(
      `https://testing.cerego.com/api/athena_api/learning_events?user_id=${userId}&event_name=${term}`
    )

    //fix api to return 404 if results not found.
    if (!response?.ok) {
      throw Error("Knowledge Events not found")
    }

    const data = await response.json()
    userMemory = data.memory
  } catch (e) {
    console.log(e)
    throw new Error("Request Failed")
  }

  const memory = {
    currentRetention: userMemory?.current_retention,
    reviewInterval: userMemory?.review_interval,
    seeNextAt: new Date(userMemory?.see_next_at),
    lastStudyTime: new Date(userMemory?.last_study_time),
  }

  const summary = SKIP_OPENAI_SUMMARY
    ? "Skipped Summary"
    : await getKnowledgeSummary(knowledgeEventsForUser, term, memory)

  return {
    userId,
    knowledgeSummary: summary,
    knowledgeEvents: knowledgeEventsForUser,
    memory,
  }
}

async function getKnowledgeSummary(userResults: KnowledgeEvent[], term: string, memory: MemoryInfo): Promise<string> {
  const simplifiedKnowledgeEvents = userResults.map((event) => ({
    description: event.description,
    dateOccurred: event.dateOccurred,
    score: event.score,
  }))

  const userPrompt = `
    Knowledge/Skill Topic: ${term}
    Learning Engine Memory Info:
      - The user's current retention is ${Math.round(memory.currentRetention * 100)}%.
      - The user's memory is strong enough to last ${formatDistance(memory.reviewInterval, 0)}.
      - The user last refreshed their memory ${formatDistanceToNow(memory.lastStudyTime)} ago.

    Knowledge Demonstration Events:
    ${JSON.stringify(simplifiedKnowledgeEvents, null, 2)}
  `

  const summaryResponse = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      {role: "system", content: KNOWLEDGE_SUMMARY_SYSTEM_PROMPT},
      {role: "user", content: userPrompt},
    ],
    max_tokens: 500,
  })

  return summaryResponse.choices[0].message.content ?? "No summary available"
}

const PostData = async (knowledgeEventsForUser: KnowledgeEvent[], userId: string, term: string) => {
  const sortedEvents = knowledgeEventsForUser.sort((a, b) => a.dateOccurred.getTime() - b.dateOccurred.getTime())

  const postData = sortedEvents.map((event) => ({
    user_id: userId,
    occurred_at: new Date(event.dateOccurred).toISOString(),
    event_name: term,
  }))

  postData.map(async (item) => {
    try {
      await http.post(`${SMART_API_HOST}/api/athena_api/learning_events`, {
        user_id: item.user_id,
        occured_at: item.occurred_at,
        event_name: item.event_name,
      })
    } catch (e) {
      console.log(e)
    }
  })
}
