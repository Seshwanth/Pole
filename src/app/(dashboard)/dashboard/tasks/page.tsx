'use client'

import { FC, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Button from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { Upload, FileText, User } from 'lucide-react'


const TaskReportPage: FC = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    toast.success("Your task report has been successfully submitted.")
  }

  // Dummy data for task supervisors
  const supervisors = [
    { id: 1, name: "John Doe", role: "Club President" },
    { id: 2, name: "Jane Smith", role: "Event Coordinator" },
    { id: 3, name: "Mike Johnson", role: "Faculty Advisor" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Report Submission</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Task Report</CardTitle>
          <CardDescription>Please fill in the details and upload your report file.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="taskName">Task Name</Label>
                <Input id="taskName" placeholder="Enter the name of your task" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Task Description</Label>
                <Textarea id="description" placeholder="Briefly describe your task and its objectives" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="supervisor">Submit to</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisors.map((supervisor) => (
                      <SelectItem key={supervisor.id} value={supervisor.id.toString()}>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>{supervisor.name} - {supervisor.role}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Upload Report File</Label>
                <div className="flex items-center space-x-2">
                  <Input id="file" type="file" onChange={handleFileChange} required />
                  {file && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      {file.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button type="submit" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Submit Report
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskReportPage