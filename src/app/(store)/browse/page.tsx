import ProductFilters from "@/components/store/browse-page/filters";
import ProductSort from "@/components/store/browse-page/sort";
import Pagination from "@/components/store/shared/pagination";
import { getProducts } from "@/actions/product";
import { FiltersQueryType } from "@/types/ui";
import ProductList from "@/components/store/shared/product-list/product-list";

interface Props {
  searchParams: Promise<FiltersQueryType>;
}

export default async function BrowsePage({ searchParams }: Props) {
  const { category, offer, search, size, sort, subCategory, page } =
    await searchParams;
  const params = await searchParams;
  const { products, totalPages } = await getProducts(
    {
      search,
      category: Array.isArray(category)
        ? category
        : category
        ? [category]
        : undefined,
      subCategory: Array.isArray(subCategory)
        ? subCategory
        : subCategory
        ? [subCategory]
        : undefined,
      offer: Array.isArray(offer) ? offer : offer ? [offer] : undefined,
      size: Array.isArray(size) ? size : size ? [size] : undefined,
    },
    sort
  );

  return (
    <section className="max-w-[1600px] mx-auto">
      <div className=" flex mt-5 gap-x-5 mx-6">
        <ProductFilters queries={params} />
        <div className="p-4 space-y-5">
          <h1 className="text-main-primary inline text-xl font-bold leading-5 capitalize">
            Search results:
          </h1>
          <ProductSort />
          <ProductList products={products} />
        </div>
      </div>
      <Pagination page={Number(page)} totalPages={totalPages}></Pagination>
    </section>
  );
}
