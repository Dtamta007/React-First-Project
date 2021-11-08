/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Row, Label, Button } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './loadingComponent';

const required = (val) => {
    if(val){
        return true;
    }
    return false;
};

const maxLength = (len) => (val) => !(val) || val.length <= len;

const minLength = (len) => (val) => (val) && val.length >= len;

class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values, dishId, addComment) {
        console.log("The values entered: " + JSON.stringify(values));
        addComment(dishId, values.rating, values.author, values.comment);
        this.toggleModal();
    }

    render(){
        if(this.props.isLoading){
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        if(this.props.errMess){
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if(this.props.dish!=null){
            const comments = this.props.comments.map(comment => {
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            })
    
            const dish = this.props.dish;
            
            const rowStyle = {
                margin: "auto",
                padding: "0 7%"  
            }
            
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active >{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row" style={rowStyle}> 
                            <div className="display col"> 
                            <div className="display-img">
                                <img src={dish.image} alt={dish.name} />
                            </div>
                            <div>
                                <h3>{dish.name}</h3>
                                <p>{dish.description}</p>
                            </div>
                        </div>
                        <div className="comments col">
                            <h1>Comments</h1>
                            {comments}
                            <div className="btn btn-primary" onClick={this.toggleModal} >Comment</div>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values, dishId, addcomment)=> this.handleSubmit(values, dish.id, this.props.addComment)}> 
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select 
                                        model=".rating" 
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                        >
                                            <option value="1" selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger" 
                                        model='.rating'
                                        show="touched"
                                        messages={{
                                            required: 'This value is required'
                                        }}>

                                    </Errors>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text
                                        model=".author"
                                        id="author"
                                        name="author"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Please enter name",
                                            minLength: "The value should be greater than 3",
                                            maxLength: "The value should be less than 15"
                                        }}>
                                    </Errors>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        className="form-control"
                                    />
                                </Row>
                                <Row>
                                    <Button>Submit</Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>                
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
}

export default Detail;