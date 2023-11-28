const Notification = ({ message, errorType }) => {

  if (message === null) {
    return null
  }

  const error = errorType;

  const successMessage = {
    color: 'white',
    background: 'green',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -30,
  }

  const errorMessage = {
    ...successMessage,
    background: 'red',
  }

  return (
    <div style={error ? errorMessage :successMessage }>
      {message}
    </div>
  )
}

export default Notification;