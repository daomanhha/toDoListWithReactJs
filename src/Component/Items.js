import React, {Component} from 'react';
// import classNames from 'classnames';
import Todo from '../Img/Logo/todo.svg';
import Clear from '../Img/Logo/clear.svg';
import Edit from '../Img/Logo/edit.svg';
import './Items.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    render(){
        let {todoItem, onDoneClick, deleteTodoItem, editTodoItem} = this.props;
        return(
            <div className= "Item-wrapper">
                <img src = {Todo} width = {32} height = {32} onClick = {onDoneClick}></img>
                <p>{todoItem.tittle}</p>
                <img src = {Edit} width = {25} height = {25} onClick={this.toggle}></img>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <h4>Nhập thông tin thay đổi</h4>
                        <input ></input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e)=>{editTodoItem(e);this.toggle()}}>Change</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                 </Modal>
                <img src = {Clear} width = {25} height = {25} onClick={deleteTodoItem}></img>
            </div>
        );
    }
}

