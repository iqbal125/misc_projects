"use client"

import React, {useState} from "react"
import {EmployeeCard} from "./EmployeeCard"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {employeeKnowledgeSearch} from "./server_actions/employeeKnowledgeSearch"
import {Label} from "@/components/ui/label"
import {TypographyH2} from "@/components/ui/typography"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Employee} from "@/lib/types"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(false)
  const [employess, setEmployees] = useState<Array<Employee>>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    try {
      setErrorMessage(null)
      setEmployees([])

      const results = await employeeKnowledgeSearch(searchQuery, userId)

      setEmployees(results)
    } catch (error) {
      setErrorMessage(`Error fetching data: ${error}`)
    }
    setLoading(false)
  }

  return (
    <div className="p-10 flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Athena Prototype </CardTitle>
          <CardDescription>
            Type a term to search for employees with knowledge related to that term (Examples: SAML, CI/CD,
            Infrastructure)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose">
            {errorMessage && <div style={{color: "red"}}>{errorMessage}</div>}
            <p></p>
          </div>
          <div className="mt-4">
            <Label htmlFor="search">Search Term</Label>
            <Input
              name="search"
              className="mr-2.5 w-96 mb-4"
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
            <Label htmlFor="user">User Id</Label>
            <Input
              name="user"
              className="mr-2.5 w-96 mb-4"
              type="text"
              value={userId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
            />
            <Button className="mt-2" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      {loading && <div>Loading...</div>}
      <div className="mt-4">
        {employess.length > 0 && <TypographyH2 text={"Learning Events:"} />}
        {employess.map((employee) => (
          <div key={employee.userId}>
            <EmployeeCard employee={employee}></EmployeeCard>
          </div>
        ))}
      </div>
    </div>
  )
}
