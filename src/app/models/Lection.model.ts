import {FileModel} from "./File.model";

export interface LectionModel {
    id: number;
    courseId: number;
    name: string;
    description: string;
    content: String;
    createdAt: Date;
    files: FileModel[];
}