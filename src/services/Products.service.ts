export async function getProducts(limit = 50) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`
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

export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "no-cache",
      }
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
