export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(taskName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("task-master", 1);
    let db, tx, task;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectTask("attempts", { keyPath: "_id" });
      db.createObjectTask("barChart", { keyPath: "_id" });
      db.createObjectTask("members", { keyPath: "_id" });
      db.createObjectTask("tasks", { keyPath: "_id" });
      db.createObjectTask("team", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(taskName, "readwrite");
      task = tx.objecttask(taskName);

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          task.put(object);
          resolve(object);
          break;
        // case "post":
        //   task.post(object);
        //   resolve(object);
        //   break;
        case "get":
          const all = task.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          task.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
