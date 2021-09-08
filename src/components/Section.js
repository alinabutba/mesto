export default class Section {
  _renderer = null; // Хранит ссылку на функцию (колбэк)
  _containerSelector = null; // Хранит dom узел, в который будет вставляться обработанные данные _data

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(cards) {
    // Подготавливает массив данных, обработав их колбэком _renderer
    cards.forEach((element) => {
      this._renderer(element);
    });
  }

  addItem(element, isAppend = true) {
    // Производит вставку элемента element в узел _containerSelector
    if (isAppend) {
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
    }
  }
}
