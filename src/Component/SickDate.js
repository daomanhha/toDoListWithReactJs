import React, {Component} from 'react';
import "./SlickDate.css";
import LeftArrow from '../Img/Logo/left-arrow.svg';
import RightArrow from '../Img/Logo/right-arrow.svg';
export default class SlickDate extends Component{
    render(){
        let { date, onPrevClick, onNextClick } = this.props;
        return(
          <div className= "Date-Wrapper">
              {
                date.map(date=> 
                  (<div className="DateItem">
                    <h3>{date.currentDate.getFullYear()}/{date.currentDate.getMonth()+1}/{date.currentDate.getDate()}</h3>
                  </div>)
                )
              }
              <img onClick ={onPrevClick} src={LeftArrow} className="left-arrow"></img>
              <img onClick ={onNextClick} src={RightArrow} className="right-arrow"></img>
            </div>
        );
    }
}