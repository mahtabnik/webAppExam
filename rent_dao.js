'use strict';

const Rent = require('./rent');
const db = require('./db');
const moment = require('moment');

const createRent = function (row) {
    //const importantTask = (row.important === 1) ? true : false;
   // const privateTask = (row.private === 1) ? true : false;
    //const completedTask = (row.completed === 1) ? true : false;
    return new Rent(row.rid, row.startDate , row.endDate , row.car_id ,row.driverAge , row.estimKm
    , row.extra_insurance , row.extra_drivers , row.user_id);
}

/*
const isToday = function(date) {
    return moment(date).isSame(moment(), 'day');
}

 */
/*
const isNextWeek = function(date) {
    const nextWeek = moment().add(1, 'weeks');
    const tomorrow = moment().add(1, 'days');
    return moment(date).isAfter(tomorrow) && moment(date).isBefore(nextWeek);
}
*/



/**
 * Get public tasks 
 */
/*
exports.getPublicTasks = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT r.id as rid, r.description, r.important, r.private, r.project, r.deadline,r.completed," +
            " r.user, u.name, u.email " +
            "FROM tasks as t, users as u WHERE t.user = u.id AND t.private = 0";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let tasks = rows.map((row) => createTask(row));
                resolve(tasks);
            }
        });
    });
}

 */



/**
 * Get tasks and optionally filter them
 */
exports.getRents = function(user) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT r.id as rid, r.startDate, r.endDate, r.car_id, r.driverAge , r.estimKm" +
            "    , r.extra_insurance , r.extra_drivers , r.user_id , u.name, u.email FROM Rental as r, users as u " +
            "WHERE r.user_id = u.id AND t.user_id = ?";
        db.all(sql, [user], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let rents = rows.map((row) => createRent(row));
                /*
                if(filter){
                    switch(filter){
                        case "important":
                            tasks = tasks.filter((el) => {
                                return el.important;
                            });
                            break;
                        case "private":
                            tasks = tasks.filter((el) => {
                                return el.privateTask;
                            });
                            break;
                        case "shared":
                            tasks = tasks.filter((el) => {
                                return !el.privateTask;
                            });
                            break;
                        case "today":
                            tasks = tasks.filter((el) => {
                                if(el.deadline)
                                    return isToday(el.deadline);
                                else
                                    return false;
                            });
                            break;
                        case "week":
                            tasks = tasks.filter((el) => {
                                if(el.deadline)
                                    return isNextWeek(el.deadline);
                                else
                                    return false;
                            });
                            break;
                        default:
                            //try to filter by project
                            tasks = tasks.filter((el) => {
                                return el.project === filter;
                            });
                    }
                }

                 */
                resolve(rents);
            }
        });
    });
}

/**
 * Get a task with given 
 */
exports.getRent= function(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Rental WHERE id = ?";
        db.all(sql, [id], (err, rows) => {
            if (err) 
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else{
                const task = createRent(rows[0]);
                resolve(task);
            }
        });
    });
}

/**
 * Delete a task with a given id
 */
exports.deleteRent= function(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Rental WHERE id = ?';
        db.run(sql, [id], (err) => {
            if(err)
                reject(err);
            else 
                resolve(null);
        })
    });
}

/**
 * Insert a task in the database and returns the id of the inserted task. 
 * To get the id, this.lastID is used. To use the "this", db.run uses "function (err)" instead of an arrow function.
 */
exports.createRent = function(rent) {
    /*
    if(task.deadline){
        task.deadline = moment(task.deadline).format("YYYY-MM-DD HH:mm");
    }
    */

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Rental(startDate, endDate, car_id, driverAge , estimKm' +
            ', extra_insurance ,extra_drivers , user_id) VALUES(?,?,?,?,?,?,?,?)';
        db.run(sql, [rent.startDate, rent.endDate, rent.car_id, rent.driverAge , rent.estimKm ,
            rent.extra_insurance ,rent.extra_drivers ,rent.user_id], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                console.log(this.lastID);
                resolve(this.lastID);
            }
        });
    });
}

/**
 * Update an existing task with a given id. newTask contains the new values of the task (e.g., to mark it as "completed")
 */
exports.updateRent = function(id, rent) {
    /*
    if(newTask.deadline){
        newTask.deadline = moment(newTask.deadline).format("YYYY-MM-DD HH:mm");
    }

     */
    return new Promise((resolve, reject) => {

        const sql = 'UPDATE Rental SET startDate =? , endDate=? , car_id=? , driverAge =? , estimKm=? ' +
            ', extra_insurance=? ,extra_drivers=? , user_id=? WHERE id = ?';
        db.run(sql, [rent.startDate, rent.endDate, rent.car_id, rent.driverAge , rent.estimKm ,
            rent.extra_insurance ,rent.extra_drivers ,rent.user_id , id], (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(null);
        })
    });
}
