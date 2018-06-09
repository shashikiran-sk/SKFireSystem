import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo:{
    value:any,
    time:any
  }
  todos:String[]=[];

  constructor(
    private todoservice:TodoService,
    private flashMessage:FlashMessagesService) { 
    this.todo={value:'',time:''}
  }

  ngOnInit() {  
    this.todoservice.getTodos().subscribe(todos=>{
      this.todos=todos;
    });
  }

  addTodo(){
    this.todo.time='2018-06-04 11:37:00';
    if(this.todo.value!=''){
      this.todoservice.addOneTodo(this.todo).subscribe(res=>{
        this.flashMessage.show('Added Note', {cssClass: 'alert-success', timeout: 5000});
        this.todoservice.getTodos().subscribe(todos=>{
          this.todos=todos;
        });
      });
    }
    this.todo.value='';
  }

  deleteTodo(id){
    this.todoservice.deleteTodo({id:id}).subscribe(res=>{
      this.flashMessage.show('Deleted Note', {cssClass: 'alert-success', timeout: 5000});
      this.todoservice.getTodos().subscribe(todos=>{
        this.todos=todos;
      });
    });
  }
}
