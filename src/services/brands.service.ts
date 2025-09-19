export async function getBrands(limit:number){
    try {
      const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands?limit=${limit || 10}`)
      if (!res.ok){
        throw new Error(res.statusText)
      }
      const data = await res.json();
      return data;
    } catch (err){
      console.log(err);
    }
  }