import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CourseService } from '../services/course.service';
import {CourseModel} from "../models/Course.model";
import {Footer} from "../common/footer/footer";

// course.component.ts
@Component({
    selector: 'courses-component',
    imports: [
        NgOptimizedImage,
        RouterLink,
        Footer
    ],
    templateUrl: './course.html',
    styleUrl: './course.css'
})
export class CourseComponent implements OnInit {
    courses: CourseModel[] = [];

    constructor(private courseService: CourseService) {}

    ngOnInit() {
        this.courseService.getCourses().subscribe({
            next: (data: CourseModel[]) => {
                this.courses = data.map(course => ({
                    ...course,
                    cover: `data:image/png;base64,${course.coverBase64}`
                }));
            },
            error: err => {
                console.log('Error loading courses:', err);
                this.courses = [];
            }
        });
    }

    saveCourseId(id: number) {
        localStorage.setItem('courseId', id.toString());
    }
}