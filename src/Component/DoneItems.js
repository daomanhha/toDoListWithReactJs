import React, {Component} from 'react';
// import classNames from 'classnames';
import Done from '../Img/Logo/done.svg';
import Clear from '../Img/Logo/clear.svg';
import './Items.css';
export default class DoneItem extends Component{
    render(){
        let {DoneItem , returnTodoClick , deleteDoneItem} = this.props;
        return(
            <div className= "Item-wrapper">
                <img src = {Done} width = {32} height = {32} onClick={returnTodoClick}></img>
                <p>{DoneItem.tittle}</p>
                <img src = {Clear} width = {25} height = {25} onClick={deleteDoneItem}></img>
            </div>
        );
    }
}