
import { AddProduct, RemoveProduct } from '../actions/product.action';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BasketStateModel } from '../models/basket-state-model';

@State<BasketStateModel>({
    name: 'basket',
    defaults:{
        products: []
    }
})
export class BasketState{
    
    @Selector()
    static getBasket(state: BasketStateModel){
        return state.products;
    }

    @Action(AddProduct)
    add(
        {getState, patchState} : StateContext<BasketStateModel>,
        { payload } : AddProduct
    ) {
        const state = getState();
        patchState({
            products: [...state.products, payload]
        });
    }   

    @Action(RemoveProduct)
    remove(
        { getState, patchState }: StateContext<BasketStateModel>,
        { payload }: RemoveProduct
    ) {
        const state = getState();
        patchState({
            products: state.products.filter(
                item => item.Id != payload
            )
        });
    }
}