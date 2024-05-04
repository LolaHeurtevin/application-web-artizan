import { useEffect, useState } from 'react'

const useFetch = (url, headers) => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const _response = await fetch(url, { headers })
        const _responseJSON = await _response.json()
        setResponse(_responseJSON.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setError(error)
        setIsLoading(false)
      }
    }
    getData()
  }, [url])

  return { response, error, isLoading }
}

export {
  useFetch
}
