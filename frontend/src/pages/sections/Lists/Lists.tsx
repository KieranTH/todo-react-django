import { useQuery } from "@tanstack/react-query"
import { queryFn } from "../../../api"
import { LoadingSpinner } from "../../../components"
import type { List as ListType } from "../../../api/type"
import List from "./List"
import AddListCard from "./AddListCard"

const Lists = () => {

    // Fetching All Lists
    const {data, isLoading} = useQuery<ListType[]>(
        {
            queryKey: ["lists"],
            queryFn: queryFn("todo/lists"),
        }
    )

    // If loading return spinner
    if(isLoading){
        return (
            <div className="h-32 flex items-center justify-center">
                <LoadingSpinner/>
            </div>
        )
    }

    // If no data return no lists
    if(!data){
        return (
            <div>
                <h4>No Lists</h4>
            </div>
        )
    }

    // If data return lists as cards
    return (
        <ul className="flex gap-4 w-full">
            {data.map((list) => (
                <List key={list.id} data={list}/>
            ))}
            <AddListCard/>
        </ul>
    )
}

export default Lists