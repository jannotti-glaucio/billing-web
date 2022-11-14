import { Result } from "app/classes/result";
import { Application } from "app/classes/application";

export class ApplicationRestResponse {
    result: Result;
    applications: Application[];
    application: Application;
    token: String;
    clientId: String;
    clientSecret: String;
}