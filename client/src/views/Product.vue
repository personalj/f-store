<template>
  <div class="product__info">
    <div class="product">
      <router-link class="product__back" to="/">{{ $t('backCatalog') }}</router-link>
      <div v-if="isLoading">
        <loader />
      </div>
      <div
        v-else
      >
        <div
          v-if="product"
        >
          <h1>Product</h1>
          <div class="product__img">
            <img
              v-if="product.image"
              :src="product.image"
            />
          </div>
          <div class="product__info">
            <div class="product__title">
              {{ product.title || '' }}
            </div>
            <div class="product__price">{{ product.price }} USD</div>
            <div
              class="product__rate-container"
            >
              <div class="product__rate-wrap">
                <div class="product__rate-stars">
                  <star-rating
                    v-model="product.rate"
                    :read-only=true
                    :increment=0.1
                    :star-size=20
                    :show-rating=false
                  />
                </div>
                <div class="product__rate">
                  {{ product.rate }}
                </div>
              </div>
  <!--            <div class="product__rate-amount">-->
  <!--              ({{ product.rating.count }})-->
  <!--            </div>-->
            </div>
            <div class="product__description">
              {{ product.description }}
            </div>
            <div>
              <div class="product__quantity">
                <button
                    type="button"
                    class="product__quantity-btn"
                    @click="decrementQuantity"
                >
                  <span>-</span>
                </button>
                <input
                    v-model.trim="productQuantity"
                    type="number"
                    class="product__quantity-value"
                    @blur="checkProductQuantity"
                >
                <button
                    class="product__quantity-btn"
                    @click="incrementQuantity"
                >
                  <span>+</span>
                </button>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import productsModule from "@/store/modules/products";
import ProductInterface from "@/interfaces/product";
import cartModule from "@/store/modules/cart";
import Loader from "@/components/common/Loader.vue";

@Component({
  components: {
    Loader
  }
})
export default class Product extends Vue {
  isLoading: boolean = true;

  flag: boolean = true;

  productQuantity: number = 1;

  get product(): ProductInterface {
    return productsModule.product;
  }

  addToCart(product: ProductInterface): void {
    let item = product;
    item = {
      ...item,
      quantity: +this.productQuantity,
    };
    cartModule.setToCart(item);
    if (this.flag) {
      const msg = this.$t('addedToCart') as string;
      this.$toast.open(msg)
    }
    this.flag = false;
    setTimeout(() => this.flag = true, 2000);
  }

  decrementQuantity():void {
    this.productQuantity > 1 ? this.productQuantity-- : this.productQuantity = 1;
  }

  incrementQuantity():void {
   this.productQuantity++;
  }

  checkProductQuantity(): void {
    this.productQuantity < 1 ? this.productQuantity = 1 : this.productQuantity;
  }

  async mounted(): Promise<void> {
    try {
      if (this.$route.params.id) {
        const productId = this.$route.params.id as string;
        await productsModule.getProduct(productId);
        this.isLoading = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/utils/vars.scss';
  .product__info {
    padding-bottom: $offset;
    .product {
      &__back {
        font-weight: bold;
        display: inline-block;
        margin-bottom: $offset;
      }
      &__quantity {
        display: flex;
        align-items: center;
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
      &__title {
        font-size: 1.1rem;
        margin-bottom: $offset
      }
      &__price {
        font-weight: bold;
        margin-bottom: $offset;
      }
      &__description {
        font-size: .93rem;
        margin-bottom: $offset;
      }
      &__rate {
        font-size: .875rem;
        margin-left: $offset / 2;
        &-stars {
          margin-bottom: 0.3rem;
        }
        &-wrap {
          display: flex;
          align-items: center;
        }
        &-container {
          display: flex;
          align-items: center;
          margin-bottom: $offset;
        }
        &-amount {
          font-size: .83rem;
          margin-left: $offset / 2;
        }
      }
      &__img {
        width: 25rem;
        height: 25rem;
        position: relative;
        margin: 0 auto $offset;
        @media (max-width: 620px) {
          width: 18rem;
          height: 18rem;
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
    }
  }
</style>
