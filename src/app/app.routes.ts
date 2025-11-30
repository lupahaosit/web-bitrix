import {Routes} from "@angular/router";
import {Lection} from "./lections/lection/lection";
import {LectionDetails} from "./lections/lection.details/lection.details";
import {TaskComponent} from "./tasks/alltasks/task";
import {TaskDetailsComponent} from "./tasks/taskdetails/task-details-component/task-details-component";
import {Login} from "./login/login";
import {CourseComponent} from "./courses/course";

export const routes: Routes = [
    {path: "lections", component: Lection},
    { path: "lections/:id", component: LectionDetails },
    {path: '', redirectTo: '/lections', pathMatch: 'full'},
    {path: 'tasks', component: TaskComponent},
    {path: 'tasks/:id', component: TaskDetailsComponent},
    {path: "login", component: Login},
    {path: "courses", component: CourseComponent},
    {path: "courses/:courseId/lections", component: Lection}, // новый маршрут для лекций курса
]