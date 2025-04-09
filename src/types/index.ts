

export type StatusType = "pendente" | "conectado" | "cancelado" | "reagendar";
const StatusType = {
    pendente: "pendente" as StatusType,
    conectado: "conectado" as StatusType,
    cancelado: "cancelado" as StatusType,
    reagendar: "reagendar" as StatusType,
} as const;


export type DataOrderType = {
    id: string;
    number: number;
    local: string;
    observation: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    status: StatusType;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserDataType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}