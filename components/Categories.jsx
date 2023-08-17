"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@constants";

const Categories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (item) => {
    router.push(`${pathname}?category=${item}`);
  };

  return (
    <div className="flexBetween w-full flex-wrap gap-5">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg whitespace-nowrap`}
            onClick={() => handleTags(filter)}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
