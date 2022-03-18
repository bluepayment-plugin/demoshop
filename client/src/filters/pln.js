export default function (value) {
  if (!value) {
    return '-'
  }
  console.log('v', value)
  return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',')} PLN`
}
