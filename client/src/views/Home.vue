<template>
  <div>
    <div v-if="isLoading">
      <loader />
    </div>
    <div
      class="catalog"
      v-else
    >
      <h1>Products</h1>
      <div class="catalog__view-btns">
        <div
          v-for="item in catalogViewItems"
          :key="item.value"
          class="catalog__view-btn"
          :class="{ active: catalogView === item.value }"
          @click="catalogView = item.value"
        >
          <component
            :is="item.iconName"
           />
        </div>
      </div>
      <div class="catalog__main">
        <div v-if="products.length" class="catalog__products">
          <products
            v-for="product in products"
            :key="product.id"
            :product="product"
            :class="catalogView"
            class="catalog__product"
          />
        </div>
        <div
          v-else
          class="catalog__empty"
        >
          {{ $t('noProducts') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Products from "@/components/products/ProductsList.vue";
import productsModule from "@/store/modules/products";
import ProductInterface from "@/interfaces/products";
import CatalogVeiwItem from "@/interfaces/catalogVeiwItem";
import FullWidthIcon from "@/components/icons/grid/FullWidth.vue";
import GridIcon from "@/components/icons/grid/Grid.vue";
import Loader from "@/components/common/Loader.vue"

@Component({
  components: {
    Products,
    FullWidthIcon,
    GridIcon,
    Loader
  },
})
export default class Catalog extends Vue {
  catalogView: string = "grid";

  isLoading: boolean = true;

  catalogViewItems: CatalogVeiwItem[] = [
    { iconName: "full-width-icon", value: "full-width" },
    { iconName: "grid-icon", value: "grid" },
  ];

  get products(): ProductInterface[] {
    return productsModule.productsList;
  }

  async fetchProducts(): Promise<void> {
    await productsModule.getProducts();
  }

  checkCatalogItemView(): void {
    if (window.innerWidth < 620) {
      this.catalogView = "";
    } else {
      this.catalogView = "grid";
    }
  }

  async mounted(): Promise<void> {
    this.checkCatalogItemView()
    window.addEventListener("resize", () => {
     this.checkCatalogItemView()
    });
    try {
      await this.fetchProducts();
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.checkCatalogItemView)
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/utils/vars.scss";
  .catalog {
    &__products {
      display: flex;
      flex-wrap: wrap;
      margin: 0 (-$offset);
      @media (max-width: 992px) {
        justify-content: center;
      }
    }
    &__product {
      padding: 0 $offset;
    }
    &__empty {
      font-weight: bold;
    }
    &__view {
      &-btns {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: $offset * 2;
        @media (max-width: 620px) {
          display: none;
        }
      }
      &-btn {
        margin-left: $offset / 2;
        cursor: pointer;
        svg {
          @include transition;
          &:hover {
            fill: $baseGreen;
          }
        }
        &.active svg {
          fill: $baseGreen;
        }
      }
    }
  }
</style>
