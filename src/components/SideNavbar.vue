<template>
  <nav class="fixed flex justify-between text-gray-500 sm:py-16 sm:px-4 sm:flex-col sm:h-screen sm:w-56 sm:border-r-2 flex-row bottom-4 h-12 bg-white">
    <div class="invisible w-0 sm:w-auto sm:visible text-center text-black">
      <img src="/assets/b-logo.png" alt="logo" class="w-24 m-auto mb-5" />
      <h1 class="text-lg inline-block align-middle">serendip</h1>
      <span class="text-3xl font-medium inline-block align-middle">IT</span>
      <h1 class="text-lg inline-block align-middle">solutions</h1>
    </div>

    <div class="flex flex-row sm:flex-col justify-around sm:justify-center focus-within:text-gray-600 sm:mb-8 w-screen sm:w-48">
      <routerLink class="menyItems" :to="{ name: 'home' }">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center pl-2">
            <v-icon name="bi-columns-gap" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:w-full w-0">Dashboard</div>
        </div>
      </routerLink>

      <!--
        <routerLink class="menyItems" :to="{ name: 'Categories' }">
          <div class="flex sm:h-12">
          <div  class="sm:w-12 items-center">
              <v-icon name="bi-stickies" fill="gray" scale="1.4" />
            </div>
            <div class="invisible sm:visible sm:flex sm:w-full w-0">Categories</div>
          </div>
        </routerLink>
 -->

      <routerLink class="menyItems" :to="{ name: 'Products' }">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center pl-2">
            <v-icon name="bi-postcard-heart" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Products</div>
        </div>
      </routerLink>

      <routerLink class="menyItems" :to="{ name: 'Orders' }">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center pl-2">
            <v-icon name="bi-cart-check" fill="gray" hover scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Orders</div>
        </div>
      </routerLink>

      <!--      <routerLink class="menyItems" :to="{ name: 'Customers' }">
        <div class="flex sm:h-12">
        <div  class="sm:w-12 items-center">
            <v-icon name="bi-people" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Customers</div>
        </div>
      </routerLink>
    -->
      <routerLink class="menyItems" :to="{ name: 'Design' }">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center pl-2">
            <v-icon name="bi-palette" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Design</div>
        </div>
      </routerLink>

      <routerLink class="menyItems" :to="{ name: 'Pages' }">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center pl-2">
            <v-icon name="bi-window-stack" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Pages</div>
        </div>
      </routerLink>

      <routerLink class="menyItems" :to="{ name: 'Journal' }">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center pl-2">
            <v-icon name="bi-pencil" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Journal</div>
        </div>
      </routerLink>

      <!--      <routerLink class="menyItems" :to="{ name: 'Icons' }">
        <div class="flex sm:h-12">
        <div  class="sm:w-12 items-center">
            <v-icon name="bi-lightning" fill="gray" scale="1.4" />
          </div>
          <div class="invisible sm:visible sm:flex sm:w-full w-0">Icons</div>
        </div>
      </routerLink>
      -->

      <div class="flex menyItems sm:invisible">
        <div class="flex sm:h-12">
          <v-icon name="bi-box-arrow-left" fill="gray" scale="1.4" />
        </div>
      </div>
    </div>

    <div>
      <div class="w-0 sm:w-full invisible sm:visible flex menyItems">
        <div class="flex sm:h-12">
          <div class="sm:w-12 items-center">
            <v-icon name="bi-box-arrow-left" fill="gray" scale="1.4" />
          </div>
          <div class="sm:flex">Sign out</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { BiColumnsGap, BiStickies, BiCartCheck, BiPeople, BiPalette, BiWindowStack, BiBoxArrowLeft, BiPostcardHeart, BiLightning } from 'oh-vue-icons/icons'
  addIcons(BiColumnsGap, BiStickies, BiCartCheck, BiPeople, BiPalette, BiWindowStack, BiBoxArrowLeft, BiPostcardHeart, BiLightning)

  export default {
    name: 'SideNavbar',
    components: {
      'v-icon': OhVueIcon,
    },
  }
</script>

<style lang="scss" scoped>
  .menyItems {
    display: flex;
    border-radius: 0.5rem;

    & * {
      display: flex;
      align-items: center;
      flex-grow: 0;
    }

    &:hover,
    &:focus {
      background-color: rgba(229, 231, 235);
      color: black;
      * {
        fill: black;
      }
    }
  }
</style>

<!--

BiBack
BiBezier
BiBrush
BiClipboard
BiCompass
BiCollection
BiCrop
BiBarChart
BiCardList
BiBasket2
BiColumnsGap
BiGrid1X2
BiLayoutWtf
BiGrid
BiBookmarkPlus
BiCreditCard
BiCalendarCheck
BiCartCheck
BiCashStack
BiClipboardCheck
BiClipboardCheck
BiDiagram3
BiDistributeVertical
BiDoorOpen
BiFileBarGraph
BiGear
BiGraphUpArrow
BiLightningCharge
BiLightning
BiListCheck
BiListUl
BiPalette
BiPalette2
BiPencilSquare
BiPencil
BiPen
BiPeople
BiPostcardHeart
BiShop
BiSliders
BiSliders2
BiStickies
BiSticky
BiSubtract
BiTable
BiTextLeft
BiTools
BiTrash
BiTrash3
BiUiChecksGrid
BiUiChecks
BiWindowStack
BiWindow
BiXLg
BiCardChecklist
BiBoxArrowLeft



-->
