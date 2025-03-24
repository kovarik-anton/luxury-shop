import { getVariantSlugByProductSlug } from "@/actions/product";
import { redirect } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const variantSlug = await getVariantSlugByProductSlug(productSlug);

  if (!variantSlug) {
    return redirect("/");
  }

  return redirect(`/product/${productSlug}/${variantSlug}`);
}
