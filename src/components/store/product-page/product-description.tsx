"use client";
import DOMPurify from "dompurify";

interface Props {
  text: [string, string];
}

export default function ProductDescription({
  text: [productDescription, variantDescription],
}: Props) {
  const sanitizedDescription1 = DOMPurify.sanitize(productDescription);
  const sanitizedDescription2 = DOMPurify.sanitize(variantDescription);
  return (
    <section className="pt-6">
      <div className="h-12">
        <h2 className="text-main-primary text-2xl font-bold">Description</h2>
      </div>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescription1 }} />
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescription2 }} />
    </section>
  );
}
