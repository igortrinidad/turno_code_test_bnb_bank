<template>
  <div
    class="w-screeh h-screen overflow-y-auto flex flex-col gap-12 py-16 px-4 items-center">
    <div class="mobile-app-wrapper">
      <div class="mobile-app-buttons h-[32px] top-[72px]"></div>
      <div class="mobile-app-buttons h-[46px] top-[124px]"></div>
      <div class="mobile-app-buttons h-[46px] top-[178px]"></div>
      <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div class="relative bg-white w-full h-full select-none">

          <template v-if="useRoute().path != '/'">
            <NavBar />
            <SideBar :items="getSidebarItems"/>
          </template>

          <template v-else>
            <div class="w-full p-8 py-12 flex flex-col items-center justify-center bg-blue-500">
              <h1 class="text-white">BNB BANK</h1>
            </div>
          </template>

          <div class="w-full h-full max-h-full overflow-y-auto hide-scrollbar pb-32">
            <slot />
          </div>

          <Toast />

        </div>
      </div>
    </div>

    <div class="w-full flex flex-col gap-4 items-center justify-center">
      <p class="text-center text-sm">
        This application serves as a demonstration project created for the coding interview conducted by <a class="text-blue-500 font-bold" href="https://turno.com" target="_blank">Turno</a>.
      </p>

      <div class="w-full flex justify-center items-center text-4xl">
        <NuxtLink to="https://github.com/igortrinidad/turno_code_test_banking" target="_blank">
          <Icon name="mdi:github" />
        </NuxtLink>
      </div>
    </div>

  </div>
</template>
<script setup>
  import NavBar from '@/layouts/components/NavBar.vue'
  import SideBar from '@/layouts/components/SideBar.vue'

  const userSidebarItems = [
    {
      label: 'BALANCE',
      icon: 'icon-park-solid:balance-two',
      action: null,
      to: '/statement'
    },
    {
      label: 'INCOMES',
      icon: 'material-symbols:subdirectory-arrow-left-rounded',
      iconClass: 'rotate-90 scale-y-[-1]',
      action: null,
      to: '/income'
    },
    {
      label: 'EXPENSES',
      icon: 'material-symbols:subdirectory-arrow-left-rounded',
      iconClass: '-rotate-90',
      action: null,
      to: '/expense'
    },
    {
      label: 'CHECKS',
      icon: 'material-symbols:checkbook-rounded',
      action: null,
      to: '/deposit'
    },
    {
      label: 'NOTIFICATIONS',
      icon: 'material-symbols:notifications-rounded',
      action: null,
      to: null
    },
    {
      label: 'PROFILE',
      icon: 'material-symbols:person-2-rounded',
      action: null,
      to: null
    },
    {
      label: 'SETTINGS',
      icon: 'material-symbols:settings-rounded',
      action: null,
      to: null
    },
    {
      label: 'HELP',
      icon: 'material-symbols:help',
      action: null,
      to: null
    },
  ]

  const adminSidebarItems = [
    {
      label: 'CHECKS',
      icon: 'material-symbols:checkbook-rounded',
      action: null,
      to: '/admin/check'
    }
  ]

  const getSidebarItems = computed(() => {
    const role = useUserStore().loggedUser.role
    return role === 'admin' ? adminSidebarItems : userSidebarItems
  })

</script>

<style lang="scss">
.mobile-app-wrapper {
  @apply relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)];


  .mobile-app-buttons {
    @apply w-[3px] bg-gray-800 dark:bg-gray-800 absolute rounded-s-lg -start-[17px];
  }
}
</style>