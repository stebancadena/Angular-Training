export class AddProductToCart {
    static readonly type = '[Cart] Add';
    constructor( public payload: any[]) {};
}

export class RemoveProductToCart {
    static readonly type = '[Cart] Remove';
    constructor( public payload: any[]) {};
}
