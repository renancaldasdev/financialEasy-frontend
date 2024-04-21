<template>
  <aside class="flex h-screen">
    <div class="bg-defaultBlack text-white w-64 flex flex-col">
      <div class="h-16 flex items-center justify-center">
        <RouterLink to="/dashboard">
          <h1 class="text-xl font-bold">MyFinancy<span class="font-light">Easy</span></h1>
        </RouterLink>
      </div>
      <nav class="flex-1">
        <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <div>
            <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">{{ menuGroup.name }}</h3>

            <ul class="mb-6 flex flex-col gap-1.5">
              <SidebarItem
                v-for="(menuItem, index) in menuGroup.menuItems"
                :item="menuItem"
                :key="index"
                :index="index"
              />
            </ul>
          </div>
        </template>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const menuGroups = ref([
  {
    menuItems: [
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 14H14V21H21V14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 14H3V21H10V14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 3H14V10H21V3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 3H3V10H10V3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
        label: 'Dashboard',
        route: '/dashboard'
      }
    ]
  }
])
</script>
