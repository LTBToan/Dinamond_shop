export const getInventoryItem = () => {
  return fetch(`http://localhost:8080/api/deliveries/all`).then((res) =>
    res.json()
  );
};

const generateNewDeliveryId = (deliveries) => {
  
  const lastProduct = deliveries.at(-1);
  const lastProductIdNumber = parseInt(
    lastProduct.deliveryId.replace("D", ""),
    10
  );
  const newProductIdNumber = lastProductIdNumber + 1;
  const newProductId = `D${newProductIdNumber.toString().padStart(3, "0")}`;

  return newProductId;
};
export const createInventory = (data) => {
  return getInventoryItem().then((deliveries) => {
    console.log(`Creating inventory item: `, deliveries);
    const newProductId = generateNewDeliveryId(deliveries);
    console.log(`Creating inventory item12: `, newProductId);
    // const Address = copyAddressId(deliveries);
    const newProductData = {
      // ...data,
      deliveryId: newProductId,
      orderId: data.orderId,
      accountId: data.accountId,
      address: data.address,
      statusId: 0,
    };
    console.log("????:", newProductData);
    return fetch(`http://localhost:8080/api/deliveries/add`, {
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

// export const updateInventoryItem = (id, data) => {
//   return fetch(`http://localhost:3344/inventoryItems/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
// };

export const deleteInventory = (id) => {
  return fetch(`http://localhost:8080/api/deliveries/delete/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
