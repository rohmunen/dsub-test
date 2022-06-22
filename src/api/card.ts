import axios from 'axios'

type Data = {
  cardNumber: string,
  expDate: string,
  CVV: string,
  amount: string,
}

export const cardPost = (data: Data) => {
  axios.post('http://localhost:3000/api/hello', data)
}
