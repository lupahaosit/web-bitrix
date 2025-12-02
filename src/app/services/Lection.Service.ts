import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LectionModel} from "../models/Lection.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Lection} from "../lections/lection/lection";

@Injectable({
    providedIn: "root",
})
export class LectionService {
    constructor(private http: HttpClient) { }

    getLections(courseId: number): Observable<LectionModel[]> {

        return this.http.get<LectionModel[]>(`http://localhost:8080/api/${courseId}/lections`);
    }

    getLection(id: number): Observable<LectionModel> {

        return this.http.get<LectionModel>(`http://localhost:8080/api/lection/${id}`);
    }

    downloadFile(id: number) {
        return this.http.get<boolean>(`http://localhost:8080/api/file/${id}`);
    }
}