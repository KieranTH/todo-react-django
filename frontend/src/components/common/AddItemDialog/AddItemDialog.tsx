import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import AddItemForm from "./AddItemForm"
import { Dialog } from "../../Dialog"
import Button from "../Button"

type AddItemDialogProps = {
    targetedList: number
}
const AddItemDialog = ({targetedList}: AddItemDialogProps) => {

    const [open, setOpen] = useState(false)

    return (
        <Dialog
            trigger={
                <Button className="w-full border-2 rounded-lg p-2 mt-2 h-10 flex items-center gap-2 justify-center">
                    <FontAwesomeIcon icon={faPlus}/>
                    Add Item
                </Button>
            }
            title={"Add Item"}
            open={open}
            setOpen={setOpen}
        >
            <AddItemForm targetedList={targetedList} setOpen={setOpen}/>
        </Dialog>
    )
}

export default AddItemDialog