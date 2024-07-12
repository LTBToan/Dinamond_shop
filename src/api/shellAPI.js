export const getAllShell = async (id) => {
  const res = await fetch(`http://localhost:8080/api/shells/get/category/${id}`);
  return await res.json();
};

export const getAllMaterial = async () => {
  const res = await fetch("http://localhost:8080/api/material/all");
  return await res.json();
};

export const getAllDiamond = async () => {
  const res = await fetch("http://localhost:8080/api/diamonds/all");
  return await res.json();
}