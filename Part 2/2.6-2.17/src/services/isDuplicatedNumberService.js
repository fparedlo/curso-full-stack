const isDuplicatedNumberService = (entries, entryObject) => {
  const duplicated = entries.filter(entry => entry.number.toLowerCase() === entryObject.number.toLowerCase())
  if (duplicated.length > 0) {
    return true
  }
  return false
}


export default isDuplicatedNumberService