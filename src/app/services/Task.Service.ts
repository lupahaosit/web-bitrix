import {Injectable} from "@angular/core";
import {TaskData} from "zone.js/lib/zone-impl";
import {TaskModel} from "../models/Task.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LectionModel} from "../models/Lection.model";
import {Observable} from "rxjs";
import {Form} from "@angular/forms";

@Injectable(
    {providedIn: "root"}
)
export class TaskService {
    constructor(private http: HttpClient) {}

    public getAllTasks(lectionId: number): Observable<TaskModel[]> {

        return this.http.get<TaskModel[]>(`http://localhost:8080/api/${lectionId}/tasks`);
    }

    public getTask(taskId: number) : Observable<TaskModel> {

        return this.http.get<TaskModel>(`http://localhost:8080/api/task/${taskId}`)
    }

    saveAnswers(task: TaskModel) : Observable<boolean> {
        const formData = this.createFormDataFromTask(task);
        return this.http.post<boolean>('http://localhost:8080/api/tasks', formData);
    }

    private createFormDataFromTask(task: TaskModel): FormData {
        const formData = new FormData();

        // Добавляем основные поля
        formData.append('id', task.id.toString());
        formData.append('name', task.name);
        formData.append('description', task.description);
        formData.append('status', task.status);
        formData.append('endDate', task.endDate.toString());

        // Добавляем текстовые ответы (только если они есть)
        if (task.textAnswer) {
            formData.append('textAnswer', task.textAnswer);
        }

        if (task.urlAnswer) {
            formData.append('urlAnswer', task.urlAnswer);
        }

        // Добавляем файл ответа
        if (task.fileAnswer && task.fileAnswer.file) {
            formData.append('fileAnswer', task.fileAnswer.file, task.fileAnswer.name);
        }

        // Добавляем прикрепленные файлы
        if (task.assignedFiles && task.assignedFiles.length > 0) {
            task.assignedFiles.forEach((fileModel, index) => {
                if (fileModel.file) {
                    formData.append(`assignedFiles`, fileModel.file, fileModel.name);
                }
            });

            // Также добавляем метаданные файлов как JSON
            const fileMetadata = task.assignedFiles.map(file => ({
                id: file.id,
                name: file.name,
                date: file.date.toISOString()
            }));
            formData.append('assignedFilesMetadata', JSON.stringify(fileMetadata));
        }

        return formData;
    }
}