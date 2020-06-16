class Vehicle{
    constructor(id, category, brand, model, max_km, extra_driver) {
        if(id)
            this.id = id;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.max_km=max_km;
        this.extra_driver=extra_driver;


    }
}

module.exports = Vehicle;


