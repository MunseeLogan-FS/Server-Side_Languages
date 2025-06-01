import axios from "axios";

const API = {};

API.fetchHeroes = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/v1/heroes?limit=5`
  );
  console.log("heroes thingy", response);
  return response;
};

export default API;
