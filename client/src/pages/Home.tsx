import { useQuery } from "@tanstack/react-query";
import { Home as HomeIcon, FileText, Bus, CreditCard, MessageSquare, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";
  
  const { data: applications = [] } = useQuery({
    queryKey: ["/api/applications", userId],
    enabled: !!userId,
  });

  const { data: homework = [] } = useQuery({
    queryKey: ["/api/homework", userId],
    enabled: !!userId,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["/api/payments", userId],
    enabled: !!userId,
  });

  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar data-testid="avatar-user">
                <AvatarFallback className="bg-blue-600 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900" data-testid="text-username">
                  {userName}
                </h2>
                <p className="text-sm text-gray-500">Student</p>
              </div>
              <Select defaultValue="student1">
                <SelectTrigger className="w-8 h-8 border-0 p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">{userName}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-settings">
                <Settings className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">
          Home
        </h1>

        {Array.isArray(applications) && applications.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Pending Applications
            </h2>
            {(applications as any[]).map((app: any, index: number) => (
              <Card key={app.id} className="p-4 flex items-center gap-3" data-testid={`card-application-${index}`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Starfield Academy</h3>
                  <p className="text-sm text-gray-600">🇫🇷 Francophone • 📚 Secondary</p>
                  <p className="text-sm text-yellow-600 font-medium">⏱️ Pending</p>
                </div>
              </Card>
            ))}
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Homework for tomorrow
          </h2>
          <div className="space-y-2">
            {!Array.isArray(homework) || homework.length === 0 ? (
              <>
                <div className="flex items-center gap-3 py-2" data-testid="homework-item-0">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="flex-1">
                    <p className="text-gray-700">Exercise 1 – Textbook, page 60</p>
                    <p className="text-sm text-gray-500">Due Date: Tomorrow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2" data-testid="homework-item-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="flex-1">
                    <p className="text-gray-700">Exercise 1 – Textbook, page 80</p>
                    <p className="text-sm text-gray-500">Due Date: Tomorrow</p>
                  </div>
                </div>
              </>
            ) : (
              (homework as any[]).map((hw: any, index: number) => (
                <div key={hw.id} className="flex items-center gap-3 py-2" data-testid={`homework-item-${index}`}>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="flex-1">
                    <p className="text-gray-700">{hw.title}</p>
                    <p className="text-sm text-gray-500">Due Date: {hw.dueDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Pending Payments
          </h2>
          <Card className="p-4" data-testid="card-payment">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Transport</h3>
                <p className="text-sm text-gray-600">Amara Fobi</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">50 XAF</p>
                <p className="text-sm text-gray-500">Oct, 2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                data-testid="button-pay-now"
              >
                Pay Now
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                data-testid="button-set-reminder"
              >
                Set Reminder
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center gap-1 text-blue-600" data-testid="nav-home">
              <HomeIcon className="w-5 h-5" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500" data-testid="nav-results">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Results</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500" data-testid="nav-transport">
              <Bus className="w-5 h-5" />
              <span className="text-xs">Transport</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500" data-testid="nav-cards">
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Cards</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500" data-testid="nav-chats">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Chats</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
