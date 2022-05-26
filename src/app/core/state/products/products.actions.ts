import { IProduct } from "../../models/product";

export class AddProduct {
    static readonly type = '[PRODUCTS] Add';
    constructor( public payload: IProduct) {};
}

export class RemoveProduct {
    static readonly type = '[PRODUCTS] Remove';
    constructor( public payload: number) {};
}

export class LoadProducts {
    static readonly type = '[PRODUCTS] Load';
    constructor() {};
}