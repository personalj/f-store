import {
    VuexModule,
    Module,
    getModule,
    Action,
    Mutation,
  } from "vuex-module-decorators";
  import store from "@/store";
  import ProductInterface from "@/interfaces/products";
  import { http } from "@/services/http";
  
  @Module({
    dynamic: true,
    namespaced: true,
    name: "OrdersModule",
    store,
  })
  class OrdersModule extends VuexModule {
    ordersList: ProductInterface[] = []
   
  
    @Mutation
    setOrders(orders: ProductInterface[]): void {
      this.ordersList = orders; 
    }

    @Action({ commit: "setOrders" })
    async getUserOrders(id: string): Promise<ProductInterface[]> {
      const { data } = await http.get(`orders-history`, {
        headers: {
          user_id: id
        }
      });
      return data;
    }
  
    get orders() {
      return this.ordersList;
    }
  
  }
  
  export default getModule(OrdersModule);