import axios from 'axios'
export default ({
  method,
  url,
  withCredentials,
  params
}) => {
  return axios({
      method,
      url,
      withCredentials:false,
      params
      
    })
    .then((result) => {
      return result.data
    })
    .catch((errot) => {
      return errot
    })
}