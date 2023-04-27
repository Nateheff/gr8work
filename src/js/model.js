import { AJAX } from './helpers.js';
import { RES_PER_PAGE } from './config.js';
export const state = {
  exercise: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  stats: {},
  saved: [],
  basics: {},
};

const createExerciseObject = function (...data) {
  const [e] = data;
  const [exercise] = e;

  return {
    muscle: exercise.muscle,
    name: exercise.name,
    difficulty: exercise.difficulty,
    instructions: exercise.instructions,
  };
};

const saveExercises = function () {
  localStorage.setItem('exercises', JSON.stringify(state.saved));
};

export const loadResults = async function (query) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '952f86df6dmsha6dbac1e00a077ap1f227fjsna9e34fad9463',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com',
      },
    };

    const data = await AJAX(
      `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${query}`,
      options
    );
    state.exercise = createExerciseObject(data);

    state.search.results = data.map(ex => {
      return {
        name: ex.name,
        muscle: ex.muscle,
        difficulty: ex.difficulty,
        instructions: ex.instructions,
      };
    });
    console.log(state.search.results);
    if (state.saved.length > 0) {
      const nameRes = state.search.results.map(ex => ex.name);
      const nameSaved = state.saved.map(ex => ex.name);
      const overlap = nameRes.filter(ex => nameSaved.includes(ex));
      const resIndex = [];
      state.search.results.forEach((ex, i) => {
        if (overlap.includes(ex.name)) {
          resIndex.push(i);
        } else return;
      });
      const savedIndex = [];

      state.saved.forEach((ex, i) => {
        if (overlap.includes(ex.name)) {
          savedIndex.push(i);
        }
      });
      console.log(savedIndex, resIndex);
      resIndex.forEach((ex, i) =>
        state.search.results.splice(ex, 1, state.saved[savedIndex[i]])
      );
    }
  } catch (err) {
    throw new Error(
      'No exercises found with that name! Please try a different name'
    );
  }
};

export const removeExercise = function (ex) {
  const exName = ex.querySelector('.workout__title').textContent;
  const exIndex = state.saved.findIndex(
    ex => ex.name.toLowerCase() == exName.toLowerCase()
  );
  state.saved.splice(exIndex, 1);
  ex.saved = undefined;
  saveExercises();
};

export const loadPageResults = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  console.log(start, end);

  return state.search.results.slice(start, end);
};

export const addExercises = function (exercise) {
  console.log(exercise);
  const exName = exercise.querySelector('.workout__title').textContent;
  const weight = +exercise.querySelector('.input__field0').value;
  const reps = +exercise.querySelector('.input__field1').value;
  const sets = +exercise.querySelector('.input__field2').value;
  const inp1 = exercise.querySelector('.input__field0');
  const inp2 = exercise.querySelector('.input__field1');
  const inp3 = exercise.querySelector('.input__field2');

  const inputs = [weight, reps, sets];
  const inps = [inp1, inp2, inp3];

  const exIndex = state.search.results.findIndex(
    ex => ex.name.toLowerCase() == exName.toLowerCase()
  );
  const ex = state.search.results[exIndex];
  ex.weight = weight;
  ex.reps = reps;
  ex.sets = sets;

  const allPositive = (...inputs) => inputs.every(inp => inp > 0);

  //   if (!allPositive(inputs)) console.log('no');
  if (!allPositive(weight, reps, sets)) {
    alert(`Please input a positive number into each field!`);
    return;
  }
  const icon = exercise.querySelectorAll('.workout__icon');

  icon.forEach((icon, i) =>
    icon.insertAdjacentHTML(
      'afterend',
      `
      <span class="workout__value">${inputs[i]}</span>

  `
    )
  );

  inps.forEach(inp => inp.remove());
  const savedIndex = state.saved.findIndex(
    ex => ex.name.toLowerCase() == exName.toLowerCase()
  );
  console.log(savedIndex);
  if (savedIndex === -1) {
    state.saved.push(ex);
  }
  // state.saved.push(ex);
  ex.saved = true;
  console.log(exercise);
  saveExercises();
};

export const deleteExercise = function (name) {
  const index = state.saved.indexOf(x => x.name == name);

  state.saved.splice(index, 1);

  saveExercises();
};

export const spanSwitch = function (ex) {
  console.log(ex);
  const value = ex.querySelectorAll('.workout__value');
  const icon = ex.querySelectorAll('.workout__icon');
  const after = ex.querySelector('.instructions');
  const add = ex.querySelector('.add');
  add.remove();

  const submit = `
    <div class="submit">
    <button class="sub">Save</button>
    </div>
`;

  value.forEach(val => val.remove());
  icon.forEach((icon, i) =>
    icon.insertAdjacentHTML(
      'afterend',
      `
    <input 
    type="text"
    class="input__field input__field${i}"
    placeholder="___"
  />
`
    )
  );
  after.insertAdjacentHTML('afterend', submit);
};

const saveStats = function () {
  localStorage.setItem('stats', JSON.stringify(state.stats));
};

export const deleteStats = function () {
  state.stats = {};
  saveStats();
};

const createStatsObject = function (...data) {
  const [d] = data;

  return {
    weight: d[0],
    height: d[1],
    sex: d[2],
    age: d[3],
    activity: d[4],
  };
};

export const getStats = async function (data) {
  try {
    const stats = createStatsObject(data);
    console.log(stats);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '952f86df6dmsha6dbac1e00a077ap1f227fjsna9e34fad9463',
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      },
    };

    const dailyC = await AJAX(
      `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${stats.age}&gender=${stats.sex}&height=${stats.height}&weight=${stats.weight}&activitylevel=level_${stats.activity}`,
      options
    );

    const BM = await AJAX(
      `https://fitness-calculator.p.rapidapi.com/bmi?age=${stats.age}&weight=${stats.weight}&height=${stats.height}`,
      options
    );

    const macro = await AJAX(
      `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${stats.age}&gender=${stats.sex}&height=${stats.height}&weight=${stats.weight}&activitylevel=${stats.activity}&goal=maintain`,
      options
    );

    const bodyF = await AJAX(
      `https://fitness-calculator.p.rapidapi.com/bodyfat?age=${stats.age}&gender=${stats.sex}&weight=${stats.weight}&height=${stats.height}&neck=50&waist=96&hip=92`,
      options
    );

    const idealW = await AJAX(
      `https://fitness-calculator.p.rapidapi.com/idealweight?gender=${stats.sex}&height=${stats.height}`,
      options
    );

    const dailyCa = dailyC.data.goals;
    const dailyCalorie = dailyCa['maintain weight'];

    const BMI = BM.data.bmi;

    const macros = macro.data.balanced;

    const bodyFat = bodyF.data['Body Fat (U.S. Navy Method)'];

    const idealWeight = idealW.data.Robinson;

    state.stats = {
      dailyCalories: dailyCalorie,
      BMI: BMI,
      macros: macros,
      bodyFat: bodyFat,
      idealWeight: idealWeight,
    };

    saveStats();
  } catch (err) {
    alert(
      'Please input positive numbers and make sure activity level is between 1 - 7!'
    );
    throw new Error('Invalid inputs', err);
  }
};
