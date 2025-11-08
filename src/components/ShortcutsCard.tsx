import {
  Home,
  Users,
  Briefcase,
  Shield,
  FileSpreadsheet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShortcutItem {
  title: string
  path: string
  icon: LucideIcon
  roles: string[]
  description: string
}

interface ShortcutsCardProps {
  activePage: string
  setActivePage: (page: string) => void
  userRoles: string[]
}

const shortcutItems: ShortcutItem[] = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: Home,
    roles: ['Admin', 'Partner Manager', 'Customer Support'],
    description: 'View dashboard',
  },
  {
    title: 'Roles',
    path: 'roles',
    icon: Shield,
    roles: ['Admin'],
    description: 'Manage system roles',
  },
  {
    title: 'System Users',
    path: 'users/system-users',
    icon: Users,
    roles: ['Admin'],
    description: 'Manage system users',
  },
  {
    title: 'Partner Requests',
    path: 'requests',
    icon: FileSpreadsheet,
    roles: ['Admin', 'Partner Manager'],
    description: 'View partner requests',
  },
  {
    title: 'Partner Customers',
    path: 'users/partner-customers',
    icon: Briefcase,
    roles: ['Admin', 'Partner Manager'],
    description: 'View partner customers',
  },
 
]

export default function ShortcutsCard({ activePage, setActivePage, userRoles }: ShortcutsCardProps) {
 
  const filteredShortcuts = shortcutItems.filter((item) =>
    item.roles.some((role) => userRoles.includes(role))
  )

  
  if (filteredShortcuts.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Home className="h-5 w-5" />
          Quick Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredShortcuts.map((shortcut) => (
            <Button
              key={shortcut.path}
              variant="outline"
              className={cn(
                'h-auto p-3 flex flex-col items-center gap-2 w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer transition-colors',
                activePage === shortcut.path &&
                  'bg-accent text-accent-foreground border-primary'
              )}
              onClick={() => setActivePage(shortcut.path)}
            >
              <shortcut.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="text-sm font-medium">{shortcut.title}</div>
                <div className="text-xs text-muted-foreground">
                  {shortcut.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}