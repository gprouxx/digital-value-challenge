import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import isEqual from 'date-fns/isEqual'
import parseISO from 'date-fns/parseISO'
import locale from 'date-fns/locale/fr'

export function formatDate (date, formatStr) {
  if (date == null) {
    return ''
  }

  if (formatStr == null) {
    formatStr = 'dd/MM/yyyy'
  }

  if (typeof date === 'string') {
    date = parseISO(date)
  }

  return format(date, formatStr, locale)
}

export function dateIsBeforeOrEquals (date1, date2) {
  if (date1 == null || date2 == null) {
    return false
  }

  if (typeof date1 === 'string') {
    date1 = parseISO(date1)
  }

  if (typeof date2 === 'string') {
    date2 = parseISO(date2)
  }

  return isBefore(date1, date2) || isEqual(date1, date2)
}
