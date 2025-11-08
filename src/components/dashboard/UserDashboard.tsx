import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import {
  BarChart,
  Layers,
  FileSpreadsheet,
  Settings2,
  Table,
  ArrowRight,
} from 'lucide-react'
import { authService } from '@/services/authService'
import { listApi, caseCamundaApi } from '@/services/api'

interface ActiveTaskResponse {
  id: string
  name: string
  status: string | null
  owner: string | null
  candidateGroup: string | null
  candidateUser: string | null
  taskId: string | null
  description: string | null
  assignee: string
  created: string
  due: string | null
  processInstanceId: string
  taskDefinitionKey: string
  variables: {
    caseNumber: string
  }
  formKey: string | null
}

export function UserDashboard() {
  const user = authService.getCurrentUser()

  // Fetch basic stats for dashboard overview
  const { data: activeTasks = [], isLoading: isLoadingActiveTasks } = useQuery<
    ActiveTaskResponse[]
  >({
    queryKey: ['activeTasks'],
    queryFn: async () => {
      try {
        const userRole = user?.roles?.[0]?.toLowerCase()
        const response = await caseCamundaApi.get(
          `/tasks/active?assignee=${userRole}`,
        )
        return response.data || []
      } catch (error) {
        console.error('Error fetching active tasks:', error)
        return []
      }
    },
    refetchInterval: 30000,
  })

  const { data: casesCount = 0, isLoading: isLoadingCases } = useQuery<number>({
    queryKey: ['casesCount'],
    queryFn: async () => {
      try {
        const response = await listApi.get('/cases')
        return response.data?.length || 0
      } catch (error) {
        console.error('Error fetching cases count:', error)
        return 0
      }
    },
    refetchInterval: 30000,
  })

  // Dashboard cards data
  const dashboardCards = [
    {
      title: 'Active Cases',
      value: isLoadingCases ? '...' : casesCount.toString(),
      description: 'Total active cases',
      icon: Layers,
      link: '/active-cases',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Case Templates',
      value: '5',
      description: 'Available templates',
      icon: FileSpreadsheet,
      link: '/case-templates',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Tasks',
      value: isLoadingActiveTasks ? '...' : activeTasks.length.toString(),
      description: 'Tasks assigned to you',
      icon: Settings2,
      link: '/active-tasks',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Task History',
      value: '12',
      description: 'Completed tasks',
      icon: Table,
      link: '/task-history',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.given_name || user?.family_name}. Here's an
            overview of your case management system.
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {user?.roles[0]}
        </Badge>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Link key={card.title} to={card.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {card.description}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and actions you can perform
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Link to="/case-templates">
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Start New Case
              </Button>
            </Link>
            <Link to="/active-tasks">
              <Button variant="outline" className="w-full justify-start">
                <Settings2 className="h-4 w-4 mr-2" />
                View My Tasks
              </Button>
            </Link>
            <Link to="/active-cases">
              <Button variant="outline" className="w-full justify-start">
                <Layers className="h-4 w-4 mr-2" />
                Browse Cases
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your recent activity in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Task completed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New case assigned</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Case updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
