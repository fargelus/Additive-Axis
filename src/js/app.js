const $ = require('jquery');

class View {
  constructor() {
    this.a = View.getRandom(6, 9);
    this.res = View.getRandom(11, 14);
    this.b = this.res - this.a;

    this.terms = document.getElementsByClassName('term');
    this.termIndex = 0;
    this.summator = 0;

    this.terms[0].value = this.a;
    this.terms[1].value = this.b;

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

  static getRandom(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  validate(inputObj) {
    const inputValue = inputObj.value;
    const currentTerm = this.terms[this.termIndex];

    const inputObjRef = inputObj;
    if (inputValue === currentTerm.value) {
      this.summator += inputValue;
      if (this.summator === this.res) {
        console.log('Right');
      } else {
        inputObjRef.disabled = true;
        this.showNextArc(inputObj);
      }
    } else {
      inputObjRef.style.color = 'red';
      currentTerm.style.backgroundColor = 'orange';
    }
  }

  showNextArc(obj) {
    const $inputs = $(this.svg).find('input');
    let visibleInputIndex;
    $inputs.each((index, elem) => {
      if (elem === obj) visibleInputIndex = index;
    });

    // shadow elements
    const arcs = this.svg.getElementsByClassName('arc');
    const nextArc = arcs[visibleInputIndex + 1];
    const inputObjects = this.svg.getElementsByClassName('inputObject');
    const nextInput = inputObjects[visibleInputIndex + 1];

    nextArc.style.display = 'block';
    nextInput.style.display = 'block';
  }

  hideArcsExceptFirst() {
    const childrens = this.svg.children;
    const len = this.svg.childElementCount;

    for (let i = 4; i < len; i += 1) {
      const elem = childrens[i];
      elem.style.display = 'none';
    }
  }
}

window.addEventListener('load', new View());
