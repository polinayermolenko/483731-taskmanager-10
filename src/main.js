import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mock/taskmock.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './util.js';

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const tasks = generateTasks(TASK_COUNT);


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount)
  .forEach((task) =>
    renderTask(task));

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  let prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount)
    .forEach((task) => renderTask(task));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});

