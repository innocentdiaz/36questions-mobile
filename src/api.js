import {create} from 'apisauce'

baseURL = process.env.NODE_ENV == 'production' ? 'https://thirtysixq.herokuapp.com/api' : 'http://localhost:5000/api'

const api = create({
  baseURL 
});

export default api;
