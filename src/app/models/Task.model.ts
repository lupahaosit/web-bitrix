import {TaskStatus} from "../enums/TaskStatus";
import {FileModel} from "./File.model";

export class TaskModel {
    id: number = 0;
    name: string = "";
    description: string = "";
    status: TaskStatus = TaskStatus.NOT_STARTED;
    endDate: String = "01.01.1980";
    assignedFiles: FileModel[] = [];
    review: String = "";
    mark: String = "";
    textAnswer: string | null = null;
    urlAnswer: string | null = null;
    fileAnswer: FileModel | null = null;
}