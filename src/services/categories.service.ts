export async function getCategories(){
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
      if (!res.ok){
        throw new Error(res.statusText)
      }
      const data = await res.json();
      return data;
    } catch (err){
      console.log(err);
    }
  }