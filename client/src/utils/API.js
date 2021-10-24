import axios from "axios";

export default {
  signup: function(name, email, password, color) {
    return axios.post("/api/users/signup", { name, email, password, color });
  },
  login: function(email, password) {
    return axios.post("/api/users/login", { email, password });
  },
  logout: function() {
    return axios.get("/api/users/logout");

},

getUserData: function() {
  return axios.get("/api/users");
}, 
getMembers: function(){
  return axios.get("/api/team/users");
},

getTeamInfo: function() {
  return axios.get("/api/team");
},
getAllTeamTasks: function() {
  return axios.get("/api/tasks");
},

createTask: function(task, attempts, repeated_days, dueDate, UserId){
  return axios.post("/api/tasks", {task, attempts, repeated_days, dueDate, UserId});
},
  removeTask: function(taskId){
    return axios.delete("/api/tasks?id=" + taskId);
  },

  completeAttempts: function(attemptId, complete){
    return axios.put("/api/attempts?id="+ attemptId, {complete})
  }

}