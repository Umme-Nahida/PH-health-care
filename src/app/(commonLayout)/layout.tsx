import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import React from "react"

 const CommonLayout = ({children}:{children:React.ReactNode})=>{
    return (
        <div>
            <PublicNavbar/>
            {children}
            <PublicFooter/>
        </div>
    )
}

export default CommonLayout;