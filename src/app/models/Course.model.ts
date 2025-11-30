import * as url from "node:url";

// course.model.ts
export interface CourseModel {
    id: number;
    name: string;
    description: string;
    coverBase64: string; // base64 с бэка
    cover?: string;      // data URL для img
}