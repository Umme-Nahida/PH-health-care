import  type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

export const getIconComponent = (iconName: string): LucideIcon => {
    // icon is object, and aita key gula ache oigula akekta type 
    const Iconcomponent = Icons[iconName as keyof typeof Icons] as LucideIcon;

    if(!Iconcomponent){
        return Icons.HelpCircle;
    }
    return Iconcomponent;
}

