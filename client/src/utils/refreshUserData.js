import API from "./API";
import {
    UPDATE_USERNAME,
    UPDATE_TEAM,
    UPDATE_MEMBERS,
    UPDATE_TASKS,
    UPDATE_ATTEMPTS,
}
    from './actions';


function refreshUserData(dispatch) {

    API.getUserData()
        .then(response => {
            dispatch({
                type: UPDATE_USERNAME,
                username: response.data.name,
                userId: response.data.id
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: UPDATE_USERNAME, username: "", userId: null });
        })


    API.getTeamInfo()

        .then(response => {
            console.log(response);
            dispatch({
                type: UPDATE_TEAM,
                team: response.data.name,
                inviteCode: response.data.invite_code,
            });


            dispatch({
                type: UPDATE_MEMBERS,
                members: response.data.members,
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: UPDATE_TEAM,
                team: null,
                inviteCode: null,
            });
            dispatch({
                type: UPDATE_MEMBERS,

                members: [],
            });
        })

    API.getAllTeamTasks()
        .then(res => {
            dispatch({ type: UPDATE_TASKS, tasks: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: UPDATE_TASKS, tasks: [] });
        });



    API.getAllAttempts()

        .then(res => {
            dispatch({ type: UPDATE_ATTEMPTS, attempts: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: UPDATE_ATTEMPTS, attempts: [] });
        });
}

export default refreshUserData;

