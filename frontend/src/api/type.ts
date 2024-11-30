
export type List = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    completed?: boolean
}

export type Item = {
    id: number;
    text: string;
    createdAt: string
    dueDate?: string | null
    completed: boolean;
    list: number;
}