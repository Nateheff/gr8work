import View from './View.js';

class ScrollView extends View {
  _parentEl = document.querySelector('.nav');

  addScrollHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      if (e.target.closest('.nav__btn--body-stats')) {
        const target = document.querySelector('.stats-head');
        handler(target);
      }

      if (e.target.closest('.nav__btn--bookmarks')) {
        const target = document.querySelector('.e');
        handler(target);
      }
    });
  }

  scroll(target) {
    const rec = target.getBoundingClientRect();
    console.log(rec.top);
    scrollTo({
      top: rec.top,
      left: 0,
      behavior: 'smooth',
    });
  }
}

export default new ScrollView();
