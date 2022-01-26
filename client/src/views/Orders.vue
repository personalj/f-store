<template>
  <div>
    <div v-if="isLoading">
      <loader />
    </div>
    <div
      class="orders"
      v-else
    >
      <router-link
        to="/"
        class="orders__back"
      >
        {{ $t('backCatalog') }}
      </router-link>
      <h1 class="orders__title">Orders</h1>
      <div class="orders__main">
        <div
          v-if="ordersList.length"
          class="orders__products"
        >
          <orders
            v-for="order in ordersList"
            :key="order.id"
            :order="order"
            class="orders__product"
          />
        </div>
        <div
            v-else
            class="orders__empty"
        >
            {{ $t('noOrders') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Orders from "@/components/orders/OrdersList.vue";
import ordersModule from "@/store/modules/orders";
import ProductInterface from "@/interfaces/products";
import Loader from "@/components/common/Loader.vue"

@Component({
  components: {
    Orders,
    Loader
  },
})
export default class OrdersInfo extends Vue {
  isLoading: boolean = true;

  get ordersList(): ProductInterface[] {
    return ordersModule.orders;
  }

  async fetchOrders(): Promise<void> {
    await ordersModule.getUserOrders('1');
  }

  async mounted(): Promise<void> {
    try {
      await this.fetchOrders();
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/utils/vars.scss";
  .orders {
    &__products {
      display: flex;
      flex-wrap: wrap;
      margin: 0 - ($offset);
      @media (max-width: 992px) {
        justify-content: center;
      }
    }
    &__back {
      font-weight: bold;
      display: inline-block;
      margin-bottom: $offset;
    }
    &__title {
        margin-bottom: $offset * 2;
    }
    &__product {
      padding: 0 $offset;
      flex: 0 0 25%;
      @media (max-width: 992px) {
        flex: 0 0 50%;
      }
       @media (max-width: 576px) {
        flex: 0 0 100%;
      }
    }
    &__empty {
      font-weight: bold;
    }
  }
</style>
