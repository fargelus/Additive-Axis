class View {
  constructor() {
    this.a = View.getRandom(6, 9);
    this.sum = View.getRandom(11, 14);
    this.b = this.sum - this.a;

    const terms = document.getElementsByClassName('term');
    const [firstTerm, secondTerm] = terms;

    firstTerm.value = this.a;
    secondTerm.value = this.b;
  }

  static getRandom(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }
}

window.addEventListener('load', new View());
