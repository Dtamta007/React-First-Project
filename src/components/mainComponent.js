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

const mapStateToProps = (state) =>{
    return {
      dishes: state.dishes,
      leaders: state.leaders,
      promotions: state.promotions,
      comments: state.comments,
    }
}

class Main extends Component {

  // constructor(props){
  //   super(props);
  // };

  render(){
    
    const HomePage = () =>{
      return (  
        <Home dish = {this.props.dishes.filter((dish)=> dish.featured)[0]} 
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
        <Detail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
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
        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route path ='/aboutus' component = {AboutPage} />
          <Redirect to='/home'/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
