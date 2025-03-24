import React from "react";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils/utils";
import { PlusButton } from "./plus-button";
import { MinusButton } from "./minus-button";
export interface Detail<T = { [key: string]: string | number | undefined }> {
  [key: string]: T[keyof T];
}

interface Props<T extends Detail> {
  details: T[];
  setDetails: React.Dispatch<React.SetStateAction<T[]>>;
  initialDetail?: T;
  header?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export default function ClickToAddInputs<T extends Detail>({
  details,
  setDetails,
  header,
  initialDetail = {} as T,
  containerClassName,
  inputClassName,
}: Props<T>) {
  function handleDetailsChange(
    index: number,
    property: string,
    value: string | number
  ) {
    const updatedDetails = details.map((detail, i) =>
      i === index ? { ...detail, [property]: value } : detail
    );
    setDetails(updatedDetails);
  }

  function handleAddDetail() {
    setDetails([
      ...details,
      {
        ...initialDetail,
      },
    ]);
  }

  const handleRemove = (index: number) => {
    if (details.length === 1) return;

    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  return (
    <div className="flex flex-col gap-y-4">
      {header && <div>{header}</div>}
      {details.length === 0 && <PlusButton onClick={handleAddDetail} />}
      {details.map((detail, index) => (
        <div key={index} className="flex items-center gap-x-4">
          <div className="flex flex-col lg:flex-row w-full">
            {Object.keys(detail).map((property, propIndex) => (
              <div
                key={propIndex}
                className={cn("flex items-center gap-x-4", containerClassName)}
              >
                <Input
                  className={cn(
                    "w-28 placeholder:capitalize mr-2",
                    inputClassName
                  )}
                  type={
                    typeof detail[property] === "number" ? "number" : "text"
                  }
                  name={property}
                  placeholder={property}
                  value={detail[property] as string}
                  min={typeof detail[property] === "number" ? 0 : undefined}
                  step="0.01"
                  onChange={(e) =>
                    handleDetailsChange(
                      index,
                      property,
                      e.target.type === "number"
                        ? parseFloat(e.target.value)
                        : e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
          <MinusButton onClick={() => handleRemove(index)} />
          <PlusButton onClick={handleAddDetail} />
        </div>
      ))}
    </div>
  );
}
