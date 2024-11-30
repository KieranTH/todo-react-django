import { faArrowRightToBracket, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "./Button"

const Header = () => {
    return (
        <header className='bg-gray-300 w-full h-12 px-6 rounded-b-xl shadow flex items-center justify-between'>
            <div className="flex items-center gap-2 text-gray-900">
                <FontAwesomeIcon icon={faList}/>
             <h3 className="font-medium">To-do App</h3>
            </div>
            <Button>
                <FontAwesomeIcon icon={faArrowRightToBracket}/> 
            </Button>
        </header>
    )
}

export default Header