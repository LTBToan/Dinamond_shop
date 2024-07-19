export const getProductByCategory = async (categoryId) => {
  const res = await fetch(`http://localhost:8080/api/products/get/category/${categoryId}`);
  return await res.json();
};

export const getProductByMaterial = async (materialId) => {
  const res = await fetch(`http://localhost:8080/api/products/get/material/${materialId}`);
  return await res.json();
}

export const getProductByPrice = async (a, b) => {
  const res = await fetch(`http://localhost:8080/api/products/get/price/${a}/${b}`);
  return await res.json();
}

export const getAllProduct = async () => {
  const res = await fetch(`http://localhost:8080/api/products/get/all`);
  return await res.json();
};

export const getAllCategory = async () => {
  const res = await fetch(`http://localhost:8080/api/category/all`);
  return await res.json();
}