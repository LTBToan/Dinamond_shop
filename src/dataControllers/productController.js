export const getProduct = () => {
  return fetch("http://localhost:8080/api/products/all").then((res) =>
    res.json()
  );
};

export const getProductById = (id) => {
  return fetch(`http://localhost:8080/api/products/get/${id}`).then((res) =>
    res.json()
  );
};
const generateNewProductId = (products) => {
  const lastProduct = products.at(-1);
  const lastProductIdNumber = parseInt(
    lastProduct.productId.replace("P", ""),
    10
  );
  const newProductIdNumber = lastProductIdNumber + 1;
  const newProductId = `P${newProductIdNumber.toString().padStart(3, "0")}`;

  return newProductId;
};
export const addProduct = (data) => {
  return getProduct().then((products) => {
    const newProductId = generateNewProductId(products);
    const newProductData = { ...data, productId: newProductId };
    return fetch(`http://localhost:8080/api/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((responseData) => {
        console.log("Update successful", responseData);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the updateUser request:",
          error
        );
      });
  });
};

export const updateProduct = (id, data) => {
  return fetch(`http://localhost:8080/api/products/get/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const deleteProduct = (id) => {
  return fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((responseData) => {
      console.log("Update successful", responseData);
    })
    .catch((error) => {
      console.error("There was a problem with the updateUser request:", error);
    });
};
