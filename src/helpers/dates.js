import { format, parseISO } from 'date-fns'

export const convertDate = (dateString) => format(parseISO(dateString), 'yyyy-MMM-dd | HH:mm')
