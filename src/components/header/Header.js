class Header {
  constructor(element) {
    this.header = element
    this._init()
  }

  _init() {
    this._getDomElements()
    this._addListeners()
  }

  _getDomElements() {
    this.burger = this.header.querySelector('.header__burger')
    this.content = this.header.querySelector('.header__content')
    this.backdrop = this.header.querySelector('.header__backdrop')
  }

  _addListeners() {
    this.burger.addEventListener('click', this._handleBurgerClick.bind(this))
    this.backdrop.addEventListener('click', this._handleBackdropClick.bind(this))
    window.addEventListener('resize', this._handleWindowResize.bind(this))
  }

  _handleBurgerClick() {
    this.content.classList.toggle('_activated')
    this.backdrop.classList.toggle('_activated')
  }

  _handleBackdropClick() {
    this.content.classList.remove('_activated')
    this.backdrop.classList.remove('_activated')
  }

  _handleWindowResize() {
    this.content.classList.remove('_activated')
    this.backdrop.classList.remove('_activated')
  }
}

export default Header
