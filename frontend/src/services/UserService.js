import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export default {
  columns() {
    return { id: null, name: "", email: "", status: "" };
  },

  async getUsers() {
    const response = await api.get("/users?_sort=id&_order=desc");
    return response.data;
  },

  async saveUser(user) {
    const method = user.id ? "put" : "post";
    const url = user.id ? `/users/${user.id}` : "/users";
    const response = await api[method](url, user);
    return response.data;
  },

  async removeUser({ id }) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
