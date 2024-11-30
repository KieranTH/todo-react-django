import { Lists } from "./sections"

const Body = () => {
    return (
        <main className="p-5 w-full flex flex-col gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
                <h3 className="font-medium">Lists</h3>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <Lists/>
            </div>
        </main>
    )
}
export default Body