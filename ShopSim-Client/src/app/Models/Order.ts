import { ItemListForm } from "./ItemListForm";

export interface Order {
    id : number;
    userId : number;
    storeId : number;
    orderDate : string;
    deliveryDate : string;
    payMethod : string;
    items : ItemListForm[];
}