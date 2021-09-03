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
  const {code, data} = await res.json() as Response
  if (code === SUCCESS_CODE) list.value = data
  else throw Error(`response error: error code is ${code}`)

  return list.value
}

