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

        return this.http.get<LectionModel[]>(`http://192.168.1.60/api/LectureApi/getAll/?courseId=${courseId}`);
    }

    getLection(id: number): Observable<LectionModel> {

        return this.http.get<LectionModel>(`http://192.168.1.60/api/LectureApi/getById/?id=${id}`);
    }

    downloadFile(id: number) {

        return this.http.get<boolean>(`http://192.168.1.60/api/FileUploadAPI/uploadToIblock/?id=${id}`);
    }
}