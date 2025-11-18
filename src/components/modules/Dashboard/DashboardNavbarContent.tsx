"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IUserInfo } from "@/types/user.interface"
import { Bell, Menu, Search } from "lucide-react"
import UserDropdown from "./UserDropdown"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavSection } from "@/types/dashboard.interface"
import DashboardModileSidebar from "./DashboardModileSidebar"
import { useEffect, useState } from "react"

interface IDashboardNavbarContentProps {
   userInfo: IUserInfo,
   navItems: NavSection[];
   dashboardHome: string;
}

const DashboardNavbarContent = ({userInfo,navItems,dashboardHome}:IDashboardNavbarContentProps) => {
  console.log("userInfo:", userInfo)

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = ()=>{
      // Check if the window width is less than a certain breakpoint (e.g., 768px for mobile)
      setIsMobile(window.innerWidth < 768);

    }
    checkIsMobile();
    // Add event listener to handle window resize
    window.addEventListener('resize', checkIsMobile)
    // Cleanup event listener on component unmount or memory leak 
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Mobile Menu Toggle */}
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          {/* Hide the overlay on medium and larger screens */}
          <SheetContent side="left" className="w-64 p-0">
            <DashboardModileSidebar
              userInfo={userInfo}
              navItems={navItems || []}
              dashboardHome={dashboardHome || ""}
            />
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search Here..." className="pl-9" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
           {/* Notifications  */}
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          </Button>

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo!} />
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbarContent