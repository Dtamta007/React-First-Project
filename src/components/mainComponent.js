import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './headerComponent';
import Footer from './footerComponent';
import Detail from './details';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './aboutComponent';
// import Counter from './components/counter';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import * as ActionCreators from '../redux/ActionCreators'

const mapStateToProps = (state) =>{
    return {
      dishes: state.dishes,
      leaders: state.leaders,
      promotions: state.promotions,
      comments: state.comments,
    }
}

const  mapDispatchToProps = (dispatch) =>({
  addComment: (dishId, rating, author, comment) => dispatch(ActionCreators.addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(ActionCreators.fetchDishes()),
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

  // constructor(props){
  //   super(props);
  // };

  componentDidMount(){
    this.props.fetchDishes();
  }

  render(){
    
    const HomePage = () =>{
      console.log("Home",this.props);
      return (  
        <Home dish = {this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
          isLoading = {this.props.dishes.isLoading}
          errMsg = {this.props.dishes.errMsg}
          leader = {this.props.leaders.filter((leader)=> leader.featured)[0]}
          promotion = {this.props.promotions.filter((promo)=> promo.featured)[0]}
        />
      );  
    }

    const AboutPage = ()=>{
      return(
        <About leaders = {this.props.leaders}/>
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Detail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMsg}
          comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
        />
      );
    }

    return (
      <div className="App">
        <Header/>
        {/* <Counter/> */}
        {/* <Detail dish={this.props.dishes.filter(dish=> dish.id === this.props.selected)[0]} /> */}
        {/* <Menu dishes={this.props.dishes} 
            check={(dishId)=>this.getDish(dishId)}
        /> */}
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage}/>
              <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>}/>
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>} />
              <Route path ='/aboutus' component = {AboutPage} />
              <Redirect to='/home'/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
