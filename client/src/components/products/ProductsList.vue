<template>
  <div v-if="product" class="product">
    <div class="product__inner">
      <div class="product__img-wrap">
        <img
          v-if="product.image"
          :src="product.image"
          alt="product image"
          class="product__img"
          @click="getProduct(product.id)"
        />
      </div>
      <div class="product__info">
        <div class="product__info-item">
          <div class="product__title" @click="getProduct(product.id)">
            {{ product.title || '' }}
          </div>
        </div>
        <div class="product__price">
          {{ product.price }} USD
        </div>
        <div class="product__rate-wrap">
          <div class="product__rate-stars">
            <star-rating
              v-model="product.rating.rate"
              :read-only=true
              :increment=0.1
              :star-size=18
              :show-rating=false
            />
          </div>
          <div class="product__rate">
            {{ product.rating.rate }}
          </div>
        </div>
        <button
          type="button"
          class="default-btn product__button"
          @click="addToCart(product)"
        >
          <span>
           {{ $t('addCart') }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductInterface from "@/interfaces/products";
import cartModule from "@/store/modules/cart";

@Component
export default class ProductItem extends Vue {
  @Prop({ type: Object, default: {} }) product!: ProductInterface;

  getProduct(id: number): void {
    this.$router.push(`/product/${id}`);
  }

  addToCart(product: ProductInterface): void {
    let item = product;
    item = {
      ...item,
      quantity: 1,
    };
    cartModule.setToCart(item);
    const msg = this.$t('addedToCart') as string
    this.$toast.open(msg)
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
      margin-top: 0.4rem;
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
    &.full-width {
      flex: 0 0 100%;
      .product__inner {
        display: flex;
        align-items: center;
      }
      .product__img-wrap {
        margin-left: 0;
        margin-right: 15px;
      }
      .product__info {
        width: 70%;
        flex: 1 1 auto;
      }
    }
    &.grid {
      flex: 0 0 25%;
      @media (max-width: 992px) {
        flex: 0 0 50%;
      }
    }
    &__img-wrap {
      @include transition;
      overflow: hidden;
      &:hover {
        transform: scale(.95);
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
