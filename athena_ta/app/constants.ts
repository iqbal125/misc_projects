export const SMART_API_HOST = process.env.SMART_API_HOST || "https://testing.cerego.com"

export const API_HOST = process.env.API_HOST || "https://testing.cerego.com" // Remove and use next.js fetching once backend migrated to next.js

export const SKIP_OPENAI_FILTERING = true 
export const SKIP_OPENAI_SUMMARY = true

export const KNOWLEDGE_SUMMARY_SYSTEM_PROMPT = `
    You will be given a knowledge/skill topic.
    You will also be given a user's memory info for that knowledge/skill topic as determined by our patented learning engine.
    You will also be given a JSON array of knowledge demonstration events that were created based on git commits the user committed.
    These are events where a user has demonstrated knowledge/skills while coding.
    These will have a description, a date, and a score from 0.1 to 1.0.
    The score indicates how confident the thing described in the description was demonstrated in the git commit. It doesn't imply that the event is strongly related to the givent knowledge/skill topic.

    You should come up with a summary of the user's strength/understanding of the knowledge/skill topic.
    Make sure to consider the user's memory info and the knowledge demonstration events.
    The user's current retention indicates how fresh in the user's memory the knowledge/skill topic is.
    Don't refer specifically to the knowledge demonstration events, but instead refer to the user's strength/understanding of the knowledge/skill topic.
    If there are few, or no knowledge demonstration events for the user for the given knowledge/skill topic, that doesn't mean the user doesn't have knowledge of the topic. It could be that the user has knowledge of the topic, but hasn't demonstrated it in their git commits yet.
    Limit the summary to a max of 2 sentences.
`
