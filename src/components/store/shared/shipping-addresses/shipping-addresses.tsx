import { ShippingAddress } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../modal";
import AddressDetails from "./address-details";
import AddressList from "./address-list";
import { UserShippingAddressType } from "@/types/ui";

interface Props {
  addresses: UserShippingAddressType[];
  selectedAddress: ShippingAddress | null;
  setSelectedAddress: Dispatch<SetStateAction<ShippingAddress | null>>;
}

export default function UserShippingAddresses({
  addresses,
  selectedAddress,
  setSelectedAddress,
}: Props) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <section className="w-full py-4 px-6 bg-white">
      <div className="relative flex flex-col text-sm">
        <h3 className="text-lg mb-3 font-bold">Shipping Addresses</h3>
        {addresses && addresses.length > 0 && (
          <AddressList
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}
        <div
          className="mt-4 ml-8 text-orange-background cursor-pointer"
          onClick={() => setShow(true)}
        >
          <Plus className="inline-block mr-1 w-3" />
          <span className="text-sm">Add new address</span>
        </div>
        <Modal title="Add new Address" show={show} setShow={setShow}>
          <AddressDetails setShow={setShow} />
        </Modal>
      </div>
    </section>
  );
}
