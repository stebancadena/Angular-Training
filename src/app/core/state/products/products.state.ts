import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProduct, LoadProducts, RemoveProduct } from "./products.actions";
import { ProductsStateModel } from "./products.model";

@State({
    name: 'productsList',
    defaults: {
        productsList: []
    }
})
export class ProductsState {
    @Selector()
    static getProducts(state: ProductsStateModel) {return state.productsList }

    @Action(AddProduct)
    add({ getState, patchState }: StateContext<ProductsStateModel>, { payload }: AddProduct) {
        const state = getState();
        patchState({
            productsList: [...state.productsList, payload]
        });
      }

    @Action(RemoveProduct)
    remove({ getState, patchState}: StateContext<ProductsStateModel>, { payload }: RemoveProduct){
        patchState({
            productsList: getState().productsList.filter(prod => prod.productId !== payload)
        });
    }

    @Action(AddProduct)
    load({ patchState }: StateContext<ProductsStateModel>, { payload }: LoadProducts) {
        patchState({
            productsList: payload
        });
      }
}