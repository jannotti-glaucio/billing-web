import { Subscription } from './../../../classes/subscription';
import { Page } from 'app/classes/page';
import { Result } from 'app/classes/result';
export class SubscriptionRestResponse {
    result:         Result;
    token:          String;
    subscription:     Subscription;
    subscriptions:    Subscription[];
    page:           Page;
}