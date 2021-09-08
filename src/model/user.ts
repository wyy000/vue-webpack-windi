import {ref} from 'vue'

const SUCCESS_CODE = 0

interface User {
  name: string
  id: string
  [key: string]: string
}

type userParams = {
  name: string
  password: string
}

export const userInfo = ref({})

export async function fetchUserInfo (params: userParams): Promise<User> {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(params),
  })
  const {code, data, message} = await res.json()

  if (code === SUCCESS_CODE) userInfo.value = data
  else throw new Error(`response error: error code is ${code}, ${message}`)

  return data
}