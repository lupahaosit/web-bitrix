import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LectionModel} from "../models/Lection.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CourseModel} from "../models/Course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourses(): Observable<CourseModel[]> {
        return this.http.get<CourseModel[]>(`http://localhost:8080/api/courses`);
    }
}
