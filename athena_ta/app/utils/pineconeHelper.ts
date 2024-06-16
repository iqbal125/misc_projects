import {Pinecone} from "@pinecone-database/pinecone"
import {ScoredPineconeRecord, RecordMetadata} from "@pinecone-database/pinecone"

const pinecone = new Pinecone()

export async function pineconeSearch(
  namespace: string,
  embedding: number[],
  limit: number = 10,
  indexName: string = "athena"
): Promise<ScoredPineconeRecord<RecordMetadata>[]> {
  const index = pinecone.index(indexName).namespace(namespace)
  const results = await index.query({
    vector: embedding,
    topK: limit,
    includeMetadata: true,
    includeValues: false,
  })

  return results.matches
}
