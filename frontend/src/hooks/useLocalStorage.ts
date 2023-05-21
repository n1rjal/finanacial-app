import { useEffect, useState } from 'react'

const getSavedValue = <T>(key: string, initValue: T) => {
  const savedValue = localStorage.getItem(key)

  if (savedValue) {
    try {
      return JSON.parse(savedValue) as T
    } catch (e) {
      return savedValue as T
    }
  }
  return initValue
}

const useLocalStorage = <T>(
  key: string,
  initValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState(() => getSavedValue(key, initValue))
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data, key])

  return [data, setData]
}

export default useLocalStorage
