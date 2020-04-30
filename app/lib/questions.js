import axios from './axios'


export function GetQuestion() {
  return axios.get('/questions/random');
}