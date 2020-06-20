class Vehicle{
    constructor(id, category, brand, model, max_km, extra_driver , size) {
        if(id)
            this.id = id;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.max_km=max_km;
        this.extra_driver=extra_driver;
        this.size=size;


    }
}

module.exports = Vehicle;


