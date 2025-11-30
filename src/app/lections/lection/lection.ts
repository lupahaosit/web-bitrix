import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LectionModel} from "../../models/Lection.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {LectionService} from "../../services/Lection.Service";
import {HeaderComponent} from "../../common/header/header.component/header.component";
import {Footer} from "../../common/footer/footer";

@Component({
    selector: 'lection',
    standalone: true,
    templateUrl: './lection.html',
    imports: [
        RouterLink,
        HeaderComponent,
        Footer
    ],
    styleUrl: './lection.css'
})
export class Lection implements OnInit {
    lections: LectionModel[] = [];
    courseId: number = 1; // значение по умолчанию

    constructor(
        private lectionService: LectionService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // Получаем courseId из параметров маршрута
        this.route.params.subscribe(params => {
            this.courseId = +params['courseId'] || 1; // используем переданный courseId или 1 по умолчанию
            this.loadLections();
        });
    }

    loadLections(): void {
        this.lectionService.getLections(this.courseId).subscribe({
            next: data => this.lections = data,
            error: err => console.error(err)
        });
    }
}