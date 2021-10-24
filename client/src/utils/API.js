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
  return axios.get("/api/household");
},
getAllTeamTasks: function() {
  return axios.get("/api/chores");
}




}