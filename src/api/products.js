export async function getProducts() {
  try {
    const res = await fetch("https://api.pujakaitem.com/api/products");
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("Error", error);
    throw error; // Ensure React Query catches it
  }
}

// ✅ Function for Creating a Product
export const createProduct = async (newProduct) => {
  console.log("new Product Added", newProduct);
  return
};
