
import { ReactNode } from 'react'
import {Dialog as DialogPrimitive, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription} from './DialogPrimitives'

type DialogProps = {
    trigger: ReactNode
    title: string
    description?: string
    children: ReactNode
    triggerAsChild?: boolean
    open?: boolean;
    setOpen?: (open: boolean) => void;
}
const Dialog = ({trigger, title, description, children, triggerAsChild = true, open, setOpen}: DialogProps) => {
    return (
        <DialogPrimitive open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={triggerAsChild}>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </DialogPrimitive>
    )
}

export default Dialog;