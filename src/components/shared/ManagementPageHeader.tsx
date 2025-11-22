import { LucideIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface ManagementPageHeaderProps {
    title: string;
    description?: string;
    actions?:{
        icon?: LucideIcon
        label: string;
        onClick: ()=> void
    }
    children?: React.ReactNode;
}

const ManagementPageHeader = ({title,description,actions,children}:ManagementPageHeaderProps) => {
    const Icon = actions?.icon || Plus;
  return (
    <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">{title} </h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {
            actions && (
                <Button onClick={actions.onClick}>
                    <Icon className="mr-2 h-4 w-4"/>
                    {actions.label}
                </Button>
            )
        }
        {children}
    </div>
  )
}

export default ManagementPageHeader