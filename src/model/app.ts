import {ref} from 'vue'
import {serialize} from '../utils'

interface ListItem {
  id: {
    [key: string]: string
  }
}

export const list = ref<ListItem[]>([])

interface Response {
  code: number
  data: any
  message?: string
}

const SUCCESS_CODE = 0

type ListParams = {
  pageNum: number
  pageSize: number
  keyWord: string | number
}
export async function fetchList (params: ListParams): Promise<ListItem[]> {
  params = Object.assign({pageNum: 1, pageSize: 10}, params)

  const res = await fetch(`/api/shop${serialize(params)}`)
  const {code, data, message} = await res.json() as Response
  if (code === SUCCESS_CODE) list.value = data
  else throw Error(`response error: error code is ${code}, ${message}`)

  return list.value
}

type Shop = {
  id: string
  name: string
}
export async function updateShop (params: Shop): Promise<Shop> {
  const res = await fetch(`/api/shop/${params.id}${serialize(params)}`, {
    method: 'put',
    body: JSON.stringify(params),
  })
  const {code, data, message} = await res.json() as Response
  if (code === SUCCESS_CODE) {
    const index = list.value.findIndex(it => it.id === data.id)
    list.value[index] = data
  }
  else throw Error(`response error: error code is ${code}, ${message}`)

  return data
}

export async function deleteShop (id: string): Promise<boolean> {
  const res = await fetch(`/api/shop/${id}`, {
    method: 'delete',
  })
  const {code, message} = await res.json() as Response
  if (code === SUCCESS_CODE) {
    const index = list.value.findIndex(it => it.id)
    list.value.splice(index, 1)
  }
  else throw Error(`response error: error code is ${code}, ${message}`)

  return true
}

export async function createShop (params: {[key: string]: string}): Promise<Shop> {
  const res = await fetch('/api/shop', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(params),
  })
  const {code, data, message} = await res.json() as Response
  if (code === SUCCESS_CODE) {
    list.value.push(data)
  }
  else throw Error(`response error: error code is ${code}, ${message}`)

  return data
}