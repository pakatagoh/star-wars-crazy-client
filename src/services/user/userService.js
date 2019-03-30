import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const getUrl = isDev => {
  return isDev ? 'http://localhost:8080' : 'https://api-starwarscrazy.herokuapp.com';
};
const baseURL = getUrl(isDev);

const userApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const getUserEvents = async id => {
  try {
    const response = await userApi.get(`/v1/users/events`);
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};
