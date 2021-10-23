export const getSavedTaskIds = () => {
  const savedTaskIds = localStorage.getItem('saved_tasks')
    ? JSON.parse(localStorage.getItem('saved_tasks'))
    : [];

  return savedTaskIds;
};

export const saveTaskIds = (taskIdArr) => {
  if (taskIdArr.length) {
    localStorage.setItem('saved_task', JSON.stringify(taskIdArr));
  } else {
    localStorage.removeItem('saved_tasks');
  }
};

export const removeTaskId = (taskId) => {
  const savedTaskIds = localStorage.getItem('saved_tasks')
    ? JSON.parse(localStorage.getItem('saved_tasks'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedTaskIds = savedTaskIds?.filter((savedTaskId) => savedTaskId !== taskId);
  localStorage.setItem('saved_tasks', JSON.stringify(updatedSavedTaskIds));

  return true;
};
