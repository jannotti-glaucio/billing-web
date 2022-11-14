import { Result } from "../../../classes/result";
import { User } from "../../../classes/user";
import { Environment } from "../../../classes/environment";

export class UserRestResponse {
    result: Result;
    user: User;
    environment: Environment;
}