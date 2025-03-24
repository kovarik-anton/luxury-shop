"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressFormSchema } from "@/lib/schema-validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { UserShippingAddressType } from "@/types/ui";
import { upsertShippingAddress } from "@/actions/shipping-address";
import { ShippingAddressInsert } from "@/types";

interface AddressDetailsProps {
  data?: UserShippingAddressType;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const AddressDetails: FC<AddressDetailsProps> = ({ data, setShow }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ShippingAddressInsert>({
    mode: "onChange",
    resolver: zodResolver(shippingAddressFormSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      address1: data?.address1,
      address2: data?.address2 || "",
      city: data?.city,
      phone: data?.phone,
      state: data?.state,
      zip: data?.zip,
      default: data?.default,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function handleSubmit(values: ShippingAddressInsert) {
    try {
      const response = await upsertShippingAddress(
        values,
        data?.id ? data.id : v4()
      );

      toast({
        title: response?.id
          ? "Shipping address has been updated."
          : `Congratulations! Shipping address is now created.`,
      });

      router.refresh();
      setShow(false);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error.toString(),
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormLabel>Contact information</FormLabel>
            <div className="flex items-center justify-between gap-3">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="First name*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Last name*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1 w-[calc(50%-8px)] !mt-3">
                  <FormControl>
                    <Input placeholder="Phone number*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormLabel>Address</FormLabel>
            <div className="!mt-3 flex items-center justify-between gap-3">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Street, house/apartment/unit*"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Apt, suite, unit, etc (optional）"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="!mt-3 flex items-center justify-between gap-3">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="State*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="City*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="flex-1 w-[calc(50%-8px)] !mt-3">
                  <FormControl>
                    <Input placeholder="Zip code*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="rounded-md">
            {isLoading
              ? "loading..."
              : data?.id
              ? "Save address information"
              : "Create address"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressDetails;
