import { getUserInfo } from "@/services/auth/getUserInfo"
import DashboardNavbarContent from "./DashboardNavbarContent"
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItem.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { IUserInfo } from "@/types/user.interface";

const DashboardNavbar = async() => {
  
     const userInfo = (await getUserInfo()) as IUserInfo
  
  
    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <div className="bg-yellow-100 ">
      <DashboardNavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}  />
    </div>
  )
}

export default DashboardNavbar