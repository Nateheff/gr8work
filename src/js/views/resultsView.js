import previewView from './previewView.js';
import View from './View.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');

  _generateMarkup() {
    this.clear();
    console.log(this._data);
    return this._data.map(ex => previewView.render(ex, '', false)).join('');
  }
}

export default new ResultsView();
