import ProductFilters from "@/components/store/browse-page/filters";
import ProductSort from "@/components/store/browse-page/sort";
import Pagination from "@/components/store/shared/pagination";
import { getProducts } from "@/actions/product";
import { FiltersQueryType } from "@/types/ui";
import ProductList from "@/components/store/shared/product-list/product-list";
import ProductFiltersToggler from "@/components/store/browse-page/filter-toggler";

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
    <section className="max-w-[1600px] mx-auto min-h-[calc(100vh-104px)]">
      <div className="gap-x-5 mx-2 w-full h-full">
        <div className="space-y-5 w-full h-[calc(100%-40px)] p-2">
          <h1 className="text-main-primary inline text-xl font-bold leading-5 capitalize p-4">
            Search results:
          </h1>
          <div className="flex flex-row">
            <ProductSort />
            <ProductFiltersToggler>
              <ProductFilters queries={params} />
            </ProductFiltersToggler>
          </div>
          <ProductList products={products} />
        </div>
        <Pagination page={Number(page)} totalPages={totalPages}></Pagination>
      </div>
    </section>
  );
}
