class View {
  constructor() {
    this.a = View.getRandom(6, 9);
    this.res = View.getRandom(11, 14);
    this.b = this.res - this.a;

    const terms = document.getElementsByClassName('term');
    const [firstTerm, secondTerm] = terms;

    firstTerm.value = this.a;
    secondTerm.value = this.b;

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
  }

  drawArc(arcBeginX, arcLen) {
    // рисуем арку
    const arcBeginY = 220;
    const arc = `<path d="M${arcBeginX},${arcBeginY}
                          A25,15 0 0,1 ${arcLen},${arcBeginY}"
                       fill="transparent"
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
                    y="${inputStartY}" width="10" height="10">
                     <div xmlns="http://www.w3.org/1999/xhtml">
                       <input type="text"></input>
                     </div>
                   </foreignObject>`;
    this.svg.insertAdjacentHTML('beforeend', input);

    // Вешаем обработчик события onchange на наш инпут
    const svgInputs = this.svg.getElementsByTagName('input');
    svgInputs[svgInputs.length - 1].onchange = this.validate;
  }

  static getRandom(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  validate() {}
}

window.addEventListener('load', new View());
