const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const countOverdueTasks = (tasks) => {
  const overdueTasksNumber = tasks.filter((task) => {
    const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
    return isExpired;
  });
  return overdueTasksNumber.length;
};

const countTodayTasks = (tasks) => {
  const todayTasksNumber = tasks.filter((task) => {
    const today = new Date();
    const isToday = task.dueDate instanceof Date && (task.dueDate.getDate() === today.getDate() &&
      task.dueDate.getMonth() === today.getMonth() &&
      task.dueDate.getFullYear() === today.getFullYear());
    return isToday;
  });
  return todayTasksNumber.length;
};

const countFavoriteTasks = (tasks) => {
  const favoriteTasksNumber = tasks.filter((task) => {
    const isFavorite = task.isFavorite;
    return isFavorite;
  });
  return favoriteTasksNumber.length;
};

const countRepeatingTasks = (tasks) => {
  const repeatingTasksNumber = tasks.filter((task) => {

    let isRepeating = false;
    for (let day in task.repeatingDays) {
      if (!task.repeatingDays.hasOwnProperty(day)) {
        continue;
      }

      if (task.repeatingDays[day]) {
        isRepeating = true;
        break;
      }
    }
    return isRepeating;

  });
  return repeatingTasksNumber.length;
};

const countTagsTasks = (tasks) => {
  const tagsTasksNumber = tasks.filter((task) => {
    return task.tags.size > 0;
  });
  return tagsTasksNumber.length;
};

const countArchiveTasks = (tasks) => {
  const archiveTasksNumber = tasks.filter((task) => {
    const isArchive = task.isArchive;
    return isArchive;
  });
  return archiveTasksNumber.length;
};

const generateFilters = (tasks) => {

  const filtersMap = {
    'all': tasks.length,
    'overdue': countOverdueTasks(tasks),
    'today': countTodayTasks(tasks),
    'favorites': countFavoriteTasks(tasks),
    'repeating': countRepeatingTasks(tasks),
    'tags': countTagsTasks(tasks),
    'archive': countArchiveTasks(tasks)
  };

  return filterNames.map((it) => {
    return {
      name: it,
      count: filtersMap[it]
    };
  });
};

export {generateFilters};
