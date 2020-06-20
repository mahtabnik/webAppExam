import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {NavLink} from 'react-router-dom';
import TodoItem from "./TodoItem";

class Filters extends React.Component {



    componentDidMount(){
        this.props.onFilter(this.props.activeFilter);
        this.props.getBrands();
    }

    onChangeCategory= (ev,category) => {
        if(ev.target.checked) {
            this.props.selectedCategory.push(category);
         // task.completed = true;
            this.props.applyFilter(this.props.selectedCategory  , this.props.selectedBrand);
        } else {
            let index=this.props.selectedCategory.indexOf(category);
            this.props.selectedCategory.splice(index,1);
            this.props.applyFilter(this.props.selectedCategory  , this.props.selectedBrand);
        }
    }

    onChangeBrand=(ev , brand)=>{
        if(ev.target.checked) {
            this.props.selectedBrand.push(brand);
            // task.completed = true;
            this.props.applyFilter(this.props.selectedCategory  , this.props.selectedBrand);
        } else {

            let index=this.props.selectedBrand.indexOf(brand);
            this.props.selectedBrand.splice(index,1);
            this.props.applyFilter(this.props.selectedCategory  , this.props.selectedBrand);
        }
    }



    createProject = (project) => {
        return (
            <NavLink key = {`#${project}`} to = {`/tasks/${project}`}><ListGroup.Item action active = {this.props.activeFilter === project ? true : false} onClick = {() => this.props.onFilter(project)}>{project}</ListGroup.Item></NavLink>
        );
    }
    
    render() {
        return (
            <>
                <ListGroup  variant="flush">
                    <lable className="col-6 form-check-label"><input className="form-check-input" type="checkbox" defaultChecked={this.props.selectedCategory.includes('A') ? true : false} onChange = {(ev) => this.onChangeCategory(ev,'A')} />category A</lable>
                    <lable className="col-6 form-check-label"><input className="form-check-input" type="checkbox" defaultChecked={this.props.selectedCategory.includes('B') ? true : false} onChange={(ev) => this.onChangeCategory(ev,'B')} />category B</lable>
                    <lable className="col-6 form-check-label"><input className="form-check-input" type="checkbox" defaultChecked={this.props.selectedCategory.includes('C') ? true : false} onChange={(ev) => this.onChangeCategory(ev,'C')} />category C</lable>
                    <lable className="col-6 form-check-label"><input className="form-check-input" type="checkbox" defaultChecked={this.props.selectedCategory.includes('D') ? true : false} onChange={(ev) => this.onChangeCategory(ev,'D')} />category D</lable>
                    <lable className="col-6 form-check-label"><input className="form-check-input" type="checkbox" defaultChecked={this.props.selectedCategory.includes('E') ? true : false} onChange={(ev) => this.onChangeCategory(ev,'E')} />category E</lable>

                </ListGroup>
                <span>Brands</span>
                <ListGroup  variant="flush">
                    {this.props.brands.map((brand) =>
                        <div key={brand}>
                        <lable className="col-6 form-check-label"><input className="form-check-input" type="checkbox" defaultChecked={this.props.selectedBrand.includes(brand) ? true : false} onChange={(ev) => this.onChangeBrand(ev,brand)} />{brand}</lable>
                        </div>
                        )}
                </ListGroup>
            </>
        );
    }
}

export default Filters;
