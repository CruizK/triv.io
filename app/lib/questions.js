import axios from './axios'


export function GetQuestion() {
  return axios.get('/questions/random');
}

export function GetSeededQuestion(seed, index) {
  return axios.get(`/questions/seed/${seed}/${index}`);
}