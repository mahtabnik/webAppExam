import Task from './Task';
import Vehicle from "./Vehicle";
const baseURL = "/api";

async function isAuthenticated(){
    let url = "/user";
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok){
        return userJson;
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getFilterVehicles(category , brand) {
    let url = "/vehicleSearch";
    let queryParams;
    if(category){
        queryParams = "?" ;
        category.map((c) => queryParams+="category="+c+"&");


    }
    if(brand){
        brand.map((c) => queryParams+="brand="+c+"&");
    }
    url += queryParams.replace(/.$/ , '');
    const response = await fetch(baseURL + url);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((t) => new Vehicle(t.id,t.category,t.brand, t.model,t.max_km,t.extra_driver, t.size));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getTasks(){

}

async function getBrands(){
    let url= "/brands/public";
    const response = await fetch(baseURL + url);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((t) => t.brand);
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getPublicTasks() {
    let url = "/vehicles/public";

    const response = await fetch(baseURL + url);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((t) => new Vehicle(t.id,t.category,t.brand, t.model,t.max_km,t.extra_driver, t.size));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
}

/*
async function getPublicVehicles() {
    let url = "/vehicles/public";

    const response = await fetch(baseURL + url);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((t) => new Vehicle(t.id,t.category,t.brand, t.model,t.max_km,t.extra_driver, t.size));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
}

 */

async function addTask(task) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function updateTask(task) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/tasks/" + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {

            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


async function deleteTask(taskId) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/tasks/" + taskId, {
            method: 'DELETE'
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });
}

const API = { isAuthenticated, getTasks, getPublicTasks, addTask, updateTask,deleteTask, userLogin, userLogout
,getBrands , getFilterVehicles} ;
export default API;
