import OpenAI from "openai"

export const openai = new OpenAI() // OPENAI_API_KEY environment variable must be set

export async function getEmbedding(input: string, model: string = "text-embedding-3-large"): Promise<number[]> {
  const response = await openai.embeddings.create({
    model,
    input,
  })

  return response.data[0].embedding
}
