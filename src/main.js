import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mock/taskmock.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 22;
const tasks = generateTasks(TASK_COUNT);


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);
boardController.renderBoard(tasks);

