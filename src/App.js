import React,{Component} from 'react';
import './App.css';
import SickDate from './Component/SickDate.js';
import Items from './Component/Items.js';
import DoneItems from './Component/DoneItems.js';
import DownButton from './Img/Logo/expand-button.svg';

class App extends Component {
  constructor(props){
    super(props);
    let data = JSON.parse(localStorage.getItem('data'));
    if(!data){
      data = {
        value: '' ,
        Date: [
          {
            currentDate: new Date(),
              todoList : [],
              doneList : []
          }    
        ],
        thisDay: new Date() //để khi click vào button thì sẽ thay đổi state để filter ra ngày list
      }
      // this.state = {
      //   value: '' ,
      //   Date: [
      //     {
      //       currentDate: new Date("2019/7/17"),
      //         todoList : [
      //           {
      //             tittle:"do home work", 
      //             isComplete : false},
      //             {
      //               tittle:"tắm", 
      //               isComplete : false}
      //         ],
      //         doneList : [
      //           {
      //             tittle:"nấu cơm",
      //             isComplete : true}
      //         ]
      //     }    
      //   ],
      //   thisDay: new Date() //để khi click vào button thì sẽ thay đổi state để filter ra ngày list
      // }
      }
    data.thisDay = new Date();
    for(let i of data.Date){i.currentDate = new Date(i.currentDate)};
    this.state= data;
    
    this.input = React.createRef();
    this.addTodo = this.addTodo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    // this.onPrevButton = this.onPrevButton.bind(this);
    // this.onNextButton = this.onNextButton.bind(this);
    // this.onDoneClick = this.onDoneClick.bind(this);
    // this.returnTodoClick = this.returnTodoClick.bind(this);
    // this.deleteTodoItem = this.deleteTodoItem.bind(this); 
    // dùng arrowFunction => ko có context sẽ nhận class làm contex
  }
  addTodo(items){
    let {Date} = this.state;
    let objCurrentDay = items[0];// items la 1 array khi filter ra
    let index = Date.indexOf(objCurrentDay);
    return (event)=>{
    if(event.keyCode === 13){
      let value = event.target.value;
      this.setState(state =>{
        return{
         value:'', 
         Date: [...Date.slice(0,index),{
            currentDate: Date[index].currentDate,
              todoList : [
                ...objCurrentDay.todoList,
                {
                  tittle: value, 
                  isComplete : false}
              ],
              doneList : Date[index].doneList
          },
          ...Date.slice(index+1)
            ]
        }
      })
    }
   }

  }
  onChangeInput(event){
    let value = event.target.value;
    this.setState(state=>{
      return{
        value
      }
    })
  }
  onDoneClick(cruDate, items){
    let {Date} = this.state;
    let indexDate= Date.indexOf(cruDate[0]);
    let index = Date[indexDate].todoList.indexOf(items);
    this.setState(state => {
      return{
        Date:[...Date.slice(0,indexDate),
          {
            currentDate: Date[indexDate].currentDate,
            todoList: [...Date[indexDate].todoList.slice(0,index),
            ...Date[indexDate].todoList.slice(index +1)],
            doneList: [...Date[indexDate].doneList,
            {
              tittle: Date[indexDate].todoList[index].tittle,
              isComplete: true
            }]
          },
          ...Date.slice(indexDate+1)
      ]
      }
    })
  }
  returnTodoClick(cruDate, items){
    let {Date} = this.state;
    let indexDate= Date.indexOf(cruDate[0]);
    let index = Date[indexDate].doneList.indexOf(items);
    this.setState(state => {
      return{
        Date:[...Date.slice(0,indexDate),
          {
            currentDate: Date[indexDate].currentDate,
            todoList: [
              ...Date[indexDate].todoList,
            {
              tittle: Date[indexDate].doneList[index].tittle,
              isComplete: false
            }
            ],
            doneList: [
            ...Date[indexDate].doneList.slice(0,index),
            ...Date[indexDate].doneList.slice(index +1)]
          },
          ...Date.slice(indexDate+1)
      ]
      }
    })
  }
  deleteTodoItem(cruDate, items){
    let {Date} = this.state;
    let indexDate= Date.indexOf(cruDate[0]);
    let index = Date[indexDate].todoList.indexOf(items);
    this.setState(state => {
      return{
        Date:[...Date.slice(0,indexDate),
          {
            currentDate: Date[indexDate].currentDate,
            todoList: [
              ...Date[indexDate].todoList.slice(0,index),
            ...Date[indexDate].todoList.slice(index +1)
          ],
            doneList: [
            ...Date[indexDate].doneList]
          },
          ...Date.slice(indexDate+1)
      ]
      }
    })
  }
  deleteDoneItem(cruDate, items){
    let {Date} = this.state;
    let indexDate= Date.indexOf(cruDate[0]);
    let index = Date[indexDate].doneList.indexOf(items);
    this.setState(state => {
      return{
        Date:[...Date.slice(0,indexDate),
          {
            currentDate: Date[indexDate].currentDate,
            todoList: [
            ...Date[indexDate].todoList
          ],
            doneList: [
              ...Date[indexDate].doneList.slice(0,index),
            ...Date[indexDate].doneList.slice(index +1)
          ]
          },
          ...Date.slice(indexDate+1)
      ]
      }
    })
  }
  editTodoItem(e, cruDate, items){
    let {Date} = this.state;
    let indexDate= Date.indexOf(cruDate[0]);
    let index = Date[indexDate].todoList.indexOf(items);
    let changeValue = e.target.parentElement.parentElement.querySelector('.modal-body').querySelector('input').value;
    this.setState(state=>{
      return{
        Date:[...state.Date.slice(0,indexDate),
          {
            currentDate: state.Date[indexDate].currentDate,
            todoList:[
              ...state.Date[indexDate].todoList.slice(0,index),
              {
                tittle: changeValue,
                isComplete: false
              },
              ...state.Date[indexDate].todoList.slice(index+1)
            ],
            doneList: state.Date[indexDate].doneList
          },
          ...state.Date.slice(indexDate+1)]
      }
    })
    
    
  }


  onPrevButton(items){
    let { Date,thisDay } = this.state;
    let index = Date.indexOf(items[0]);
    if(index > 0){
    thisDay.setDate(Date[index-1].currentDate.getDate());
    this.setState(state=> {
      return {
        Date: [...Date],
        thisDay
      }
    });
    }
    else return;
    
  }
  onNextButton(items){
    let { Date,thisDay } = this.state;
    let index = Date.indexOf(items[0]);
    if(index < Date.length-1){
    thisDay.setDate(Date[index + 1].currentDate.getDate());
    this.setState(state=> {
      return {
        Date: [...Date],
        thisDay
      }
    });
    }
    else return;
  }
  
  render(){
    if(this.state.Date.length === 6){
      this.setState(state=>{
        return{
          Date:[...this.state.Date.slice(1)]
        }
      })
    }
    let {Date} = this.state;
    let currentDate = Date.filter(date =>
      date.currentDate.getDate() === this.state.thisDay.getDate() && 
      date.currentDate.getMonth() === this.state.thisDay.getMonth() && 
      date.currentDate.getFullYear() === this.state.thisDay.getFullYear());
      
    localStorage.setItem('data',JSON.stringify(this.state));
    return (
      <div className = "App">
        <SickDate date = {currentDate} 
        onPrevClick ={()=> this.onPrevButton(currentDate)} 
        onNextClick ={()=> this.onNextButton(currentDate)} />
        <div className = "input-Wrapper">
          <img className = "Logo" src = {DownButton}  ></img>
          <input 
            className = "todoAdd" 
            onKeyUp = {this.addTodo(currentDate)}
            value = {this.state.value}
            onChange={this.onChangeInput}
            ref = {this.input}  >

          </input>
        </div>
        <div className= "todoList">
          <div className="todo">
            <p>TODO</p>
            {
              // currentDate.map((date,i)=> date.todoList).map(todoItem => <Items todoItem = {todoItem}/>)// chú ý
              currentDate.map((date,i)=> 
                date.todoList.map(todoItem => 
                  <Items todoItem = {todoItem} 
                  onDoneClick = {()=> this.onDoneClick(currentDate, todoItem)}
                  deleteTodoItem={()=>this.deleteTodoItem(currentDate, todoItem)}
                  editTodoItem={(e)=>this.editTodoItem(e, currentDate, todoItem)}/>))
              // trong {} jsx sẽ nhận 1 array về các div
            } 
          </div>
          <div className="done">
            <p>DONE</p>
            {
               currentDate.map((date,i)=> 
                date.doneList.map(doneItem => 
                  <DoneItems DoneItem = {doneItem} 
                  returnTodoClick={()=> this.returnTodoClick(currentDate, doneItem)}
                  deleteDoneItem={()=>this.deleteDoneItem(currentDate, doneItem)} />))
            }
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    // let {Date} = this.state;
    this.input.current.focus();
    let newDate = new Date();
      if(this.state.Date[this.state.Date.length-1].currentDate.getDate() !== newDate.getDate()){
        this.setState(state =>{
          return {
            Date: [...state.Date,{
              currentDate: new Date(),
              todoList: [],
              doneList: []
            }
            ],
            thisDay: new Date()
          }
        });
      }
}
}
export default App;
