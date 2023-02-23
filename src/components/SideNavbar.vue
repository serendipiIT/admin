<template>
  <nav
    class="fixed flex flex-col justify-between h-screen border-r-2 w-56 text-gray-500 py-16 px-4"
  >
    <div>
      <img src="/assets/b-logo.png" alt="" class="w-1/2 m-auto" />
    </div>
    <div
      class="flex flex-col justify-center focus-within:text-gray-600 [&>*]:flex [&>*]:m-2 [&>*]:rounded-lg"
    >
      <div
        class="hover:bg-gray-200 hover:text-black focus-within:text-black focus-within:bg-gray-200"
      >
        <div class="py-2 px-3">
          <v-icon name="md-dashboard" fill="gray" scale="1.4" />
        </div>
        <routerLink class="py-2 px-3" :to="{ name: 'home' }"
          >Dashboard</routerLink
        >
      </div>
      <div
        class="hover:bg-gray-200 hover:text-black focus-within:text-black focus-within:bg-gray-200"
      >
        <div class="py-2 px-3">
          <v-icon name="md-librarybooks-outlined" fill="gray" scale="1.4" />
        </div>
        <routerLink class="py-2 px-3" :to="{ name: 'Categories' }"
          >Categories</routerLink
        >
      </div>
      <div
        class="hover:bg-gray-200 hover:text-black focus-within:text-black focus-within:bg-gray-200"
      >
        <div class="py-2 px-3">
          <v-icon name="bi-archive" fill="gray" hover scale="1.4" />
        </div>
        <routerLink class="py-2 px-3" :to="{ name: 'Orders' }"
          >Orders</routerLink
        >
      </div>
      <div
        class="hover:bg-gray-200 hover:text-black focus-within:text-black focus-within:bg-gray-200"
      >
        <div class="py-2 px-3">
          <v-icon name="md-groups-outlined" fill="gray" scale="1.4" />
        </div>
        <routerLink class="py-2 px-3" :to="{ name: 'Customers' }"
          >Customers</routerLink
        >
      </div>
      <div
        class="hover:bg-gray-200 hover:text-black focus-within:text-black focus-within:bg-gray-200"
      >
        <div class="py-2 px-3">
          <v-icon name="md-designservices-outlined" fill="gray" scale="1.4" />
        </div>
        <routerLink class="py-2 px-3" :to="{ name: 'Design' }"
          >Design</routerLink
        >
      </div>
      <div
        class="flex hover:bg-gray-200 hover:text-black focus-within:text-black focus-within:bg-gray-200"
      >
        <routerLink :to="{ name: 'Pages' }">
          <span class="py-2 px-3">
            <v-icon name="md-web" fill="gray" scale="1.4" />
          </span>
          <span class="py-2 px-3">Pages</span>
        </routerLink>
      </div>
    </div>
    <div>
      <div class="flex">
        <div class="py-2 px-3">
          <v-icon name="bi-box-arrow-left" fill="gray" scale="1.4" />
        </div>
        <p class="py-2 px-3">Sign out</p>
      </div>
    </div>
  </nav>
</template>

<script>
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import {
    MdDashboard,
    MdLibrarybooksOutlined,
    BiArchive,
    MdGroupsOutlined,
    MdDesignservicesOutlined,
    MdWeb,
    BiBoxArrowLeft,
  } from 'oh-vue-icons/icons'
  addIcons(
    MdDashboard,
    MdLibrarybooksOutlined,
    BiArchive,
    MdGroupsOutlined,
    MdDesignservicesOutlined,
    MdWeb,
    BiBoxArrowLeft,
  )

  export default {
    name: 'SideNavbar',
    components: {
      'v-icon': OhVueIcon,
    },
  }
</script>

<style lang="scss" scoped></style>
