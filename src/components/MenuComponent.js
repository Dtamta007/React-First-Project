import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './loadingComponent';

function RenderMenuItem({dish}){
    const styleObj={
        width: '18rem',
    }
    return(
        <div class="card" style={styleObj}>
            <Link to={`/menu/${dish.id}`}>
                <img src={dish.image} className="card-img-top" alt={dish.name}/>
                <div class="card-body">
                    <h5 class="card-title">{dish.name}</h5>
                    <p class="card-text">{dish.description}</p>
                    <div className="btn btn-primary">get comments</div>
                </div>
            </Link>
        </div>           
    );
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map(dish => {
        return (
            <div key={dish.id} className="card-dish">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if(props.dishes.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }

    if (props.dishes.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    return(

        <div className = "container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className = "row">
                    {menu};
            </div>
        </div>

    );
}

export default Menu;