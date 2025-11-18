import { getUserInfo } from "@/services/auth/getUserInfo"
import DashboardSidebarContent from "./DashboardSidebarContent"
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItem.config";
import { IUserInfo } from "@/types/user.interface";

const DashboardSidebar = async() => {
   const userInfo = (await getUserInfo()) as IUserInfo


   const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <div>

      <DashboardSidebarContent 
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
      />
    </div>
  )
}

export default DashboardSidebar