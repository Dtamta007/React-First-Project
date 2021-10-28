import React from 'react';
import '../css/home.scss';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg} from 'reactstrap';
const RenderCard = ({item}) =>{
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


function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}/>
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