import {create} from 'apisauce'

const api = create({
  baseURL: 'http://localhost:5000/api' // 'https://thirtysixq.herokuapp.com/api'
});

export default api;
