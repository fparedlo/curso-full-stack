import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const initialDataFetch = async() => {
  try{
    const request = await axios.get(`${baseUrl}`)
    const response = await request.data
    return response
  }catch(e){
    console.log(e)
  }
}

const addEntry = async (entry) => {
  try{
    const request = await axios.post(baseUrl, entry)
    const response = await request.data
    return response
  }catch(e){
    console.log(e)
  }
}

const removeEntry = async (id) => {
  try {
    const request = await axios.delete(`${baseUrl}/${id}`)
    const response = await request
    return response
  }catch(e){
    console.log(e)
  }
}

export default { initialDataFetch, addEntry, removeEntry }
