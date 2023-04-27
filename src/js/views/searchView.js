import View from './View.js';

class SearchView extends View {
  _parentEL = document.querySelector('.search');
  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
