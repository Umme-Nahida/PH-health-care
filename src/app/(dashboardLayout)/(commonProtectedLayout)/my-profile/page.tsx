// import MyProfile from "@/components/modules/MyProfile/MyProfile";
import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    // You can render a loading state, error, or redirect as needed
    return <div>User info not found.</div>;
  }
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;