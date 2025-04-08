import { StatusType } from "@/types";
import { Badge } from "../ui/badge";
import { CircleCheck, CircleDotDashed, CircleX, Loader } from "lucide-react";





export function StatusBadge({ status } : { status: StatusType }) {
    let color;

    if(status.toLocaleLowerCase() === "pendente") {
        color = "bg-orange-100 text-orange-700"
    } else if(status.toLocaleLowerCase() === "conectado") {
        color = "bg-green-100 text-green-700"
    } else if(status.toLocaleLowerCase() === "cancelado") {
        color = "bg-red-100 text-red-700"
    } else {
        color = "bg-blue-100 text-blue-700"
    }

    return (
        <Badge className={`${color} text-[12px] font-medium flex items-center gap-1 rounded-full`}>
            {
                status.toLocaleLowerCase() === "pendente" ? <CircleDotDashed size={10} className={color}/> :
                status.toLocaleLowerCase() === "conectado" ? <CircleCheck size={10} className={color}/> :
                status.toLocaleLowerCase() === "cancelado" ? <CircleX size={10} className={color}/> :
                <Loader size={10} className={color} />
            }
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    )
}