import React from 'react';
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom' ;

const VehicleItem = (props) => {

  let {vehicle} = props;

  /*
  const onChangeTask = (ev,task) => {
    if(ev.target.checked) {
      task.completed = true;
      updateTask(task);
    } else {
      task.completed = false;
      updateTask(task);
    }
  }

   */

  return (
    <ListGroup.Item id = {vehicle.id}>
      <div className="d-flex w-100 justify-content-between">

            <label className="custom-control-label"  htmlFor={"check-t" +  vehicle.id} >{vehicle.category}</label>
           <label className="custom-control-label" >{vehicle.model}</label>
            <span className="badge badge-success ml-4">{vehicle.brand}</span>
          </div>

    </ListGroup.Item>
  );
}
export default VehicleItem;
