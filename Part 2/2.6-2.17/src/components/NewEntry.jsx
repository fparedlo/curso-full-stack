const NewEntry = ({ onSubmit, valueName, onChangeName, valueTelf, onChangeNumber }) => {
  return (
    <main>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">name:</label>
        <input id="name" type="text" value={valueName} onChange={onChangeName} required />
        <label htmlFor="telf">Telephone:</label>
        <input id="telf" type="text" value={valueTelf} onChange={onChangeNumber} required />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </main>
  )
}

export default NewEntry;