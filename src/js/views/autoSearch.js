import View from './View.js';

class AutoSearch extends View {
  _parentEl = document.querySelector('.options__list');

  autoHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const option = e.target.closest('.option');
      const name = option.querySelector('.option__btn-text').textContent;
      handler(name);
    });
  }
}

export default new AutoSearch();
