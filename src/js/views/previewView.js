import View from './View.js';

class PreviewView extends View {
  _parentEl = '';

  _generateMarkup() {
    console.log(this._data);
    return `
    <ul class="exercises">
          
      <li class="exercise" data-saved=${this._data.saved}>
        
        <div class="a">
          <h2 class="workout__title">${this.capitalize(this._data.name)}</h2>
          <button class="add">
            <i class="fas fa-square-plus"></i>
          </button>
          ${
            this._data.saved === true
              ? `<button class="minus">
          <i class="fa-regular fa-square-minus"></i>
        </button>'`
              : ''
          }
          
          
        </div>
        <div class="instructions">
         <span class=instructions-label>Instructions</span>

         <ul class=instructions-content>${this._data.instructions}</ul>
        </div>
        <div class="workout_details">
        <div class="workout__detail">
            <span class="workout__icons">Difficulty:</span>
            <span class="workout__difficulty"> ${this.capitalize(
              this._data.difficulty
            )}</span>
            
          </div>
          <div class="workout__detail">
            <span class="workout__icon">💪</span>
            <span class="workout__value">${this._data.weight || 'N/A'}</span>
            <span class="workout__unit">Kg</span>
          </div>
          <div class="workout__detail">
            <span class="workout__icon">🏋</span>
            <span class="workout__value">${
              this._data.reps ? this._data.reps : 'N/A'
            }</span>
            <span class="workout__unit">Reps</span>
          </div>
          <div class="workout__detail">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${
              this._data.sets ? this._data.sets : 'N/A'
            }</span>
            <span class="workout__unit">Sets</span>
          </div>
        </div>
        
        
      </li>

    </ul> 
    `;
  }
}

export default new PreviewView();
