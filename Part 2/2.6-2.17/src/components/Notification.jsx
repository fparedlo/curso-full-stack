const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const messageStyle = {
    color: 'white',
    background: 'green',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -30,
  }
  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification;