<script>
  import SideNavbar from './components/SideNavbar.vue'
  import { useFilterModal } from './filterModal'
  export default {
    setup() {
      const filterModal = useFilterModal()

      return {
        closeFilterModal: filterModal.closeFilter,
      }
    },
    components: { SideNavbar },
  }
</script>

<template>
  <SideNavbar />
  <main @click="closeFilterModal" class="sm:ml-56 bg-gray-50 h-full p-8 bg-fixed">
    <RouterView />
  </main>
</template>

<style lang="scss">
  .componentCard {
    background-color: #fff;
    border-radius: 1rem;
    margin: 1rem;
    padding: 1.2rem;
    box-shadow: 2px 2px 5px 5px rgba(225, 225, 225, 0.68);
  }

  .componentTitle {
    margin: 1.2rem;
  }

  .textFieldInput {
    border: 1px solid #b9b9b9;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
    gap: 0;
    flex-direction: row;
    input,
    select {
      background: none;
      border: transparent;
      margin: 0;
      text-transform: none;
      width: min-content;
      &:focus-visible {
        outline: none;
      }
    }
    select {
      width: 100%;
    }
  }

  .btn-arrow {
    padding: 0.5rem !important;
  }

  .button-68 {
    appearance: none;
    backface-visibility: hidden;
    border-radius: 8px;
    border-style: none;
    box-shadow: rgba(119, 119, 119, 0.15) 0 4px 9px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-family: Inter, -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: normal;
    line-height: 1.5;
    outline: none;
    overflow: hidden;
    padding: 13px 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transform: translate3d(0, 0, 0);
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
    background-color: #ffffff;
  }

  .button-68:hover {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
    background-color: #dddddd;
  }

  .button-68:active {
    transform: translateY(2px);
    transition-duration: 0.35s;
  }

  .button-68:hover {
    box-shadow: rgba(124, 124, 124, 0.2) 0 6px 12px;
  }

  .greenW {
    background-color: #27ae60;
    color: #fff;
    &:hover {
      background-color: #1e8449;
    }
  }

  .blueW {
    background-color: #3d22a0;
    color: #fff;
    &:hover {
      background-color: #1c1763;
    }
  }

  .redW {
    background-color: #a71e1e;
    color: #fff;
    &:hover {
      background-color: #760e0e;
    }
  }
</style>
