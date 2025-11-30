import { Component } from '@angular/core';
import {TaskModel} from "../../../models/Task.model";
import {TaskService} from "../../../services/Task.Service";
import {ActivatedRoute} from "@angular/router";
import {TaskStatus} from "../../../enums/TaskStatus";
import {HeaderComponent} from "../../../common/header/header.component/header.component";
import {DatePipe, NgClass} from "@angular/common";
import {Footer} from "../../../common/footer/footer";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'task-details-component',
    imports: [
        HeaderComponent,
        DatePipe,
        Footer,
        FormsModule,
    ],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.css'
})
export class TaskDetailsComponent {
    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute) { }

    public task: TaskModel = new TaskModel();

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.taskService.getTask(+id!).subscribe({
            next: task => {
                this.task = task
                console.log(task)
            },
            error: err => console.log(err)
        })
    }

    save() {
        console.log("saving")
        this.taskService.saveAnswers(this.task).subscribe({
            next: result => {
                console.log("Save result:", result);
                if (result) {
                    console.log("Save successful");
                } else {
                    console.log("Save failed");
                }
            },
            error: (error) => {
                console.error("Save error:", error);
            }
        });
    }

    setFile(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.task.fileAnswer = {
                id: 0,
                name: file.name,
                date: new Date(),
                file: file
            };
        }
    }

    protected readonly TaskStatus = TaskStatus;

    getStatus(status: string | undefined) {
        switch (status) {
            case 'NOT_STARTED': return 'Не начато';
            case 'ON_REVIEW': return 'Ожидает проверки';
            case 'COMPLETED': return 'Проверено';
            default: return status;
        }
    }
}
