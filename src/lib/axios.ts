import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dadosabertos.camara.leg.br/api/v2',
})
