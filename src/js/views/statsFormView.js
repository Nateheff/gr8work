import View from './View.js';

class StatsFormView extends View {
  _parentEl = document.querySelector('.none');

  enterInfoHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (e.target.closest('.add-stats') || e.target.closest('.edit-stats')) {
        const form = document.querySelector('.form-popup');
        form.style.display = 'block';
      }
    });
  }
}

export default new StatsFormView();
