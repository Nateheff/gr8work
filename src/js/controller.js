import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import workoutInputView from './views/workoutInputView.js';
import addExerciseView from './views/addExerciseView.js';
import removeExerciseView from './views/removeExerciseView.js';
import savedExercisesView from './views/savedExercisesView.js';
import saved from './views/saved.js';
import autoSearch from './views/autoSearch.js';
import statsFormView from './views/statsFormView.js';
import statsView from './views/statsView.js';
import changeStats from './views/changeStats.js';
import scrollView from './views/scrollView.js';

import 'core-js/stable';
import previewView from './views/previewView.js';

const searchController = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  await model.loadResults(query);
  console.log(model.state.saved);

  resultsView.render(model.state.search.results);
};

const addExerciseController = function (ex) {
  model.spanSwitch(ex);
};

const SaveController = function (ex) {
  model.addExercises(ex);

  addExerciseView.fixLook(ex);
  savedExercisesView.render(model.state.saved);
};

const removeController = function (ex) {
  model.removeExercise(ex);

  savedExercisesView.render(model.state.saved);
};

const savedAEC = function (ex) {
  model.spanSwitch(ex);
};

const savedSC = function (ex) {
  model.addExercises(ex);

  addExerciseView.fixLook(ex);
  savedExercisesView.render(model.state.saved);
};

const savedRC = function (ex) {
  model.removeExercise(ex);

  savedExercisesView.render(model.state.saved);
};

const autoController = async function (query) {
  await model.loadResults(query);
  console.log(model.state.saved);

  resultsView.render(model.state.search.results);
};

const statsFormController = function () {
  statsFormView.renderButton();
};

const statsController = async function (data) {
  await model.getStats(data);

  statsView.displayStats(data, model.state.stats);
  statsFormView.clear();
};

const scrollController = function (target) {
  scrollView.scroll(target);
};

const init = function () {
  searchView.addHandlerSearch(searchController);

  workoutInputView.addAddHandler(addExerciseController);
  addExerciseView.addSaveHandler(SaveController);
  removeExerciseView.addRemoveHandler(removeController);
  saved.addAddHandler(savedAEC);
  saved.addSaveHandler(savedSC);
  saved.addRemoveHandler(savedRC);
  autoSearch.autoHandler(autoController);
  statsFormView.enterInfoHandler(statsFormController);
  statsView.saveStatsHandler(statsController);
  changeStats.changeHandler();
  scrollView.addScrollHandler(scrollController);
};

init();
