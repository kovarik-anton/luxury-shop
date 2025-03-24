"use client";

import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  sizeId: string | null;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  stock: number;
  maxQty: number;
}

export default function QuantitySelector({
  quantity,
  sizeId,
  stock,
  setQuantity,
  maxQty,
}: Props) {
  if (!sizeId) return null;

  const handleIncrease = () => {
    if (quantity < maxQty) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <section className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg">
      <div className="w-full flex justify-between items-center gap-x-5">
        <div className="grow">
          <p className="block text-xs text-gray-500">Select quantity</p>
          <p className="block text-xs text-gray-500">
            {maxQty !== stock &&
              `(You already have ${
                stock - maxQty
              } pieces of this product in cart)`}
          </p>
          <input
            type="number"
            className="w-full p-0 bg-transparent border-0 focus:outline-0 text-gray-800"
            min={1}
            value={maxQty <= 0 ? 0 : quantity}
            max={maxQty}
            readOnly
          />
        </div>
        <div className="flex justify-end items-center gap-x-1.5">
          <button
            className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            <Minus className="w-3" />
          </button>
          <button
            className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleIncrease}
            disabled={quantity >= maxQty}
          >
            <Plus className="w-3" />
          </button>
        </div>
      </div>
    </section>
  );
}
