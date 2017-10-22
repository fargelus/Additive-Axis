const $ = require('jquery');

class View {
  constructor() {
    // получить два случайных числа
    // рассчитать их сумму
    this.a = View.getRandom(6, 9);
    this.res = View.getRandom(11, 14);
    this.b = this.res - this.a;

    // terms -- outputs для чисел в DOM
    this.terms = document.getElementsByClassName('term');
    this.termIndex = 0;
    this.summator = 0;

    // Записываем случайные зн-я в DOM outputs
    this.terms[0].value = this.a;
    this.terms[1].value = this.b;

    // Сохраним ссылку на результат
    [this.resOutput] = document.getElementsByClassName('result');

    [this.svg] = document.getElementsByClassName('svg');

    // рендер арок
    let arcBegin = 35;
    const distanceBetweenNumbers = 39;
    let arcLen = arcBegin + distanceBetweenNumbers *
                   this.a;
    this.drawArc(arcBegin, arcLen);

    arcBegin = arcLen;
    arcLen = arcBegin + distanceBetweenNumbers *
                   this.b;
    this.drawArc(arcBegin, arcLen);

    this.hideArcsExceptFirst();
  }

  /* Desc: Рисует дугу вместе с полем ввода
     Input(arcBeginX -> Number, arcLen -> Number):
         arcBeginX -- к-та начала дуги по оси абсцисс
         arcLen -- длина дуги(конечная к-та по оси абсцисс)
                   расчитывается при помощи зн-я текущего
                   слагаемого
     Output(undefined) */
  drawArc(arcBeginX, arcLen) {
    // рисуем арку
    const arcBeginY = 220;
    const arc = `<path d="M${arcBeginX},${arcBeginY}
                          A25,15 0 0,1 ${arcLen},${arcBeginY}"
                       fill="transparent" class="arc"
                       stroke="black" stroke-width="3"
                       marker-end="url(#arrow-head)"/>`;
    this.svg.insertAdjacentHTML('beforeend', arc);

    // Получить высоту текущей дуги(только что отрисованной)
    const childCount = this.svg.children.length;
    const path = this.svg.children[childCount - 1];
    const arcHeigt = path.getBoundingClientRect().height;

    // расчет смещения input
    const inputStartY = arcBeginY - arcHeigt - 30;

    // рендер инпута
    const input = `<foreignObject x="${(arcLen - arcBeginX) / 2
                                        + arcBeginX - 10}"
                    y="${inputStartY}" width="10" height="10"
                    class="inputObject">
                     <div xmlns="http://www.w3.org/1999/xhtml">
                       <input type="text"></input>
                     </div>
                   </foreignObject>`;
    this.svg.insertAdjacentHTML('beforeend', input);

    // Вешаем обработчик события onchange на наш инпут
    const svgInputs = this.svg.getElementsByTagName('input');
    svgInputs[svgInputs.length - 1].onchange = (evt) => {
      this.validate(evt.currentTarget);
    };
  }

  /* Desc: Получить случайное число из диапазона [min, max]
     Input(min -> Number, max -> Number)
     Output(rand -> Number) */
  static getRandom(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  /* Desc: Обработчик события ввода слагаемых в соотвествующие
           текстовые поля
     Input(inputObj -> DOMNode):
           inputObj -- Текстовое поле сгенерирующее событие
     Output(undefined) */
  validate(inputObj) {
    const inputValue = inputObj.value;
    // текущее слагаемое
    const currentTerm = this.terms[this.termIndex];

    const inputObjRef = inputObj;
    if (inputValue === currentTerm.value) {
      this.summator += (+inputValue);

      currentTerm.style.backgroundColor = 'transparent';
      inputObjRef.style.fontSize = '20px';

      View.transformInputToNumber(inputObjRef);

      if (this.summator === this.res) {
        this.showResult();
      } else {
        // проверка следующего слагаемого
        this.termIndex += 1;
        this.showNextArc(inputObj);
      }
    } else {
      // информирование пол-ля об ошибке
      inputObjRef.style.color = 'red';
      currentTerm.style.backgroundColor = 'orange';
    }
  }

  /* Desc: Преобразование текстового поля в число
     Input(input -> DOMNode):
           input -- Текстовое поле с правильным ответом
     Output(undefined) */
  static transformInputToNumber(input) {
    const inputRef = input;
    inputRef.disabled = true;
    inputRef.style.color = 'black';
    inputRef.style.border = 'none';
    inputRef.style.backgroundColor = 'transparent';
  }

  /* Desc: Замена знака вопроса текстовым полем для ввода
     Input(undefined)
     Output(undefined) */
  showResult() {
    this.resOutput.innerHTML = '<input type="text">';
    const input = this.resOutput.getElementsByTagName('input')[0];
    input.onchange = (evt) => {
      const current = evt.currentTarget;
      const val = current.value;
      if (val - this.res === 0) {
        View.transformInputToNumber(current);
      } else {
        current.style.color = 'red';
      }
    };
  }

  /* Desc: Показать следующую дугу вместе с полем для ввода
     Input(obj -> DOMNode):
           obj -- Текстовое поле с правильным ответом
     Output(undefined) */
  showNextArc(inputObj) {
    // находим индекс переданного инпута
    const $inputs = $(this.svg).find('input');
    let visibleInputIndex;
    $inputs.each((index, elem) => {
      if (elem === inputObj) visibleInputIndex = index;
    });

    // shadow elements
    const arcs = this.svg.getElementsByClassName('arc');
    const nextArc = arcs[visibleInputIndex + 1];
    const inputObjects = this.svg.getElementsByClassName('inputObject');
    const nextInput = inputObjects[visibleInputIndex + 1];

    nextArc.style.display = 'block';
    nextInput.style.display = 'block';
  }

  /* Desc: Скрыть все поля/дуги кроме первой
     Input(undefined)
     Output(undefined) */
  hideArcsExceptFirst() {
    const $arcs = $(this.svg).find('.arc');
    $arcs.each((index, elem) => {
      if (index > 0) {
        const elemRef = elem;
        elemRef.style.display = 'none';
      }
    });

    const $inputs = $(this.svg).find('.inputObject');
    $inputs.each((index, elem) => {
      if (index > 0) {
        const elemRef = elem;
        elemRef.style.display = 'none';
      }
    });
  }
}

window.addEventListener('load', new View());
