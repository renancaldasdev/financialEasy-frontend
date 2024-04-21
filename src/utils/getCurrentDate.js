export function getCurrentDate() {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  const monthIndex = today.getMonth()
  const month = months[monthIndex]

  const year = today.getFullYear()

  return `${day} de ${month} de ${year}`
}
