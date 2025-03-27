import { z } from "zod";

import {
  categoryFormSchema,
  contactUsFormSchema,
  couponFormSchema,
  offerTagFormSchema,
  reviewFormSchema,
  shippingAddressFormSchema,
  subcategoryFormSchema,
} from "@/lib/schema-validators";

export type CategoryInsert = z.infer<typeof categoryFormSchema>;
export type OfferTagInsert = z.infer<typeof offerTagFormSchema>;
export type SubcategoryInsert = z.infer<typeof subcategoryFormSchema>;
export type ReviewInsert = z.infer<typeof reviewFormSchema>;
export type ShippingAddressInsert = z.infer<typeof shippingAddressFormSchema>;
export type CouponInsert = z.infer<typeof couponFormSchema>;
export type ContactUsInsert = z.infer<typeof contactUsFormSchema>;
