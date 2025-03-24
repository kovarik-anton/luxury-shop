import { Reviews_Order_Options } from "@/constants";
import { ReviewsOrderType } from "@/types/ui";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  sort: ReviewsOrderType;
  setSort: Dispatch<SetStateAction<ReviewsOrderType>>;
}

export default function ReviewsSort({ sort, setSort }: Props) {
  return (
    <div className="group w-[120px]">
      <button className="text-main-primary hover:text-[#fd384f] text-sm py-0.5 text-center inline-flex items-center">
        {Reviews_Order_Options[sort]}
        <ChevronDown className="w-3 ml-1" />
      </button>
      <div className="z-10 hidden absolute bg-white shadow w-[120px] group-hover:block">
        <ul className="text-m text-gray-700">
          {Object.entries(Reviews_Order_Options).map(
            ([orderBy, description]) => {
              return (
                <li
                  key={orderBy}
                  onClick={() => setSort(orderBy as ReviewsOrderType)}
                >
                  <p className="block p-2 text-sm cursor-pointer hover:bg-gray-100">
                    {description}
                  </p>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
