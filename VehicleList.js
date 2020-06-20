import React,{ useEffect } from 'react';
import TodoItem from './TodoItem';
import ListGroup from 'react-bootstrap/ListGroup';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../auth/AuthContext'
import VehicleItem from "./VehicleItem";

const VehicleList = (props) => {

  let {vehicles , mode , getPublicVehicles} = props;

  //same as componentDidMount()
  useEffect(() => {
    if(mode === "public"){
      getPublicVehicles();
    }
  }, []);


  return(
      <ListGroup as="ul" variant="flush">
        {vehicles.map((vehicle) =>
            <VehicleItem  key = {vehicle.id} vehicle = {vehicle} />) }
      </ListGroup>
      /*
    <AuthContext.Consumer>
      {(context) => (
        <>
        {context.authErr && <Redirect to = "/login"></Redirect>}

        {vehicles &&
        }
        </>
      )}
    </AuthContext.Consumer>

       */
  );


}

export default VehicleList;
