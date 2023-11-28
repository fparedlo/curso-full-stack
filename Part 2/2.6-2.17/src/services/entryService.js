import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const dataFetch = async () => {
  try {
    const request = await axios.get(`${baseUrl}`)
    const response = await request.data
    return response
  } catch (e) {
    console.log(e)
  }
}

const addEntry = async (entry) => {
  try {
    const request = await axios.post(baseUrl, { ...entry, id: crypto.randomUUID() })
    const response = await request
    return response
  } catch (e) {
    const data = await dataFetch()
    return { message: `There was a problem adding this entry`, status: 409, data}
  }
}

const removeEntry = async (id, name) => {
  try {
    const request = await axios.delete(`${baseUrl}/${id}`)
    if (request.status === 200) {
      const data = await dataFetch()
      return { message: `${name} has been removed`, status: 200, data}
    }
  } catch (e) {
    const data = await dataFetch()
    return { message: `${name} is not registered anymore!`, status: 404, data}
  }
}

const updateEntry = async (id, newObject) => {
  try {
    const request = await axios.put(`${baseUrl}/${id}`, { ...newObject , id })
    const response = await request
    return response
  } catch (e) {
    const data = await dataFetch()
    return { message: `${newObject.name} is not registered any more!`, status: 409, data}
  }
}

const isDuplicatedEntry = (entries, entryObject) => {
  if (
    isDuplicatedName(entries, entryObject) &&
    isDuplicatedNumber(entries, entryObject)
  ) {
    return true
  }
  return false
}

const isDuplicatedName = (entries, entryObject) => {
  const duplicated = entries.filter(entry => entry.name.toLowerCase() === entryObject.name.toLowerCase())
  if (duplicated.length > 0) {
    return true
  }
  return false
}

const isDuplicatedNumber = (entries, entryObject) => {
  const duplicated = entries.filter(entry => entry.number.toLowerCase() === entryObject.number.toLowerCase())
  if (duplicated.length > 0) {
    return true
  }
  return false
}


export default { dataFetch, addEntry, removeEntry, updateEntry, isDuplicatedEntry, isDuplicatedName, isDuplicatedNumber }
