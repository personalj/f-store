import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import Vue from 'vue';
import store from "@/store";
import ProductInterface from "@/interfaces/product";
import CartOrderInterface from "@/interfaces/cartOrder";
import CartOrderErrorInterface from "@/interfaces/cartOrderError";
import { http } from "@/services/http";

@Module({
  dynamic: true,
  namespaced: true,
  name: "CartModule",
  store,
})
class CartModule extends VuexModule {
  cartList: ProductInterface[] = [];
  orderError: CartOrderErrorInterface[] = [];

  @Mutation
  setToCart(product: ProductInterface): void {
    const itemfound =this.cartList.find(el => el.id === product.id)
    itemfound && itemfound.quantity && product.quantity ? itemfound.quantity += product.quantity : this.cartList.unshift(product)
  }

  @Mutation
  deleteFromCart(index: number): void {
    this.cartList.splice(index, 1);
  }

  @Mutation
  increment(index: number): void {
    const item = this.cartList[index]
    if (item.quantity) {
      item.quantity++
    }
  }

  @Mutation
  decrement(index: number): void {
    const item = this.cartList[index]
    if (item.quantity && item.quantity > 1) {
      item.quantity--
    }
  }

  @Mutation
  clearCart(): void {
    this.cartList = [];
  }

  @Mutation
  setOrderError(data: CartOrderErrorInterface[]): void {
    this.orderError = data;
  }

  @Mutation
  clearError(): void {
    this.orderError = []
  }

  @Action
  async order(payload: CartOrderInterface[]): Promise<void> {
    const {data} =  await http.post("orders", payload);
    if(data.success) {
      this.clearCart()
      Vue.$toast.open({
        message: 'success',
        type: 'success'
      })
    }else {
      this.setOrderError(data.data)
      Vue.$toast.open({
        message: `error`,
        type: 'error'
      })
    }
  }

  get cart() {
    return this.cartList;
  }

  get cartCountItems() {
    if (!this.cartList.length) return 0;
    return this.cart.reduce((ac, next): number => {
      if (next.quantity) {
        return ac + next.quantity
      }
      return 0
    },  0);
  }

  get orderErrorInfo() {
    return this.orderError;
  }
}

export default getModule(CartModule);
