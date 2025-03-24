"use client";
import { UserShippingAddressType } from "@/types/ui";
import { ShippingAddress } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface Props {
  addresses: UserShippingAddressType[];
  selectedAddress: ShippingAddress | null;
  setSelectedAddress: Dispatch<SetStateAction<ShippingAddress | null>>;
}

export default function AddressList({
  addresses,
  selectedAddress,
  setSelectedAddress,
}: Props) {
  useEffect(() => {
    const defaultAddress = addresses.find((address) => address.default);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [addresses]);

  const handleAddressSelect = (address: ShippingAddress) => {
    setSelectedAddress(address);
  };
  return (
    <ul className="space-y-5 max-h-80 overflow-y-auto">
      {addresses.map((address) => (
        <li key={address.id}>
          {/* <ShippingAddressCard
            address={address}
            isSelected={selectedAddress?.id === address.id}
            onSelect={() => handleAddressSelect(address)}
          /> */}
        </li>
      ))}
    </ul>
  );
}
