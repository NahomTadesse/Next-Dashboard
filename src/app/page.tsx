 "use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Briefcase,
  User,
  Menu,
  ChevronDown,
  ChevronRight,
  Home,
  Shield,
} from 'lucide-react'

import ShortcutsCard from '@/components/ShortcutsCard'

import LoginPage from './login/page'


export default function MainPage(){

  return(
<>
<LoginPage/>
</>
  )
}

// export default function AmharaTourismDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [openMenus, setOpenMenus] = useState({
//     systemUsers: false,
//     partners: false,
//     customers: false,
//   })
//   const [activePage, setActivePage] = useState('dashboard')

//   const toggleMenu = (menu: keyof typeof openMenus) => {
//     setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }))
//   }

//   const user = mockUser

//   return (
//     <div className="flex min-h-screen bg-gray-100">
   
//       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="text-xl font-bold">Amhara Tourism</h2>
//           <Button variant="ghost" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
//             <Menu className="h-6 w-6" />
//           </Button>
//         </div>
//         <nav className="p-4 space-y-2">
//           <button
//             className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
//             onClick={() => setActivePage('dashboard')}
//           >
//             <Home className="h-5 w-5 mr-2" />
//             Dashboard
//           </button>
//           <div>
//             <button
//               className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
//               onClick={() => toggleMenu('systemUsers')}
//             >
//               <Users className="h-5 w-5 mr-2" />
//               System Users
//               {openMenus.systemUsers ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronRight className="h-4 w-4 ml-auto" />}
//             </button>
//             {openMenus.systemUsers && (
//               <div className="pl-8 space-y-1">
//                 <button
//                   className="block p-2 hover:bg-gray-100 rounded w-full text-left"
//                   onClick={() => setActivePage('roles')}
//                 >
//                   Roles
//                 </button>
//                 <button
//                   className="block p-2 hover:bg-gray-100 rounded w-full text-left"
//                   onClick={() => setActivePage('users/system-users')}
//                 >
//                   Users
//                 </button>
//               </div>
//             )}
//           </div>
//           <div>
//             <button
//               className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
//               onClick={() => toggleMenu('partners')}
//             >
//               <Briefcase className="h-5 w-5 mr-2" />
//               Partners
//               {openMenus.partners ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronRight className="h-4 w-4 ml-auto" />}
//             </button>
//             {openMenus.partners && (
//               <div className="pl-8 space-y-1">
//                 <button
//                   className="block p-2 hover:bg-gray-100 rounded w-full text-left"
//                   onClick={() => setActivePage('requests')}
//                 >
//                   Requests
//                 </button>
//                 <button
//                   className="block p-2 hover:bg-gray-100 rounded w-full text-left"
//                   onClick={() => setActivePage('users/partner-customers')}
//                 >
//                   Customers
//                 </button>
//                 <button
//                   className="block p-2 hover:bg-gray-100 rounded w-full text-left"
//                   onClick={() => setActivePage('users/partner-users')}
//                 >
//                   System Users
//                 </button>
//               </div>
//             )}
//           </div>
//           <div>
//             <button
//               className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
//               onClick={() => toggleMenu('customers')}
//             >
//               <User className="h-5 w-5 mr-2" />
//               Customers
//               {openMenus.customers ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronRight className="h-4 w-4 ml-auto" />}
//             </button>
//             {openMenus.customers && (
//               <div className="pl-8 space-y-1">
//                 <button
//                   className="block p-2 hover:bg-gray-100 rounded w-full text-left"
//                   onClick={() => setActivePage('users/customer-users')}
//                 >
//                   Users
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </aside>

     
//       <main className="flex-1 md:ml-64 p-6">
//         <Button variant="ghost" className="md:hidden mb-4" onClick={() => setIsSidebarOpen(true)}>
//           <Menu className="h-6 w-6" />
//         </Button>
//         <div className="container mx-auto py-6 space-y-8">
//           <ShortcutsCard activePage={activePage} setActivePage={setActivePage} userRoles={user.roles} />
//           {activePage === 'dashboard' && <Dashboard />}
//           {activePage === 'roles' && <RolesPage />}
//           {activePage === 'requests' && <RequestsPage />}
//           {activePage.startsWith('users/') && <UsersPage id={activePage.split('/')[1]} />}
//         </div>
//       </main>
//     </div>
//   )
// }