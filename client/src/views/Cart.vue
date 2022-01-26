<template>
  <div class="cart">
    <router-link
      to="/"
      class="cart__back"
    >
      {{ $t('backCatalog') }}
    </router-link>
    <div
      v-if="!cart.length"
      class="cart__elem"
    >
      {{ $t('emptyCart') }}
    </div>
    <div class="cart__info-wrap">
      <div class="cart__info">
        <cart-item
          v-for="(item, index) in cart"
          :key="item.id"
          :cart-item="item"
          @deleteFromCart="deleteFromCart(index)"
          @increment="increment(index)"
          @decrement="decrement(index)"
        />
      </div>
      <div
        v-if="cart.length"
        class="cart__total-container"
      >
        <div class="cart__total-wrap">
          <div class="cart__total-elem">Total</div>
          <div class="cart__total">
            {{ cartTotalCost | priceFilter }} USD
          </div>
        </div>
        <button
          type="button"
          class="default-btn"
          @click="order"
        >
          <span>{{ $t('purchase') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import cartModule from "@/store/modules/cart";
import ProductInterface from "@/interfaces/products";
import CartItem from "@/components/cart/CartItems.vue";

@Component({
  components: {
    CartItem,
  },
})
export default class Cart extends Vue {
  get cart(): ProductInterface[] {
    return cartModule.cart;
  }

  get cartTotalCost(): number {
    let items: number[] = [];
    let result: number = 0;
    if (this.cart.length) {
      for (let item of this.cart) {
        if (item.quantity) {
          items.push(item.price * item.quantity);
        }
      }
      result = items.reduce(function (sum, el) {
        return sum + el;
      }, 0);
    }
    return result;
  }

  order(): void {
    const data = this.cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    })
    cartModule.order(data)
  }

  deleteFromCart(index: number): void {
    cartModule.deleteFromCart(index);
    const msg = this.$t('deleteCart') as string
    this.$toast.open({
      message: msg,
      type: 'error'
    })
  }

  increment(index: number): void {
    cartModule.increment(index);
  }

  decrement(index: number): void {
    cartModule.decrement(index);
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/utils/vars.scss';
  .cart {
    &__back, &__info {
      margin-bottom: $offset;
    }
     &__back {
        font-weight: bold;
        display: inline-block;
     }
     &__info {
       width: 80%;
       @media (max-width: 820px) {
          width: 100%;
        }
     }
    &__info-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    &__elem {
      text-align: center;
    }
    &__total {
      font-weight: bold;
      margin-left: $offset;
      &-container {
        display: flex;
        flex-direction: column;
        width: 20%;
        flex: 1 1;
        padding-left: $offset;
      }
      &-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: $offset;
        @media (max-width: 820px) {
          width: 100%;
          flex: auto;
        }
      }
    }
  }
</style>

