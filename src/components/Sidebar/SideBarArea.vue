<template>
  <aside class="flex h-screen">
    <div class="bg-defaultBlack text-white w-64 flex flex-col">
      <div class="h-16 flex items-center justify-center">
        <RouterLink to="/app/dashboard">
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
        icon: `<svg class="ov-icon" aria-hidden="true" width="24" height="24" viewBox="-48.96 -80.96 673.92 673.92" fill="#fff" style="font-size: 2.88em;"><path d="M280.37 148.26L96 300.11V464a16 16 0 0016 16l112.06-.29a16 16 0 0015.92-16V368a16 16 0 0116-16h64a16 16 0 0116 16v95.64a16 16 0 0016 16.05L464 480a16 16 0 0016-16V300L295.67 148.26a12.19 12.19 0 00-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 00-12-12h-56a12 12 0 00-12 12v72.61L318.47 43a48 48 0 00-61 0L4.34 251.47a12 12 0 00-1.6 16.9l25.5 31A12 12 0 0045.15 301l235.22-193.74a12.19 12.19 0 0115.3 0L530.9 301a12 12 0 0016.9-1.6l25.5-31a12 12 0 00-1.7-16.93z"></path></svg>
          `,
        label: 'Dashboard',
        route: '/app/dashboard'
      }
    ]
  }
])
</script>
