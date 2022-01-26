<template>
  <div v-if="order" class="order">
    <div class="product">
      <div class="product__inner">
        <div class="product__img-wrap">
          <img
            v-if="order.image"
            :src="order.image"
            alt="product image"
            class="product__img"
            @click="getProduct(order.id)"
          />
        </div>
        <div class="product__info">
          <div class="product__info-item">
            <div class="product__title" @click="getProduct(order.id)">
              {{ order.title || '' }}
            </div>
          </div>
          <div class="product__price">
            {{ order.price }} USD
          </div>
          <div class="product__rate-wrap">
            <div class="product__rate-stars">
              <star-rating
                v-model="order.rating.rate"
                :read-only=true
                :increment=0.1
                :star-size=18
                :show-rating=false
              />
            </div>
            <div class="product__rate">
              {{ order.rating.rate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductInterface from "@/interfaces/products";

@Component
export default class OrderItem extends Vue {
  @Prop({ type: Object, default: {} }) order!: ProductInterface;

  getProduct(id: number): void {
    this.$router.push(`/product/${id}`);
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/utils/vars.scss';
  .product {
    margin-bottom: $offset * 2;
    @media (max-width: 620px) {
      width: 100%;
      max-width: 31.25rem;
    }
    &__rate {
      font-size: .875rem;
      margin-left: $offset / 2;
      &-wrap {
        margin-bottom: $offset;
        display: flex;
        align-items: center;
      }
    }
    &__inner {
      padding: $offset;
      border: 1px solid $lightGray;
    }
    &__info {
       @media (max-width: 620px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }
    &__img-wrap, &__title {
      cursor: pointer;
      margin-bottom: $offset / 2;
    }
    &__title {
      height: 35px;
      overflow: hidden;
      @include transition;
      &:hover {
        color: $baseGreen;
      }
      @media (max-width: 620px) {
        text-align: center;
      }
    }
    &__price {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: $offset;
    }
    &__img {
      &-wrap {
        width: 100%;
        height: 14rem;
        max-width: 14rem;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
        @include transition;
        &:hover {
            transform: scale(.95)
        }
      }
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, - 50%);
      object-fit: contain;
    }
  }
</style>
