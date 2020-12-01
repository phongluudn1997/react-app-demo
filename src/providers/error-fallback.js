const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.response ? error.response.data.message : error.message}</pre>
    </div>
  )
}

export default ErrorFallback
