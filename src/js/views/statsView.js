import View from './View.js';

class StatsView extends View {
  _parentEl = document.querySelector('.stats-basic');

  saveStatsHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (e.target.closest('.calculate')) {
        e.preventDefault();
        const weight = document.querySelector('.input-weight').value;
        const height = document.querySelector('.input-height').value;
        const sex = document.querySelector('.input-sex').value;
        const age = document.querySelector('.input-age').value;
        const activity = document.querySelector('.input-activity').value;

        const data = [weight, height, sex, age, activity];
        document.querySelector('.form-popup').style.display = 'none';

        handler(data);
      }

      if (e.target.closest('.fa-solid')) {
        document.querySelector('.form-popup').style.display = 'none';
      }
    });
  }

  displayStats(data, stats) {
    console.log(stats);
    const macro = Object.values(stats.macros);
    console.log(macro);
    const macros = macro.map(val => Math.ceil(val));
    console.log(macros);

    const markup = `
    <ul class="basic">
            <li class="basic-item">
                <span class="age">Age: ${data[3]}</span>
            </li>
            <li class="basic-item">
                <span class="sex">Sex: ${data[2]}</span>
            </li>
            <li class="basic-item">
                <span class="height">Height: ${data[1]}cm</span>
            </li>
            <li class="basic-item">
                <span class="weight">Weight: ${data[0]}kg</span>
            </li>
            <li class="basic-item">
                <span class="activity">Activity-Level: ${data[4]}</span>
            </li>
        </ul>

    </div>

    <div class="stats-body">
      
      <ul class="body">
        <li class="stat">
            <span class="stat-value">${stats.BMI}</span>
            <span class="stat-unit">Kg/m<sup>2</sup></span>
            <span class="stat-name">(BMI)</span>
        </li>
        <li class="stat">
            <span class="stat-value">${stats.dailyCalories}</span>
            <span class="stat-unit">Calories</span>
            <span class="stat-name">(Daily Calorie Requirements)</span>
        </li>
        <li class="stat">
          <span class="stat-value">${stats.bodyFat}</span>
          <span class="stat-unit">%</span>
          <span class="stat-name">(Body Fat Percentage)</span>
        </li>
        <li class="stat">
         <span class="stat-value">${stats.idealWeight}</span>
         <span class="stat-unit">Kg</span>
          <span class="stat-name">(Ideal Weight)</span>
       </li>
      </ul>
    </div>

    <h1 class="macros-head">Your Recommended Macros</h1>; 

<div class="stats-macros">
  <ul class="macros">
    <li class="stat">
      <span class="stat-value">${macros[0]}</span>
      <span class="stat-unit">g/day</span>
      <span class="stat-name">Protein</span>
    </li>
    <li class="stat">
      <span class="stat-value">${macros[2]}</span>
      <span class="stat-unit">g/day</span>
      <span class="stat-name">Carbs</span>
    </li>
   <li class="stat">
      <span class="stat-value">${macros[1]}</span>
      <span class="stat-unit">g/day</span>
      <span class="stat-name">Fats</span>
    </li>
    <li class="stat">
     <span class="stat-value"><  0</span>
      <span class="stat-unit">g/day</span>
     <span class="stat-name">Sugar (kidding)</span> 
    </li>
  </ul>
</div>  

<button class="edit-stats">Re-enter Info</button>

    
    `;
    // this.clear();

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new StatsView();

/* <h1 class="macros-head">Your Recommended Macros</h1>; */

/* <div class="stats-macros">
  <ul class="macros">
    <li class="stat">
      <span class="stat-value">70</span>
      <span class="stat-unit">g/day</span>
      <span class="stat-name">Protein</span>
    </li>
    <li class="stat">
      <span class="stat-value">100</span>
      <span class="stat-unit">g/day</span>
      <span class="stat-name">Carbs</span>
    </li>
   <li class="stat">
      <span class="stat-value">45</span>
      <span class="stat-unit">g/day</span>
      <span class="stat-name">Fats</span>
    </li>
    <li class="stat">
     <span class="stat-value"><  50</span>
      <span class="stat-unit">g/day</span>
     <span class="stat-name">sugar</span> 
    </li>
  </ul>
</div>  */
