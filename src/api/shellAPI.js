export const getAllShell = async () => {
  const res = await fetch("http://localhost:8080/api/shells/all");
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