export default class Section {
  _data = null; // Хранит набор данных
  _renderer = null; // Хранит ссылку на функцию (колбэк)
  _containerSelector = null; // Хранит dom узел, в который будет вставляться обработанные данные _data

  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  setItem() {
    // Подготавливает массив данных, обработав их колбэком _renderer
    this._data.forEach((element) => {
      // console.log(element);
      this._renderer(element);
    });
  }

  addItem(element) {
    // Производит вставку элемента element в узел _containerSelector
    this._containerSelector.prepend(element);
  }
}
