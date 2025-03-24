"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { reviewFormSchema } from "@/lib/schema-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Select from "../ui/select";
import StarRatings from "react-star-ratings";
import { Button } from "../ui/button";
import { PulseLoader } from "react-spinners";
import { v4 } from "uuid";
import { upsertReview } from "@/actions/review";
import {
  ReviewDetailsType,
  ReviewWithUserType,
  VariantInfoType,
} from "@/types/ui";
import { ReviewInsert } from "@/types";

export default function ReviewDetails({
  productId,
  data,
  variantsInfo,
  setReviews,
  reviews,
}: {
  productId: string;
  data?: ReviewDetailsType;
  variantsInfo: VariantInfoType[];
  reviews: ReviewWithUserType[];
  setReviews: Dispatch<SetStateAction<ReviewWithUserType[]>>;
}) {
  const [sizes, setSizes] = useState<{ name: string; value: string }[]>([]);

  const form = useForm<ReviewInsert>({
    mode: "onChange",
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      variant: data?.variant || variantsInfo[0].variantName,
      rating: data?.rating || 0,
      size: data?.size || "",
      review: data?.review || "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleSubmit = async (values: ReviewInsert) => {
    try {
      const response = await upsertReview(productId, values, data?.id || v4());
      if (response.id) {
        const rev = reviews.filter((rev) => rev.id !== response.id);
        setReviews([...rev, response]);
      }
      toast.success("Review Added Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  const variants = variantsInfo.map((v) => ({
    name: v.variantName,
    value: v.variantName,
    image: v.variantImage,
  }));

  useEffect(() => {
    form.setValue("size", "");
    const name = form.getValues().variant;
    const variant = variantsInfo.find((v) => v.variantName === name);
    if (variant) {
      const sizes_data = variant.sizes.map((s) => ({
        name: s,
        value: s,
      }));
      if (sizes) setSizes(sizes_data);
    }
  }, [form.getValues().variant]);

  return (
    <div className="p-4 bg-[#f5f5f5] rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="pt-4">
              <h3 className="font-bold text-2xl">Add a review</h3>
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-x-2">
                        <StarRatings
                          rating={field.value}
                          changeRating={field.onChange}
                          starDimension="32px"
                          starEmptyColor="#e2dfdf"
                          starRatedColor="#FFD804"
                          starHoverColor="#FFD804"
                        />
                        <span>
                          ( {form.getValues().rating.toFixed(1)} out of 5.0)
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-wrap gap-x-4">
                <div className="flex items-center flex-wrap gap-2">
                  <FormField
                    control={form.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            options={variants}
                            placeholder="Select product"
                            subPlaceholder="Please select a product"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          options={sizes}
                          placeholder="Select size"
                          subPlaceholder="Please select a size"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        className="min-h-32 p-4 w-full rounded-xl focus:outline-none ring-1 ring-[transparent] focus:ring-[#11BE86]"
                        placeholder="Write your review..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <p className="space-y-2 text-destructive">
              {errors.rating && <p>{errors.rating.message}</p>}
              {errors.size && <p>{errors.size.message}</p>}
              {errors.review && <p>{errors.review.message}</p>}
            </p>
            <div className="w-full flex justify-end">
              <Button type="submit" className="w-36 h-12">
                {isLoading ? (
                  <PulseLoader size={5} color="#fff" />
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
