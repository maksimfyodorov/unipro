import Header from './Header'

const headers = document.querySelectorAll('.header')

headers.forEach(header => {
  new Header(header)
})
