import { getCategories } from "@/services/categories.service";
import { ICategory } from "@/types/category.type";
import React from "react";
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories(10);

  return (
    <div className="py-18 mx-3">
      <div className="flex items-center justify-between mb-15">
        <SectionTitle title="Categories" subtitle="Browse By Category" />
        <Button
          variant={"destructive"}
          asChild
          className="bg-red-500 px-12 py-5"
        >
          <Link href="/categories">View All</Link>
        </Button>
      </div>
      <CategoriesSlider categories={categories} />
      <Separator />
    </div>
  );
}
