import { CartProductType } from "@/types/ui";

export function areCartsEqual(
  first: CartProductType[],
  second: CartProductType[]
) {
  return first.every((first) =>
    second.some(
      (second) =>
        first.sizeId === second.sizeId && first.quantity === second.quantity
    )
  );
}
