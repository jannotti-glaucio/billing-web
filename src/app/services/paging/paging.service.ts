import { Injectable} from '@angular/core';
import { Page } from '../../classes/page';

@Injectable()
export class PagingService {

    public page: Page;
   
    public setPaging(page: Page) {
       this.page = page;
       this.page.pageNumbersList = Array.from(Array(this.page.totalPages)).map((x, i) => i );
    }

    public getNextPage(){
        if(this.page){
            if(this.page.number < (Number(this.page.totalPages) - 1)){
                var nextPage = Number(this.page.number) + Number(1);
                return nextPage;
            } else {
                return -1;
            }
        }
    }

    public getPrevPage(){
        if(this.page){
            if(this.page.number > 0){
                var prevPage = Number(this.page.number) - Number(1);
                return prevPage;
            } else {
                return -1
            }
        }
    }

    public showNumber(number: Number){
        if((number < 5 && this.page.number < 3) && this.page.number < 5){
          return true;
        }
        if((number > (this.page.totalPages.valueOf() - 6)) && 
        (this.page.number > (this.page.totalPages.valueOf() - 3) && this.page.number > 5)){
          return true;
        }
        if((number <= (this.page.number.valueOf() + 2) && (number >= (this.page.number.valueOf() - 2)) || 
        (number == this.page.number))){
          return true;
        } else {
          return false;
        }
      }
}