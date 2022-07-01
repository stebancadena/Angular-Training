import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddProductToCart, RemoveProductToCart } from './cart.actions';
import { CartStateModel } from './cart.model';

@State({
    name: 'cart',
    defaults: {
        cart: []
    }
})
export class CartState {
    @Selector()
    static getCart(state: CartStateModel) {return state.cart}

  
  @Action(AddProductToCart)
  add({ getState, patchState }: StateContext<CartStateModel>, { payload }: AddProductToCart) {
    const state = getState();
    patchState({
        cart: [...state.cart, payload]
    });
  }


  @Action(RemoveProductToCart)
  remove({ getState, patchState }: StateContext<CartStateModel>, { payload }: RemoveProductToCart) {
    patchState({
        cart: getState().cart.filter(cart => cart.product !== payload.product)
    });
  }
}