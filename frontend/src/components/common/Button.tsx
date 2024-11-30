import { HTMLProps } from "react"
import {twMerge} from 'tailwind-merge'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
    variant?: "none" | "primary" | "secondary" | "danger"
    type?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
}
const Button = ({className, variant = "none",children,  type = "button", disabled, ...rest}: ButtonProps) => {

    const classes = twMerge(
        variant === "primary" && 'bg-blue-500 text-white px-4 py-2 rounded-md shadow-md',
        variant === "secondary" && 'bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md',
        variant === "danger" && 'bg-red-500 text-white px-4 py-2 rounded-md shadow-md',
        disabled && 'opacity-50 cursor-not-allowed',
        className
    )

    return (
        <button {...rest} type={type} className={classes}>
            {children}
        </button>
    )
}

export default Button