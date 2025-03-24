import { Undo } from "lucide-react";

interface Props {
  returnPolicy: string;
}

export function Returns({ returnPolicy }: Props) {
  return (
    <section className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <Undo className="w-4" />
          <p className="text-sm font-bold">Return Policy</p>
        </div>
      </div>
      <div>
        <p className="text-xs ml-5 text-[#979797] flex">{returnPolicy}</p>
      </div>
    </section>
  );
}
