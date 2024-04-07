import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvestmentState } from "@/state/investmentState";
import { useState } from "react";

export function EventModal({
  stock,
  description,
  date,
  action,
}: {
  stock: string;
  description: string;
  date: string;
  action: (symbol: string, amount: number, action: "buy" | "sell") => void;
}) {
  const { resumeSimulation } = useInvestmentState();
  const [isOpen, setIsOpen] = useState(false);

  const [amount, setAmount] = useState(0);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" onClick={() => setIsOpen(true)}>
          Do something
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70%] sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Select your strategy on stock {stock}</DialogTitle>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1">
          <div className="flex sm:justify-between">
            <Label htmlFor="amount">Amount</Label>
            <p className=" text-gray-400 mb-1">{date}</p>
          </div>
          <Input
            id="amount"
            type="text"
            className="col-span-3"
            value={amount}
            onChange={(e) => {
              const value = Number(e.target.value);

              setAmount(isNaN(value) ? 0 : value);
            }}
          />
        </div>
        <DialogFooter className="flex sm:justify-between w-full h-full ">
          <Button
            variant="accent"
            className="my-2"
            onClick={() => {
              action(stock, amount, "sell");
              setIsOpen(false);
            }}
          >
            Sell
          </Button>
          <Button
            variant="accent"
            className="my-2"
            onClick={() => {
              setIsOpen(false);
              resumeSimulation();
            }}
          >
            Hold
          </Button>
          <Button
            variant="accent"
            className="my-2"
            onClick={() => {
              action(stock, amount, "buy");
              setIsOpen(false);
            }}
          >
            Buy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
