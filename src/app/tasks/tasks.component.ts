import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  constructor() { }

  ngOnInit() {
    this.getToDoTasks();
    this.getDoneTasks();
  }

  getToDoTasks() {
    this.toDoTasks = [];
    this.rest.getToDoTasks(false).subscribe((data: {}) => {
      console.log(data);
      this.toDoTasks = data;
    });
  }

  getDoneTasks() {
    this.doneTasks = [];
    this.rest.getDoneTasks(false).subscribe((data: {}) => {
      console.log(data);
      this.doneTasks = data;
    });
  }

}
