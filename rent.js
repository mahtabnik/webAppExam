class Rent{
    constructor(id, startDate, endDate, car_id, driverAge, estimKm,extra_insurance , extra_drivers , user_id) {
        if(id)
            this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.car_id = car_id;
        this.driverAge=driverAge;
        this.estimKm= estimKm;
        this.extra_insurance=extra_insurance;
        this.extra_drivers=extra_drivers;
        this.user_id=user_id;

    }
}

module.exports = Rent;


