import SectionTitle from "@/components/shared/SectionTitle";
import { getCategories } from "@/services/categories.service";
import { ICategory } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories(50);
  console.log(categories);

  return (
    <div className="my-12 mx-4">
      <div className="container mx-auto">
        <SectionTitle title="Categories" subtitle="Browse By Category" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 space-y-10 mt-15">
          {categories.map((category) => (
            <div key={category._id}>
              <Link href={`/categories/${category._id}`}>
                <div className="relative h-60 mb-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="object-contain border shadow rounded-md"
                    priority={true}
                    fill
                    sizes="(max-width: 768px) 300px"
                  />
                </div>
              </Link>
              <h3 className="font-medium ms-2">{category.name}</h3>
            </div>
          ))}
        </div>

        {/* <CategoriesSlider categories={categories} /> */}
      </div>
    </div>
  );
}
