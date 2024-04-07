import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function EventModal({ stock, description, date, amount }: { stock: string, description: string, date: string, amount: number }) {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="accent">Do something</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70%] sm:max-w-[425px] ">
                <DialogHeader >
                    <DialogTitle>Select your strategy on stock {stock}</DialogTitle>
                    <DialogDescription className="pt-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid">
                    <div className=" text-gray-400">
                        Date: {date}
                    </div>
                </div>
                <DialogFooter className="flex sm:justify-between w-full h-full ">
                    <Button variant="accent" className="my-2">Buy</Button>
                    <Button variant="accent" className="my-2">Sell</Button>
                    <Button variant="accent" className="my-2">Hold</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
