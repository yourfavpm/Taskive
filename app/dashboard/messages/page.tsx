import { MessageSquare, Search, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const conversations = [
  {
    id: 1,
    talent: "Sarah Chen",
    role: "Operations Manager",
    lastMessage: "Thank you for the offer! I've reviewed the terms and I'm happy to accept.",
    time: "2 hours ago",
    unread: 2,
    avatar: "/placeholder.svg?key=xr0y6",
  },
  {
    id: 2,
    talent: "Michael Park",
    role: "Project Coordinator",
    lastMessage: "I have a question about the scope of work for the project.",
    time: "1 day ago",
    unread: 0,
    avatar: "/placeholder.svg?key=9lq6z",
  },
  {
    id: 3,
    talent: "Emily Watson",
    role: "Executive Assistant",
    lastMessage: "The contract has been signed. Looking forward to starting!",
    time: "2 days ago",
    unread: 0,
    avatar: "/placeholder.svg?key=s34rn",
  },
]

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          Messages
        </h1>
        <p className="text-muted-foreground mt-1">Communicate with your talents</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>

            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {conv.talent
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate">{conv.talent}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs shrink-0">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 flex flex-col min-h-[600px]">
          <div className="p-4 border-b flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?key=pdfjv" />
              <AvatarFallback className="bg-primary text-primary-foreground">SC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">Operations Manager</p>
            </div>
          </div>

          <CardContent className="flex-1 p-4 space-y-4 overflow-auto">
            {/* Messages */}
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-lg bg-muted p-3">
                <p className="text-sm">
                  Hi! I received the offer for the Operations Manager position. Could you clarify the expected hours per
                  week?
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">Yesterday, 2:30 PM</span>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-lg bg-primary text-primary-foreground p-3">
                <p className="text-sm">
                  Hi Sarah! The position is for 40 hours per week, with flexible scheduling. Let me know if you have any
                  other questions!
                </p>
                <span className="text-xs text-primary-foreground/70 mt-1 block">Yesterday, 3:15 PM</span>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-lg bg-muted p-3">
                <p className="text-sm">Thank you for the offer! I've reviewed the terms and I'm happy to accept.</p>
                <span className="text-xs text-muted-foreground mt-1 block">2 hours ago</span>
              </div>
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
