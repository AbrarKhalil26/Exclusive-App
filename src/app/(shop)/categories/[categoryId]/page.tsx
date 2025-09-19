import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getSpecificCategory,
  getSubcategoryForSpecificCategory,
} from "@/services/categories.service";
import { ICategory } from "@/types/category.type";
import Image from "next/image";
import React from "react";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const { data: category }: { data: ICategory } = await getSpecificCategory(
    categoryId
  );
  const { data: subCategories }: { data: ICategory[] } =
    await getSubcategoryForSpecificCategory(categoryId);

  console.log(subCategories);

  return (
    <div className="my-12 mx-4">
      <div className="container mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="my-10 grid gap-5">
          <div>
            <h2 className="text-lg font-semibold text-red-500 mb-5 ps-9 relative before:absolute before:top-1/2 before:start-0 before:-translate-y-1/2 before:w-5 before:h-10 before:bg-red-500 before:rounded-sm">
              Category
            </h2>
            <div className="relative w-60 h-60 my-10 flex justify-center">
              <Image
                src={category.image}
                alt={category.name}
                className="object-contain border shadow rounded-md"
                priority={true}
                fill
                sizes="(max-width: 768px) 300px"
              />
            </div>
          </div>
          <div className="my-10">
            <h2 className="text-lg font-semibold text-red-500 mb-5 ps-9 relative before:absolute before:top-1/2 before:start-0 before:-translate-y-1/2 before:w-5 before:h-10 before:bg-red-500 before:rounded-sm">
              Subcategories
            </h2>
            {subCategories.length > 0 ? (
              <div className="flex flex-wrap gap-5 mx-10">
                {subCategories.map((item) => (
                  <div key={item._id} className="border rounded-lg px-5 py-3 shadow">{item.name}</div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                No Subcategories Available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
