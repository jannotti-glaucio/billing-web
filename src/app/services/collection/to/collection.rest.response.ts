import { Result } from "../../../classes/result";
import { Collection } from "../../../classes/collection";
import { Page } from "../../../classes/page";

export class CollectionRestResponse {
    result:         Result;
    token:          String;
    collection:     Collection;
    collections:    Collection[];
    page:           Page;
}