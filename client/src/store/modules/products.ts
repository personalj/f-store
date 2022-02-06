import {
    VuexModule,
    Module,
    getModule,
    Action,
    Mutation,
  } from "vuex-module-decorators";
  import store from "@/store";
  import ProductInterface from "@/interfaces/product";
  import { http } from "@/services/http";

  @Module({
    dynamic: true,
    namespaced: true,
    name: "ProductsModule",
    store,
  })
  class ProductsModule extends VuexModule {
    products: ProductInterface[] = [];
    productSingle: ProductInterface = {} as ProductInterface;

    @Mutation
    setProducts(products: ProductInterface[]): void {
      this.products = products;
    }

    @Mutation
    setProduct(product: ProductInterface): void {
      this.productSingle = product;
    }

    @Action({ commit: "setProducts" })
    async getProducts(): Promise<ProductInterface[]> {
      const { data } = await http.get("products");
      return data;
    }

    @Action({ commit: "setProducts" })
    async getProductsByCategory(category: string): Promise<ProductInterface[]> {
      const { data } = await http.get(`products/category/${category}`);
      return data;
    }

    @Action({ commit: "setProduct" })
    async getProduct(id: string): Promise<ProductInterface> {
      const { data } = await http.get(`products/${id}`);
      return data;
    }

    get productsList() {
      return this.products;
    }

    get product() {
      return this.productSingle;
    }
  }

  export default getModule(ProductsModule);
