import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Item } from "../../../api/type"
import { mutationFn } from "../../../api"
import { Input } from "../../Input"
import Button from "../Button"
import { useToast } from "../../useToast"

type AddItemFormData = Omit<Item, "id">

type AddItemFormProps = {
    targetedList: number
    setOpen: (value: boolean) => void
}
const AddItemForm = ({targetedList, setOpen}: AddItemFormProps) => {

    const { toast } = useToast()

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: AddItemFormData) => {
          return mutationFn(`todo/create/item`, data)
        },
        onSuccess: () => {
            // This should target the unique item in the cache
            queryClient.invalidateQueries({
                queryKey: ["items"]
            })
            setOpen(false)
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
            })
        }
      })


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddItemFormData>()

    const onSubmit = (data: AddItemFormData) => {
        console.log("data", data)
        if(data.text){
            data.list = targetedList
            data.completed = false
            if(data.dueDate){
                data.dueDate = new Date(data.dueDate).toISOString()
            } else {
                data.dueDate = null
            }

            createMutation.mutate(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input placeholder="Item text..." {...register("text", {required: true})} label={"What do you want to do?"}/>
            <Input placeholder="Item text..." type={"date"} {...register("dueDate")} label={"Due Date"}/>
            <Button variant="primary" type={"submit"}>
                Add
            </Button>
        </form>
    )
}

export default AddItemForm;