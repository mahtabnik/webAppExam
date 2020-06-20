import moment from 'moment';

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

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Task} the newly created Task object
     */

    /*
    static from(json) {
        const t =  Object.assign(new Task(), json);
        if(t.deadline){
            t.deadline = moment(new Date(t.deadline));
        }
        return t;
    }

     */

}

export default Vehicle;

