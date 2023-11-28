import { myAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const transferMoney = (accountId, balance) => {
  return myAxios.put(`/accounts/${accountId}`,balance).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return myAxios.get(`/users/${userId}`).then((resp) => resp.data);
};

export const loadAccount = (userId) => {
  return myAxios.get(`/user/${userId}/accounts`).then((r) => r.data);
};

export const loadAllAccount = () => {
  return myAxios.get(`/accounts`).then((response) => response.data);
};

