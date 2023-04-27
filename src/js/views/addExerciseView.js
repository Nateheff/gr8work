import View from './View.js';

class AddExerciseView extends View {
  _parentEl = document.querySelector('.results');

  fixLook(ex) {
    const sub = ex.querySelector('.submit');
    const after = ex.querySelector('.workout__title');
    sub.remove();

    const add = `<button class="add">
    <i class="fas fa-square-plus"></i>
  </button>
  <button class="minus">
    <i class="fa-regular fa-square-minus"></i>
  </button>`;

    after.insertAdjacentHTML('afterend', add);
  }
}

export default new AddExerciseView();
