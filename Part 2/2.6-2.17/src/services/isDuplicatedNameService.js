const isDuplicatedNameService = (entries, entryObject) => {
  const duplicated = entries.filter(entry => entry.name.toLowerCase() === entryObject.name.toLowerCase())
  if (duplicated.length > 0) {
    return true
  }
  return false
}


export default isDuplicatedNameService