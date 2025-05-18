import axios from 'axios';
import { rapidApiKey } from '../constants';

const baseUrl = 'https://exercisedb.p.rapidapi.com';

const apiCall = async (url, params = {}) => {
  try {
    const options = {
      method: 'GET',
      url,
      params,
      headers: {
        'x-rapidapi-key': rapidApiKey,
		    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log('Erro na API:', err.message);
    return [];
  }
};

export const fetchExercisesByBodyPart = async (bodyPart) => {
  return await apiCall(`${baseUrl}/exercises/bodyPart/${bodyPart}`);
};

export const fetchAllExercises = async () => {
  return await apiCall(`${baseUrl}/exercises`);
};

