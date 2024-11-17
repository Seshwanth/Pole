'use client'

import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Button from "@/components/ui/Button"
import { CalendarDays, CheckCircle} from 'lucide-react'

const DashboardPage: FC = () => {
  // Dummy data for tasks
  const currentTasks = [
    { id: 1, title: "Design club logo", dueDate: "2023-06-15", status: "In Progress" },
    { id: 2, title: "Organize welcome party", dueDate: "2023-06-20", status: "In Progress" },
    { id: 3, title: "Create social media content", dueDate: "2023-06-18", status: "In Progress" },
  ]

  const tasksToSubmit = [
    { id: 4, title: "Monthly report", dueDate: "2023-06-10", status: "Pending" },
    { id: 5, title: "Event proposal", dueDate: "2023-06-12", status: "Pending" },
  ]

  // Dummy data for newsletter events
  const events = [
    { id: 1, title: "Annual Tech Fest", date: "2023-07-15" },
    { id: 2, title: "Cultural Night", date: "2023-06-30" },
    { id: 3, title: "Career Fair", date: "2023-08-05" },
    { id: 4, title: "Sports Day", date: "2023-07-22" },
    { id: 5, title: "Alumni Meet", date: "2023-09-10" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Current Tasks</CardTitle>
            <CardDescription>Tasks currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            {currentTasks.map(task => (
              <div key={task.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{task.title}</h3>
                  <Badge variant="secondary">{task.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks to Submit */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks to Submit</CardTitle>
            <CardDescription>Pending tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            {tasksToSubmit.map(task => (
              <div key={task.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{task.title}</h3>
                  <Badge variant="destructive">{task.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                <Button  className="mt-2">
                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Newsletter Scroller */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>College Events</CardTitle>
          <CardDescription>Stay updated with the latest events</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {events.map((event, index) => (
              <div key={event.id}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                </div>
                {index < events.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage