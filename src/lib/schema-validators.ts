import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required.",
      invalid_type_error: "Category name must be a string.",
    })
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),
  image: z
    .string({
      required_error: "Category image is required",
      invalid_type_error: "Category image must be a string",
    })
    .min(1, "Choose a category image."),
  url: z
    .string({
      required_error: "Category url is required",
      invalid_type_error: "Category url must be a string",
    })
    .min(2, { message: "Category url must be at least 2 characters long." })
    .max(50, { message: "Category url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  featured: z.boolean().default(false),
});

export const subcategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "SubCategory name is required",
      invalid_type_error: "SubCategory name must be a string",
    })
    .min(2, { message: "SubCategory name must be at least 2 characters long." })
    .max(50, { message: "SubCategory name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the subCategory name.",
    }),
  image: z
    .string({
      required_error: "Subcategory image is required",
      invalid_type_error: "Subcategory image must be a string",
    })
    .min(1, "Choose a subcategory image."),
  url: z
    .string({
      required_error: "SubCategory url is required",
      invalid_type_error: "SubCategory url must be a string",
    })
    .min(2, { message: "SubCategory url must be at least 2 characters long." })
    .max(50, { message: "SubCategory url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the subCategory url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  categoryId: z.string().uuid(),
  featured: z.boolean().default(false),
});

export const offerTagFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required.",
      invalid_type_error: "Category nale must be a string.",
    })
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s&$.%,']+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),
  url: z
    .string({
      required_error: "Category url is required",
      invalid_type_error: "Category url must be a string",
    })
    .min(2, { message: "Category url must be at least 2 characters long." })
    .max(50, { message: "Category url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
});

export const reviewFormSchema = z.object({
  variant: z.string().min(1, "Variant is required."),
  rating: z.number().min(1, "Please rate this product."),
  size: z.string().min(1, "Please select a size."), // Ensures size cannot be empty
  review: z
    .string()
    .min(
      10,
      "Your feedback matters! Please write a review of minimum 10 characters."
    ),
});

export const shippingAddressFormSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is mandatory.",
      invalid_type_error: "First name must be a valid string.",
    })
    .min(2, { message: "First name should be at least 2 characters long." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters are allowed in name.",
    }),

  lastName: z
    .string({
      required_error: "Last name is mandatory.",
      invalid_type_error: "Last name must be a valid string.",
    })
    .min(2, { message: "Last name should be at least 2 characters long." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters are allowed in name.",
    }),
  phone: z
    .string({
      required_error: "Phone number is mandatory.",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^\+?\d+$/, { message: "Invalid phone number format." }),
  address1: z
    .string({
      required_error: "Address line 1 is mandatory.",
      invalid_type_error: "Address line 1 must be a valid string.",
    })
    .min(5, { message: "Address line 1 should be at least 5 characters long." })
    .max(100, { message: "Address line 1 cannot exceed 100 characters." }),
  address2: z
    .string({
      invalid_type_error: "Address line 2 must be a valid string.",
    })
    .max(100, { message: "Address line 2 cannot exceed 100 characters." })
    .optional(),
  state: z
    .string({
      required_error: "State is mandatory.",
      invalid_type_error: "State must be a valid string.",
    })
    .min(2, { message: "State should be at least 2 characters long." })
    .max(50, { message: "State cannot exceed 50 characters." }),
  city: z
    .string({
      required_error: "City is mandatory.",
      invalid_type_error: "City must be a valid string.",
    })
    .min(2, { message: "City should be at least 2 characters long." })
    .max(50, { message: "City cannot exceed 50 characters." }),
  zip: z
    .string({
      required_error: "Zip code is mandatory.",
      invalid_type_error: "Zip code must be a valid string.",
    })
    .min(2, { message: "Zip code should be at least 2 characters long." })
    .max(10, { message: "Zip code cannot exceed 10 characters." }),
  default: z.boolean().default(false),
});

export const couponFormSchema = z.object({
  coupon: z
    .string({
      required_error: "Coupon is required",
      invalid_type_error: "Coupon must be a string",
    })
    .min(2, "Coupon must be atleast 2 characters."),
});
