export async function getCategories(limit: number) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/categories?limit=${limit || 10}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSpecificCategory(categoryId:string) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${categoryId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getSubcategoryForSpecificCategory(categoryId:string) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${categoryId}/subcategories`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return data;
  } catch (error) {
    console.log(error);
    ;
  }
}
