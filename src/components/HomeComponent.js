import React from 'react';
import '../css/home.scss';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg} from 'reactstrap';
import {Loading} from './loadingComponent';

const RenderCard = ({item, isLoading, errMsg}) =>{
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errMsg){
        return(
            <h4>{errMsg}</h4>
        );
    }
    else{
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation} <span class="abbr">{item.abbr}</span> </CardSubtitle> : null }
                    <CardText>
                        {item.description}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}


function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    {console.log("here",props)}
                    <RenderCard item={props.dish} isLoading={props.isLoading} errMsg = {props.errMsg}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}/>
                </div>
            </div>
        </div>
    );
}

export default Home;