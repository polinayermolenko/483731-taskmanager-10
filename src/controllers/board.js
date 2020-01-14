import LoadMoreButtonComponent from '../components/load-more-button.js';
import TaskController from './task.js';
import SortComponent, {SortType} from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import NoTasksComponent from '../components/no-tasks.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._sortedTasks = [];
    this._showedTaskControllers = [];
    this._showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    const newTasks = this._renderTasks(taskListElement, this._tasks.slice(0, this._showingTaskCount));
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton(this._tasks);
  }

  _renderTasks(taskListElement, tasks) {
    return tasks.map((task) => {
      const taskController = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
      taskController.render(task);
      return taskController;
    });
  }

  _renderSortedTasks(tasks) {
    const taskListElement = this._tasksComponent.getElement();
    this._showedTaskControllers.map((it) => it.setDefaultView());
    taskListElement.innerHTML = ``;

    this._showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
    this._showedTaskControllers = [];
    const newTasks = this._renderTasks(taskListElement, tasks.slice(0, this._showingTaskCount));
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    if (this._loadMoreButtonComponent._element) {
      remove(this._loadMoreButtonComponent);
    }
    this._renderLoadMoreButton(tasks);
  }

  _renderLoadMoreButton(tasks) {
    if (this._showingTaskCount >= tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTaskCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTaskCount = this._showingTaskCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const newTasks = this._renderTasks(taskListElement, tasks.slice(prevTasksCount, this._showingTaskCount));
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTaskCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        this._sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        this._sortedTasks = this._tasks;
        break;
    }

    this._renderSortedTasks(this._sortedTasks);
  }

}

