import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button, Card, Dialog, Input } from "../../../components"
import { mutationFn } from "../../../api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { List } from "../../../api/type"
import { useToast } from "../../../components/useToast"

type AddListFormData = Omit<List, "id">

const AddListCard = () => {

    const {toast} = useToast()

    const [open, setOpen] = useState(false)

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: AddListFormData) => {
          return mutationFn(`todo/create/list/`, data)
        },
        onSuccess: () => {
            // This should target the unique item in the cache
            queryClient.invalidateQueries({
                queryKey: ["lists"]
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
    } = useForm<AddListFormData>()

    const onSubmit = (data: AddListFormData) => {
        if(data.title){
            createMutation.mutate(data)
        }
    }

    return (
        <Card className="min-w-64 flex items-center justify-center border-dashed border-2 bg-white/30 hover:bg-white transition-colors">
            <Dialog
                trigger={
                    <Button variant={"secondary"}>
                    Add List
                </Button>
                }
                title={"Add Item"}
                open={open}
                setOpen={setOpen}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input placeholder="Name..." {...register("title", {required: true})} label={"List Name"}/>
                    <Button variant="primary" type={"submit"}>
                        Add
                    </Button>
                </form>
            </Dialog>
        </Card>
    )
}

export default AddListCard