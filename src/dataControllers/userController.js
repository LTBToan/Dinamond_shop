export const getUser = () => {
  return fetch("http://localhost:8080/api/users/all").then((res) => res.json());
};

export const getUserById = (id) => {
  return fetch(`http://localhost:8080/api/users/${id}`).then((res) =>
    res.json()
  );
};

// export const addUser = (formData) => {
//   return fetch(`http://localhost:8080/api/users`, {
//     method: "POST",

//   }).then((res) => res.json());
// };
export const addUser = (data) => {
  return fetch(`http://localhost:8080/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
export const updateUser = (id, data) => {
  return fetch(`http://localhost:8080/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const banUser = (id, data) => {
  return fetch(`http://localhost:3344/users/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const deleteUser = (id) => {
  return fetch(`http://localhost:8080/api/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
