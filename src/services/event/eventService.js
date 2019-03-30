import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const getUrl = isDev => {
  return isDev ? 'http://localhost:8080' : 'https://api-starwarscrazy.herokuapp.com';
};
const baseURL = getUrl(isDev);

const eventApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const getEvent = async id => {
  try {
    const response = await eventApi.get(`/v1/events/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};

export const getEvents = async () => {
  try {
    const response = await eventApi.get('/v1/events');
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};

export const createEvent = async data => {
  try {
    const response = await eventApi.post('/v1/events', data);
    return response;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};

export const updateEventAttendance = async id => {
  try {
    const response = await eventApi.patch(`/v1/events/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};

export const updateEvent = async (id, values) => {
  try {
    const response = await eventApi.put(`/v1/events/${id}`, values);
    console.log('the updated event', response.data);
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};
