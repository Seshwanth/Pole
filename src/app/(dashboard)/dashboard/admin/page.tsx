/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Plus} from 'lucide-react'


const AdminPage: FC = () => {
  // Dummy data for completed tasks
  const [completedTasks, setCompletedTasks] = useState([
    { id: 1, title: "Design club logo", user: "John Doe", date: "2023-06-10", fileUrl: "#" },
    { id: 2, title: "Organize welcome party", user: "Jane Smith", date: "2023-06-12", fileUrl: "#" },
    { id: 3, title: "Create social media content", user: "Mike Johnson", date: "2023-06-15", fileUrl: "#" },
  ])
  // setCompletedTasks([...completedTasks]) // Removed to prevent infinite re-renders
  // Dummy data for newsletter events
  const [events, setEvents] = useState([
    { id: 1, title: "Annual Tech Fest", date: "2023-07-15" },
    { id: 2, title: "Cultural Night", date: "2023-06-30" },
  ])

  // Dummy data for dashboard tasks
  const [dashboardTasks, setDashboardTasks] = useState([
    { id: 1, title: "Prepare monthly report", dueDate: "2023-07-05", status: "In Progress" },
    { id: 2, title: "Update club website", dueDate: "2023-07-10", status: "Pending" },
  ])

  const handleDownload = (fileUrl: string) => {
    // In a real application, this would trigger the file download
    console.log(`Downloading file from ${fileUrl}`)
  }

  const handleAddEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const title = (form.elements.namedItem('eventTitle') as HTMLInputElement).value
    const date = (form.elements.namedItem('eventDate') as HTMLInputElement).value
    setEvents([...events, { id: events.length + 1, title, date }])
    form.reset()
  }

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const title = (form.elements.namedItem('taskTitle') as HTMLInputElement).value
    const dueDate = (form.elements.namedItem('taskDueDate') as HTMLInputElement).value
    const status = (form.elements.namedItem('taskStatus') as HTMLSelectElement).value
    setDashboardTasks([...dashboardTasks, { id: dashboardTasks.length + 1, title, dueDate, status }])
    form.reset()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="completed-tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="completed-tasks">Completed Tasks</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="dashboard-tasks">Dashboard Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="completed-tasks">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>View and download files from completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.user}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>
                        <Button variant="default" size="sm" onClick={() => handleDownload(task.fileUrl)}>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="newsletter">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Events</CardTitle>
              <CardDescription>Manage events for the newsletter</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventTitle">Event Title</Label>
                    <Input id="eventTitle" name="eventTitle" placeholder="Enter event title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input id="eventDate" name="eventDate" type="date" required />
                  </div>
                </div>
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </form>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard-tasks">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Tasks</CardTitle>
              <CardDescription>Manage tasks displayed on the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskTitle">Task Title</Label>
                    <Input id="taskTitle" name="taskTitle" placeholder="Enter task title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskDueDate">Due Date</Label>
                    <Input id="taskDueDate" name="taskDueDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskStatus">Status</Label>
                    <Select name="taskStatus" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </form>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage