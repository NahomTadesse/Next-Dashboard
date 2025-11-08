

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Home, Store, ClipboardList, Sidebar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const toggleMobile = () => setMobileOpened(!mobileOpened);
  const toggleDesktop = () => setDesktopCollapsed(!desktopCollapsed);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar */}
      <Sheet open={mobileOpened} onOpenChange={setMobileOpened}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
            onClick={toggleMobile}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <NavItem
              href="/dashboard"
              label="Home"
              icon={<Home className="h-4 w-4" />}
              onClick={toggleMobile}
            />

                <NavItem
              href="/dashboard/about"
              label="About"
              icon={<ClipboardList className="h-4 w-4" />}
              onClick={toggleMobile}
            />

                <NavItem
              href="/dashboard/servicePage"
              label="Service"
              icon={<ClipboardList className="h-4 w-4" />}
              onClick={toggleMobile}
            />

                <NavItem
              href="/dashboard/product"
              label="Product"
              icon={<ClipboardList className="h-4 w-4" />}
              onClick={toggleMobile}
            />

            <NavItem
              href="/dashboard/insightPage"
              label="InsightPage"
              icon={<Store className="h-4 w-4" />}
              onClick={toggleMobile}
            />
            <NavItem
              href="/dashboard/contact"
              label="Contact"
              icon={<ClipboardList className="h-4 w-4" />}
              onClick={toggleMobile}
            />

                 <NavItem
              href="/dashboard/cards"
              label="Cards"
              icon={<ClipboardList className="h-4 w-4" />}
              onClick={toggleMobile}
            />

          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block border-r transition-all duration-300',
          desktopCollapsed ? 'w-16' : 'w-50',
          'p-4'
        )}
      >
        <div className="flex flex-col space-y-2">
          <h2
            className={cn(
              'text-xl font-bold mb-4',
              desktopCollapsed && 'hidden'
            )}
          >
            Dashboard
          </h2>
          <NavItem
            href="/dashboard"
            label="Home"
            icon={<Home className="h-4 w-4" />}
            collapsed={desktopCollapsed}
          />
              <NavItem
                href="/dashboard/about"
              label="About"
              icon={<ClipboardList className="h-4 w-4" />}
               collapsed={desktopCollapsed}
            />

                <NavItem
                href="/dashboard/servicePage"
              label="Service"
              icon={<ClipboardList className="h-4 w-4" />}
              collapsed={desktopCollapsed}
            />

            
                <NavItem
              href="/dashboard/product"
              label="Product"
              icon={<ClipboardList className="h-4 w-4" />}
              collapsed={desktopCollapsed}
            />

          <NavItem
            href="/dashboard/insightPage"
              label="InsightPage"
            icon={<Store className="h-4 w-4" />}
            collapsed={desktopCollapsed}
          />
          <NavItem
          href="/dashboard/contact"
              label="Contact"
            icon={<ClipboardList className="h-4 w-4" />}
            collapsed={desktopCollapsed}
          />

                 <NavItem
               href="/dashboard/cards"
              label="Cards"
              icon={<ClipboardList className="h-4 w-4" />}
              collapsed={desktopCollapsed}
            />

        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Next Core Technologies</h1>
            <Button
              // variant="outline"
              size="sm"
              onClick={toggleDesktop}
              className=" lg:flex"
            >
              <Sidebar className="h-4 w-4 mr-2" />
              {/* {desktopCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} */}
            </Button>
          </div>
          <div>{/* Placeholder for additional header controls if needed */}</div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon,
  onClick,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  collapsed?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start',
        collapsed && 'px-2'
      )}
      asChild
      onClick={onClick}
    >
      <Link href={href}>
        {icon}
        {!collapsed && <span className="ml-2">{label}</span>}
      </Link>
    </Button>
  );
}