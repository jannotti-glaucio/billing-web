export class Item {

    id:          number;
    description: String;
    quantity:    number;
    amount:      number;

    constructor(id?:number, description?:String, quantity?:number, amount?:number){
        this.id =           id;
        this.description =  description;
        this.quantity =     quantity;
        this.amount =       amount;
    }
}