import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import { Toaster } from "@/components/ui/sonner"
import React from "react"

 const CommonLayout = ({children}:{children:React.ReactNode})=>{
    return (
        <div>
            <PublicNavbar/>
            {children}
            <PublicFooter/>
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default CommonLayout;