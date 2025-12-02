import { Component } from '@angular/core';
import {LectionModel} from "../../models/Lection.model";
import {CommonModule, DatePipe} from "@angular/common";
import {LectionService} from "../../services/Lection.Service";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HeaderComponent} from "../../common/header/header.component/header.component";
import {Footer} from "../../common/footer/footer";

@Component({
  selector: 'lection.details',
    imports: [
        CommonModule,
        HeaderComponent,
        RouterModule,
        Footer,
    ],
  templateUrl: './lection.details.html',
  styleUrl: './lection.details.css'
})
export class LectionDetails {
    constructor(
        private lectionService: LectionService,
        private route: ActivatedRoute) { }
    lection: LectionModel | null = null;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.lectionService.getLection(+id).subscribe({
                next: data =>
                    this.lection = data,
                error: (err: any) =>
                    console.log(err)
            });
        }
    }

    download(id: number) {
        this.lectionService.downloadFile(id).subscribe({
            next: data => {
                console.log(data);
            },
            error: (err: boolean) => {
                console.log(err);
            }
        })
    }
}
