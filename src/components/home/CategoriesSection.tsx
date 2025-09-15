import { getCategories } from "@/services/categories.service";
import { ICategory } from "@/types/category.type";
import React from "react";
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@/components/ui/separator"

export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  console.log(categories);

  return (
    <div className="py-18 mx-3">
      <SectionTitle title="Categories" subtitle="Browse By Category" />
      <CategoriesSlider categories={categories} />
      <Separator />
    </div>
  );
}
