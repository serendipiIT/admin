<template>
  <nav class="fixed flex flex-col justify-between h-screen border-r-2 w-56 text-gray-500 py-16 px-4">
    <div class="text-center text-black">
      <img src="/assets/b-logo.png" alt="logo" class="w-24 m-auto mb-5" />
      <h1 class="text-xl inline-block align-middle">serendip</h1>
      <span class="text-3xl font-medium inline-block align-middle">IT</span>
      <h1 class="text-xl inline-block align-middle">solutions</h1>
    </div>
    <div class="flex flex-col justify-center focus-within:text-gray-600">
      <routerLink class="menyItems" :to="{ name: 'home' }">
        <div>
          <div>
            <v-icon name="bi-columns-gap" fill="gray" scale="1.4" />
          </div>
          <div>Dashboard</div>
        </div>
      </routerLink>

      <!--      
      <routerLink class="menyItems" :to="{ name: 'Categories' }">
        <div>
          <div>
            <v-icon name="bi-stickies" fill="gray" scale="1.4" />
          </div>
          <div>Categories</div>
        </div>
      </routerLink>
 -->

      <routerLink class="menyItems" :to="{ name: 'Products' }">
        <div>
          <div>
            <v-icon name="bi-postcard-heart" fill="gray" scale="1.4" />
          </div>
          <div>Products</div>
        </div>
      </routerLink>

      <routerLink class="menyItems" :to="{ name: 'Orders' }">
        <div>
          <div>
            <v-icon name="bi-cart-check" fill="gray" hover scale="1.4" />
          </div>
          <div>Orders</div>
        </div>
      </routerLink>

      <!--      <routerLink class="menyItems" :to="{ name: 'Customers' }">
        <div>
          <div>
            <v-icon name="bi-people" fill="gray" scale="1.4" />
          </div>
          <div>Customers</div>
        </div>
      </routerLink>
-->
      <routerLink class="menyItems" :to="{ name: 'Design' }">
        <div>
          <div>
            <v-icon name="bi-palette" fill="gray" scale="1.4" />
          </div>
          <div>Design</div>
        </div>
      </routerLink>

      <routerLink class="menyItems" :to="{ name: 'Pages' }">
        <div>
          <div>
            <v-icon name="bi-window-stack" fill="gray" scale="1.4" />
          </div>
          <div>Pages</div>
        </div>
      </routerLink>

      <!--      <routerLink class="menyItems" :to="{ name: 'Icons' }">
        <div>
          <div>
            <v-icon name="bi-lightning" fill="gray" scale="1.4" />
          </div>
          <div>Icons</div>
        </div>
      </routerLink>
     -->
    </div>
    <div>
      <div class="flex menyItems">
        <div>
          <v-icon name="bi-box-arrow-left" fill="gray" scale="1.4" />
        </div>
        <div>Sign out</div>
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
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin: 0.5rem;

    & * {
      display: flex;
      width: 100%;
      align-items: center;
      flex-grow: 0;
      width: 3rem;
    }
    & div:last-child {
      width: 15rem;
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
