import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, LoadingSpinner } from "../";
import { List } from "../../api/type";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type ListCardProps = {
    data: List
    children?: React.ReactNode
    onComplete: () => void
    onDelete: () => void
}
const ListCard = ({data, children, onComplete, onDelete}: ListCardProps) => {
    return (
        <Card disabled={data.completed}>
            <CardHeader>
                <CardTitle>
                {data.title}
                </CardTitle>
                <CardDescription>
                {data.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="max-h-42 overflow-auto">
                {children}
            </CardContent>
            <CardFooter className="flex gap-2 items-center">
                <Button variant="primary" className="gap-2 flex items-center" onClick={onComplete} disabled={data.completed}>
                    <FontAwesomeIcon icon={faCheck}/>
                    Set as Complete
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ListCard