import "@angular/compiler"
import {bootstrapApplication} from "@angular/platform-browser";
import {Lection} from "./app/lections/lection/lection";
import {provideHttpClient} from "@angular/common/http";
import {appConfig} from "./app/app.config";
import {AppComponent} from "./app/app.component";

bootstrapApplication(AppComponent, appConfig
).catch(error => console.error(error));