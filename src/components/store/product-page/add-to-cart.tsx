"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils/utils";
import { SizeInfoWithCartItemQuantity } from "@/types/ui";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QuantitySelector from "./quantity-selector";
import { updateCartItemInCart } from "@/actions/cart";
import { SecurityPrivacyCard } from "../cards/return-security-privacy/security-privacy";

interface Props {
  currentSize: SizeInfoWithCartItemQuantity | undefined;
}

export default function AddToCart({ currentSize }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartStore((state) => state.addToCart);
  const currentCartQuantity = currentSize?.cartItems.at(0)?.quantity;
  const maxQty = (currentSize?.stock ?? 0) - (currentCartQuantity ?? 0);

  const isValidToAdd = currentSize && maxQty > 0;

  useEffect(() => {
    if (maxQty < quantity) {
      setQuantity(maxQty);
    }
  }, [maxQty]);

  const handleAddToCart = async () => {
    if (!isValidToAdd) return;
    // TODO --- handle for anonymous user --- store cartid in cookie vs local storage
    const item = await updateCartItemInCart({
      sizeId: currentSize.id,
      quantity,
    });
    addToCart(item);
    toast.success("Product added to cart successfully.");
  };

  return (
    <div className="z-20 w-full md:w-[390px] bg-white border rounded-md overflow-hidden overflow-y-auto p-4 pb-0">
      <SecurityPrivacyCard />
      <div className="mt-5 bg-white bottom-0 pb-4 space-y-3 sticky">
        {currentSize ? (
          <div className="w-full flex justify-end mt-4">
            <QuantitySelector
              key={maxQty}
              sizeId={currentSize.id}
              quantity={quantity}
              setQuantity={setQuantity}
              stock={currentSize.stock}
              maxQty={maxQty!}
            />
          </div>
        ) : (
          <div className="font-bold text-center">To buy, select size</div>
        )}
        <button
          disabled={!isValidToAdd}
          className={cn(
            "relative w-full py-2.5 min-w-20 bg-orange-border hover:bg-[#e4cdce] text-orange-hover h-11 rounded-3xl leading-6 inline-block font-bold whitespace-nowrap border border-orange-border cursor-pointer transition-all duration-300 ease-bezier-1 select-none",
            {
              "cursor-not-allowed": !isValidToAdd,
            }
          )}
          onClick={() => handleAddToCart()}
        >
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}
