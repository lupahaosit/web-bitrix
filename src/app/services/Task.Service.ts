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

    public getAllTasks(courseId: number): Observable<TaskModel[]> {

        return this.http.get<TaskModel[]>(`http://192.168.1.60/api/TaskApi/getAll/?courseId=${courseId} `);
    }

    public getTask(taskId: number) : Observable<TaskModel> {

        return this.http.get<TaskModel>(`http://192.168.1.60/api/TaskApi/getById/?id=${taskId} `)
    }

    saveAnswers(task: TaskModel) : Observable<boolean> {
        const formData = this.createFormDataFromTask(task);
        return this.http.post<boolean>('http://192.168.1.60/api/TaskResponseApi/addResponse/', formData);
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
                date: file.date
            }));
            formData.append('assignedFilesMetadata', JSON.stringify(fileMetadata));
        }

        return formData;
    }

    downloadFile(id: number) {
        //адрес открывать в браузере
        return this.http.get<boolean>(`http://192.168.1.60/api/FileUploadAPI/uploadToIblock/?id=${id}`);
    }
}