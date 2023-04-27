import View from './View.js';

class Saved extends View {
  constructor() {
    super();
    this._parentEl = document.querySelector('.e');
  }
}

export default new Saved();
