import ProductPageContainer from "@/components/store/product-page/container";
import ProductDescription from "@/components/store/product-page/product-description";
import ProductSpecs from "@/components/store/product-page/spec/product-specs";
import RelatedProducts from "@/components/store/product-page/related-product";
import ProductReviews from "@/components/store/product-page/reviews/product-reviews";
import StoreProducts from "@/components/store/product-page/store-products";
import { Separator } from "@/components/ui/separator";
import { getProductPageData } from "@/actions/product";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ productSlug: string; variantSlug: string }>;
  searchParams: Promise<{
    size?: string;
  }>;
}

export default async function ProductVariantPage({
  params,
  searchParams,
}: Props) {
  const { productSlug, variantSlug } = await params;
  const { size: sizeId } = await searchParams;

  const productData = await getProductPageData(productSlug, variantSlug);

  if (!productData) {
    return notFound();
  }

  const { sizes } = productData;

  if (sizeId) {
    const isValidSize = sizes.some((size) => size.id === sizeId);

    if (!isValidSize) {
      return redirect(`/product/${productSlug}/${variantSlug}`);
    }
  } else if (sizes.length === 1) {
    return redirect(
      `/product/${productSlug}/${variantSlug}?size=${sizes[0].id}`
    );
  }

  const { variantsInfo, specs, category, reviewsStatistics, reviews } =
    productData;

  return (
    <div className="max-w-[1650px] mx-auto p-4 overflow-x-hidden">
      <ProductPageContainer productData={productData} sizeId={sizeId}>
        <RelatedProducts categoryUrl={category.url} />
        <Separator className="mt-6" />
        <ProductReviews
          productId={productData.productId}
          rating={productData.rating}
          statistics={reviewsStatistics}
          reviews={reviews}
          variantsInfo={variantsInfo}
        />
        <>
          <Separator className="mt-6" />
          <ProductDescription
            text={[
              productData.description,
              productData.variantDescription || "",
            ]}
          />
        </>
        {(specs.product.length > 0 || specs.variant.length > 0) && (
          <>
            <Separator className="mt-6" />
            <ProductSpecs specs={specs} />
          </>
        )}
        <Separator className="my-6" />
        <StoreProducts />
      </ProductPageContainer>
    </div>
  );
}
