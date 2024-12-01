import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Item } from "../../api/type";
import { Checkbox } from "../Checkbox";
import { deleteFn, mutationFn } from "../../api";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../useToast";

type ItemCardProps = {
  data: Item;
};
const ItemCard = ({ data }: ItemCardProps) => {
  // Toast Hook
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // Set Item Completed Mutation
  const completeMutation = useMutation({
    mutationFn: () => {
      return mutationFn(`todo/item/${data.id}/complete`);
    },
    onSuccess: () => {
      // This should target the unique item in the cache
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      toast({
        title: "Success",
        description: "Set Item to Complete",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  // Set Item Incomplete Mutation
  const incompleteMutation = useMutation({
    mutationFn: () => {
      return mutationFn(`todo/item/${data.id}/incomplete`);
    },
    onSuccess: () => {
      // This should target the unique item in the cache
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      toast({
        title: "Success",
        description: "Set Item to Incomplete",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  // Delete Item Mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteFn(`todo/item/${data.id}/delete`);
    },
    onSuccess: () => {
      // This should target the unique item in the cache
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  // On Check Handler
  const onCheck = (status: boolean) => {
    if (status) {
      completeMutation.mutate();
    } else {
      incompleteMutation.mutate();
    }
  };

  // On Delete Handler
  const onDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <li className="bg-gray-100 p-2 rounded-lg flex items-center justify-between gap-4">
      <div className="flex gap-2 items-center">
        {data.text}
        {data.dueDate && (
          <span className="text-sm truncate text-gray-500">
            Due By: {data.dueDate}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button className="text-red-500" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Checkbox checked={data.completed ?? false} onCheckedChange={onCheck} />
      </div>
    </li>
  );
};

export default ItemCard;
