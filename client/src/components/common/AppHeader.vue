<template>
  <header class="header">
    <div class="header__top">
      <div class="header__logo">
        <router-link
          to="/"
          class="logo"
        >
          F-Store
        </router-link>
      </div>
      <div class="header__info">
        <div class="header__info-item">
          <router-link
            to="/orders"
            class="header__info-link"
          >
            <purchase-history-icon
              class="header__info-icon"
            />
          </router-link>
        </div>
        <div class="header__info-item">
          <router-link
            to="/cart"
            class="header__info-link"
          >
            <cart-icon class="header__info-icon"/>
            <span class="header__info-link-elem">
              {{ cartCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartIcon from "@/components/icons/common/Cart.vue";
import PurchaseHistoryIcon from "@/components/icons/common/PurchaseHistory.vue";
import cartModule from "@/store/modules/cart";

@Component({
  components: {
    CartIcon,
    PurchaseHistoryIcon
  }
})
export default class AppHeader extends Vue {
   get cartCount(): number {
    return cartModule.cartCountItems;
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/utils/vars.scss';
  .header {
    margin-bottom: $offset;
    &__logo {
      .logo {
        font-size: 1.2rem;
        color: $baseGreen;
        font-weight: bold;
      }
    }
    &__top {
      padding: $offset 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__info {
      display: flex;
      align-items: center;
      &-link {
        position: relative;
        display: block;
        margin-left: $offset / 2;
        &-elem {
          font-size: .55rem;
          padding: 0.2rem;
          bottom: -10%;
          right: -10%;
          position: absolute;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          text-align: center;
          color: $baseWhite;
          background: $baseBlack;
          @include transition;
        }
        &:hover {
          .header__info-icon {
            transform: scale(.9);
          }
        }
      }
      &-icon {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        @include transition;
      }
    }
  }
</style>
