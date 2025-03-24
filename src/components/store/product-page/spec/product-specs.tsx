import { Spec } from "@/types/ui";
import SpecTable from "./spec-table";

interface Props {
  specs: {
    product: Spec[];
    variant: Spec[];
  };
}

export default function ProductSpecs({ specs: { product, variant } }: Props) {
  return (
    <section className="pt-6">
      <div className="h-12">
        <h2 className="text-main-primary text-2xl font-bold">Specifications</h2>
      </div>
      <SpecTable data={product} />
      <SpecTable data={variant} noTopBorder />
    </section>
  );
}
