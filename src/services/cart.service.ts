export async function getUserCart() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      headers: {
        token: "",
      },
    });
    const data = await res.json();
    if (!res.ok){
        throw new Error(data.message || "Something went wrong")
      }
      return data;
  } catch (error) {
    console.log(error);
  }
}
