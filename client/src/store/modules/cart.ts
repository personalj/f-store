import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import Vue from 'vue';
import store from "@/store";
import ProductInterface from "@/interfaces/products";
import CartOrderInterface from "@/interfaces/cartOrder";
import { http } from "@/services/http";

@Module({
  dynamic: true,
  namespaced: true,
  name: "CartModule",
  store,
})
class CartModule extends VuexModule {
  cartList: ProductInterface[] =
  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || '') : [];

  @Mutation
  setToCart(product: ProductInterface): void {
    const itemfound =this.cartList.find(el => el.id === product.id)
    itemfound && itemfound.quantity && product.quantity ? itemfound.quantity += product.quantity : this.cartList.unshift(product)
    localStorage.setItem("cart", JSON.stringify(this.cartList) || "");
  }

  @Mutation
  deleteFromCart(index: number): void {
    this.cartList.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartList) || "");
  }

  @Mutation
  increment(index: number): void {
    const item = this.cartList[index]
    if (item.quantity) {
      item.quantity++
    }
    localStorage.setItem("cart", JSON.stringify(this.cartList) || "");
  }

  @Mutation
  decrement(index: number): void {
    const item = this.cartList[index]
    if (item.quantity && item.quantity > 1) {
      item.quantity--
    }
    localStorage.setItem("cart", JSON.stringify(this.cartList) || "");
  }

  @Mutation
  clearCart(): void {
    this.cartList = [];
    localStorage.removeItem("cart");
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
      Vue.$toast.open({
        message:  `${data.msg} Available amount ${data.available_amount}`,
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
}

export default getModule(CartModule);
