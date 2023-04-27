import View from './View.js';

class changeStats extends View {
  _parentEl = document.querySelector('.stats-basic');

  changeHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      if (e.target.closest('.edit-stats')) {
        const form = `<div class="form-popup">
        <form class="input-stats">
          <i class="fa-solid fa-xmark"></i>
          <h1 class="input-head">Input Your Information</h1>
          <label for="weight"><b>Weight</b></label>
          <input class="input-weight"type="text" placeholder="Kg" required>
          <label for="height"><b>Height</b></label>
          <input class="input-height"type="text" placeholder="Cm" required>
          <label for="Sex"><b>Sex</b></label>
          <select class="input-sex" required>

            <option value="male">Male</option>
            <option vlaue="female">Female</option>
          </select>
          <label for="age"><b>Age</b></label>
          <input class="input-age"type="text"  required>
          <label for="activity-level"><b>Activity Level</b></label>
          <input class="input-activity"type="text" placeholder="1 - 7" required>

          <button class="calculate">Calculate My Stats</button>


        </form>
      </div>`;

        document
          .querySelector('.stats-basic')
          .insertAdjacentHTML('afterbegin', form);
        const ask = document.querySelector('.form-popup');
        ask.style.display = 'block';
      }
    });
  }
}

export default new changeStats();
