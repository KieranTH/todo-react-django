import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Item } from "../../../api/type";
import { mutationFn } from "../../../api";
import { Input } from "../../Input";
import Button from "../Button";
import { useToast } from "../../useToast";

type AddItemFormData = Omit<Item, "id">;

type AddItemFormProps = {
  targetedList: number;
  setOpen: (value: boolean) => void;
};
const AddItemForm = ({ targetedList, setOpen }: AddItemFormProps) => {
  // Toast Hook
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // Create Item Mutation
  const createMutation = useMutation({
    mutationFn: (data: AddItemFormData) => {
      return mutationFn(`todo/create/item`, data);
    },
    onSuccess: () => {
      // This should target the unique item in the cache
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  //  Hook Form for Form State and Validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddItemFormData>();

  // On Form Submit
  const onSubmit = (data: AddItemFormData) => {
    console.log("data", data);
    if (data.text) {
      // Setting meta data
      data.list = targetedList;
      data.completed = false;

      // If due date is present convert to ISO string - As the HTML Input will only have it as `2024-04-05`
      if (data.dueDate) {
        data.dueDate = new Date(data.dueDate).toISOString();
      } else {
        // Due to the SQLite DB not accepting empty string for date, we need to properly parse the date to a null.
        // This is due to controlled inputs in React, we have to start with an empty string. The truthy clause above will trigger if it's an empty string `""`.
        data.dueDate = null;
      }

      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        placeholder="Item text..."
        // Register Hook Form Field
        {...register("text", { required: true })}
        label={"What do you want to do?"}
      />
      <Input
        placeholder="Item text..."
        type={"date"}
        {...register("dueDate")}
        label={"Due Date"}
      />
      <Button variant="primary" type={"submit"}>
        Add
      </Button>
    </form>
  );
};

export default AddItemForm;
