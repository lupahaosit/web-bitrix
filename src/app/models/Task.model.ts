import {TaskStatus} from "../enums/TaskStatus";
import {FileModel} from "./File.model";

export class TaskModel {
    id: number = 0;
    name: string = "";
    description: string = "";
    status: TaskStatus = TaskStatus.NOT_STARTED;
    endDate: Date = new Date();
    assignedFiles: FileModel[] = [];
    textAnswer: string | null = null;
    urlAnswer: string | null = null;
    fileAnswer: FileModel | null = null;
}