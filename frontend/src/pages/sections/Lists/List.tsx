import type { Item, List as ListType } from "../../../api/type";
import {
  AddItemDialog,
  ItemCard,
  ListCard,
  LoadingSpinner,
} from "../../../components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFn, mutationFn, queryFn } from "../../../api";
import { useToast } from "../../../components/useToast";

type ListProps = {
  data: ListType;
};
const List = ({ data }: ListProps) => {
  // Toast Hook
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // Fetch Items for this List
  const { data: itemData, isLoading } = useQuery<Item[]>({
    queryKey: ["items", data.id],
    queryFn: queryFn(`todo/list/${data.id}/items`),
  });

  // Set List Completed Mutation
  const completeMutation = useMutation({
    mutationFn: () => {
      return mutationFn(`todo/list/${data.id}/complete`);
    },
    onSuccess: () => {
      // This should target the unique item in the cache
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  // Delete List Mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteFn(`todo/list/${data.id}/delete`);
    },
    onSuccess: () => {
      // This should target the unique item in the cache
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  // On Complete Handler
  const onComplete = () => {
    completeMutation.mutate();
  };

  // On Delete Handler
  const onDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <ListCard data={data} onComplete={onComplete} onDelete={onDelete}>
      {isLoading && <LoadingSpinner />}
      {itemData && (
        <ul className="flex flex-col gap-2">
          {itemData.map((item) => (
            <ItemCard key={item.id} data={item} />
          ))}
        </ul>
      )}
      <AddItemDialog targetedList={data.id} />
    </ListCard>
  );
};

export default List;
