import View from './View.js';
import previewView from './previewView.js';

class SavedExercisesView extends View {
  _parentEl = document.querySelector('.e');
  errorMessage =
    'No Exercises yet! Search for your favorite exercises and add them to your routine!';

  _generateMarkup() {
    this.clear();
    console.log(this._data);
    return this._data.map(ex => previewView.render(ex, '', false)).join('');
  }
}

export default new SavedExercisesView();
