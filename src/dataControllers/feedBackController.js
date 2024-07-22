export const getfeedBack = () => {
  return fetch("http://localhost:8080/api/feedbacks/all").then((res) =>
    res.json()
  );
};
