import axios from "axios";

const API = {};

API.fetchHeroes = async (type) => {
  const response = await axios.get(
    `http://localhost:3001/api/v1/${type}?limit=50`
  );
  // console.log("heroes thingy", response.data.data);
  return response.data.data;
};
API.searchHeroes = async (type, supName) => {
  const response = await axios.get(
    `http://localhost:3001/api/v1/${type}?name=${supName}`
  );
  // console.log("heroes thingy", response.data.data);
  return response.data.data;
};
API.updateHeroes = async (type, id, update) => {
  console.log("id here:", id);
  const response = await axios.put(
    `http://localhost:3001/api/v1/${type}/${id}`,
    update
  );
  return response.data.data;
};
API.deleteHeroes = async (type, id) => {
  console.log("id here:", id);
  const response = await axios.delete(
    `http://localhost:3001/api/v1/${type}/${id}`
  );
  return response.data.data;
};
API.createHeroes = async (type) => {
  const response = await axios.create(`http://localhost:3001/api/v1/${type}`);
  return response.data.data;
};

export default API;
