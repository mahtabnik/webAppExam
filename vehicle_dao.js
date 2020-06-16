'use strict';

const Vehicle = require('./vehicle');
const db = require('./db');
const moment = require('moment');

const createVehicle = function (row) {
    //const importantTask = (row.important === 1) ? true : false;
   // const privateTask = (row.private === 1) ? true : false;
    //const completedTask = (row.completed === 1) ? true : false;
    return new Vehicle(row.rid, row.category , row.brand , row.model,row.max_km , row.extra_driver);
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
exports.getVehicles = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from Vehicle";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let rents = rows.map((row) => createVehicle(row));
                resolve(rents);
            }
        });
    });
}

/**
 * Get a task with given 
 */
//todo count * should be checked
exports.getVehiclesWithFilter= function(startDate , endDate , category , estimKm , extra_driver ) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT count(*) FROM Vehicle WHERE category = ? and " +
            "max_km >= ? and extra_driver >= ? id not in ( select " +
            "car_id from Rental where startDate<= ? and endDate>=? )";
        db.all(sql, [category ,estimKm , extra_driver , endDate , startDate ], (err, rows) => {
            if (err) 
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else{
                const task = rows[0];
                resolve(task);
            }
        });
    });
}

