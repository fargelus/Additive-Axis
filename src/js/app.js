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
    const inputOffsetX = arcBegin / 2;
    arcLen = arcBegin + distanceBetweenNumbers *
                   this.b;
    this.drawArc(arcBegin, arcLen, inputOffsetX, 30);
  }

  drawArc(arcBegin, arcLen, inputOffsetX = 0, inputOffsetY = 0) {
    const arc = `<path d="M${arcBegin},220 A25,15 0 0,1 ${arcLen},220"
    fill="transparent"
    stroke="black" stroke-width="3"
    marker-end="url(#arrow-head)"/>`;
    this.svg.insertAdjacentHTML('beforeend', arc);

    const input = `<foreignObject x="${inputOffsetX + arcLen / 2}"
                    y="${85 + inputOffsetY}" width="10" height="10">
                     <div xmlns="http://www.w3.org/1999/xhtml">
                       <input type="text"></input>
                     </div>
                   </foreignObject>`;

    this.svg.insertAdjacentHTML('beforeend', input);
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
