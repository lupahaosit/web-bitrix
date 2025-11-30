import { Component } from '@angular/core';
import {HeaderComponent} from "../../common/header/header.component/header.component";
import {TaskService} from "../../services/Task.Service";
import {TaskModel} from "../../models/Task.model";
import {TaskStatus} from "../../enums/TaskStatus";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Footer} from "../../common/footer/footer";

@Component({
  selector: 'alltasks.details',
    imports: [
        HeaderComponent,
        RouterLink,
        Footer
    ],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class TaskComponent {
    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
    ) { }

    public tasks: TaskModel[] = [];
    courseId: number = 1; // значение по умолчанию


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.courseId = Number(localStorage.getItem("courseId"))|| 1;
        });

        this.taskService.getAllTasks(this.courseId).subscribe({
            next: value => {
                this.tasks = value
                console.log(value);
            },
            error: (err: any) => {
                this.tasks = []
                console.log(err)
            }
        })
    }
}
