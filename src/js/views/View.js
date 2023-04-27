export default class View {
  _data;
  _parentEl;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log('render no work');
    }

    this._data = data;
    console.log(this._data);

    const markup = this._generateMarkup();

    if (!markup) throw new Error('No Exericses!');

    if (!render) return markup;

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentEl.innerHTML = '';
  }

  capitalize(sentence) {
    return sentence
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  addAddHandler(handler) {
    console.log(this._parentEl);
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const ex = e.target.closest('.exercise');

      const add = e.target.closest('.add');
      if (add) {
        handler(ex);
      }

      if (!add) {
      }
    });
  }

  addSaveHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.closest('.submit')) {
        const ex = e.target.closest('.exercise');
        if (!ex) return;

        handler(ex);
      } else return;
    });
  }

  addRemoveHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.closest('.minus')) {
        const ex = e.target.closest('.exercise');
        console.log(ex);
        const minus = ex.querySelector('.minus');
        minus.remove();
        handler(ex);
      }
    });
  }

  renderButton() {
    const addStats = `
    <button class="add-stats">Enter Info</button>
    `;
    const after = document.querySelector('.none');

    const stats = document.querySelector('.basic');
    console.log(stats);
    if (!stats) {
      after.insertAdjacentHTML('beforeend', addStats);
    }
  }
}
