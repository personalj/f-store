<template>
  <div class="cart__item">
    <div
        class="cart__item-img"
        @click="getProduct(cartItem.id)"
    >
      <img
        v-if="cartItem.image"
        :src="cartItem.image"
      />
    </div>
    <div class="cart__item-info-wrap">
      <div class="cart__item-info">
        <div
          class="cart__item-title"
          @click="getProduct(cartItem.id)"
        >
          {{ cartItem.title || '' }}
        </div>
        <div class="cart__item-price">
          {{ cartItem.price }} USD
        </div>
      </div>
      <div>
        <div
          v-if="orderError.length"
        >
          <div
            v-for="err in orderError"
            :key="err.product_id"
          >
            <div
              v-if="err.product_id === cartItem.id"
              class="cart__error"
            >
              {{ $t('availableAmount') }} - {{ err.available_amount }}
            </div>
          </div>
        </div>
        <p>
          {{ $t('qty') }}:
        </p>
        <div class="cart__item-quantity">
          <button
            type="button"
            class="cart__item-quantity-btn"
            @click="decrementItem"
          >
            <span>-</span>
          </button>
          <div class="cart__item-quantity-value">
            {{ cartItem.quantity }}
          </div>
          <button
            class="cart__item-quantity-btn"
            @click="incrementItem"
          >
            <span>+</span>
          </button>
        </div>
      </div>
      <button
        class="default-btn warning"
        @click="deleteFromCart"
      >
        <span>{{ $t('delete') }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProductInterface from "@/interfaces/product";
import CartOrderErrorInterface from "@/interfaces/cartOrderError";
import cartModule from "@/store/modules/cart";

@Component
export default class CartItems extends Vue {
  @Prop({ type: Object, default: {} }) cartItem!: ProductInterface;

  get orderError(): CartOrderErrorInterface[] {
    return cartModule.orderErrorInfo;
  }

  deleteFromCart(): void {
    this.$emit("deleteFromCart");
  }

  incrementItem(): void {
    this.$emit("increment");
  }

  decrementItem(): void {
    this.$emit("decrement");
  }

  getProduct(id: number): void {
    this.$router.push(`/product/${id}`);
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/utils/vars.scss';
  .cart {
    &__error {
      margin-bottom: $offset / 2;
      color: $baseRed;
      font-weight: bold;
    }
    &__item {
      padding: $offset;
      margin-bottom: $offset;
      display: flex;
      align-items: center;
      font-size: .9375rem;
      border: 1px solid $lightGray;
      @media (max-width: 576px) {
        flex-wrap: wrap;
      }
      &-img {
        width: 240px;
        height: 240px;
        position: relative;
        cursor: pointer;
        transition: all .3s ease;
        &:hover {
          transform: scale(.9);
        }
        @media (max-width: 576px) {
          margin: 0 auto;
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: contain;
        }
      }
      &-info {
        &-wrap {
         padding-left: $offset;
         flex: 1 1;
          @media (max-width: 576px) {
            flex: auto;
            width: 100%;
            margin-top: $offset;
            padding-left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        }
      }
      &-quantity {
        display: flex;
        align-items: center;
      }
      &-title {
        font-size: 1rem;
        margin-bottom: $offset;
        cursor: pointer;
        transition: all .3s ease;
        &:hover {
          color: $baseGreen;
        }
      }
      &-price {
        font-weight: bold;
        margin-bottom: $offset;
      }
      &-quantity {
        margin-top: $offset / 2;
        margin-bottom: $offset;
        &-value {
          width: 3rem;
          text-align: center;
          font-size: .9375rem;
        }
        &-btn {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid $lightGray;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          @include transition;
          span {
            font-size: 1.2rem;
          }
          &:hover {
            background: $baseGreen;
            color: $baseWhite;
            border-color: $baseGreen;
          }
        }
      }
    }
  }
</style>
