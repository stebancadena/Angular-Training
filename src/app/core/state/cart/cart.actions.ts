import { cartItem } from "../../models/cartItem";

export class AddProductToCart {
    static readonly type = '[Cart] Add';
    constructor( public payload: cartItem) {};
}

export class RemoveProductToCart {
    static readonly type = '[Cart] Remove';
    constructor( public payload: any) {};
}
