import React, {useState} from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {transformMilliseconds} from "./utils/timeUtils"
import {TypographyH3} from "@/components/ui/typography"
import {Button} from "@/components/ui/button"
import {Employee, KnowledgeEvent} from "@/lib/types"

interface EmployeeCardProps {
  employee: Employee
}

interface KnowledgeEventsPropsI {
  sortedKnowledgeEvents: KnowledgeEvent[]
}

const KnowledgeEvents = ({sortedKnowledgeEvents}: KnowledgeEventsPropsI) => {
  return (
    <div className="mt-4 border-t p-6">
      <TypographyH3 text={"Knowledge Events:"} />
      {sortedKnowledgeEvents.map((event) => (
        <div key={`${event.userId}${event.commitHash}`} className="mb-4">
          <p className="text-gray-800">
            <strong>Date:</strong> {new Date(event.dateOccurred).toLocaleString()}
          </p>
          <p className="text-gray-800">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="text-gray-800">
            <strong>Score:</strong> {event.score}
          </p>
          <p className="text-gray-800">
            <strong>Commit:</strong>{" "}
            <a
              href={`https://github.com/ceregousa/smart_api/commit/${event.commitHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline">
              View Commit
            </a>
          </p>
        </div>
      ))}
    </div>
  )
}

export const EmployeeCard = ({employee}: EmployeeCardProps) => {
  const [showEvents, setShowEvents] = useState(false)

  const toggleEvents = () => {
    setShowEvents(!showEvents)
  }

  const sortedKnowledgeEvents = employee.knowledgeEvents.sort(
    (a, b) => new Date(b.dateOccurred).getTime() - new Date(a.dateOccurred).getTime()
  )

  return (
    <Card className="mb-4">
      <CardHeader>
        <img
          src={employee?.image ?? "/user-image-with-black-background-svgrepo-com.svg"}
          alt={employee?.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <CardTitle>{employee.userId}</CardTitle>
          <CardDescription>Current Retention: {(employee.memory.currentRetention * 100).toFixed(2)}%</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{employee.knowledgeSummary}</p>
        <Button className="mt-4" variant={"secondary"} onClick={toggleEvents}>
          {showEvents ? "Hide Knowledge Events" : "Show Knowledge Events"}
        </Button>
      </CardContent>
      {showEvents && <KnowledgeEvents sortedKnowledgeEvents={sortedKnowledgeEvents} />}
    </Card>
  )
}
