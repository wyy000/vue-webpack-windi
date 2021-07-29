import {format as _format} from 'date-fns'

export function format (date: any, format = 'yyyy-MM-dd', options?: any) {
  if (!(date instanceof Date)) return ''
  return _format(date, format, options)
}

