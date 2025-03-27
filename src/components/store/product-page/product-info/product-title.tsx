interface Props {
  name: string;
  variantName: string;
}

export function ProductTitle({ name, variantName }: Props) {
  return (
    <h1 className="text-main-primary inline font-bold leading-5 capitalize mt-2">
      {name} · {variantName}
    </h1>
  );
}
