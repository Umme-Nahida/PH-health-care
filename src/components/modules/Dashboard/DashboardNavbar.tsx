import { getUserInfo } from "@/services/auth/getUserInfo"
import DashboardNavbarContent from "./DashboardNavbarContent"

const DashboardNavbar = async() => {
  
  const userInfo = await getUserInfo()

  return (
    <div className="bg-yellow-100 ">
      <DashboardNavbarContent userInfo={userInfo} />
    </div>
  )
}

export default DashboardNavbar