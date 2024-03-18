<template>
  <aside
    class="w-full h-full absolute top-0 bottom-0 left-0 bg-blue-500 transition-all duration-300 ease-in-out z-50"
    :class="[
      getSidebarClass,
    ]"
  >
    <Transition name="fade" :mode="useSharedStore().menuIsOpen ? 'out-in' : 'in-out'">
      <div 
        v-if="useSharedStore().menuIsOpen"
        class="sidebar h-full whitespace-nowrap"
      >

      <div class="w-full p-4 bg-blue-200 text-white">
        <button 
          @click="toggleMenuIsOpen()"
          class="absolute top-4 right-4"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="text-2xl"
          />
        </button>

        <div class="py-7 px-4 flex flex-col items-center justify-center">
          <h1>BNB BANK</h1>
        </div>
      </div>

        <ul class="flex flex-col text-xl z-10 max-h-[70vh] overflow-y-auto hide-scrollbar pb-8">
          <li 
            v-for="(sidebarLink, index) in items" 
            :key="`sidebar_link_${ index}`"
            :title="(!sidebarLink.to && !sidebarLink.action) ? 'This resource is not yet implemented' : ''"
          >
            <NuxtLink 
              :to="sidebarLink.to" 
              class="sidebar-link" 
              :class="[
                { 'opacity-40 !cursor-not-allowed' : (!sidebarLink.to && !sidebarLink.action) }
              ]"
              @click="useSharedStore().menuIsOpen = false"
            >
              <Icon 
                :name="sidebarLink.icon" 
                class="mr-6 text-white/40 text-2xl" 
                :class="sidebarLink.iconClass"
              />
              <span>{{ sidebarLink.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      
      </div>
    </Transition>
  </aside>
</template>

<script setup>

import { storeToRefs } from 'pinia'

const { menuIsOpen, menuIsCollapsed } = storeToRefs(useSharedStore())

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
})

const getSidebarClass = computed(() => {
  return !useSharedStore().menuIsOpen ? 'max-w-[0px]' : 'max-w-full'
})


const toggleMenuIsOpen = () => {
  useSharedStore().toggleMenuIsOpen()
}

const handleKeyUp = (event) => {
  if (event.key === 'Escape' && menuIsOpen.value) {
    toggleMenuIsOpen()
  }
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyUp)
})

</script>

<style lang="scss">


.sidebar  {
  @apply  h-full flex flex-col relative;

  .router-link-active {
    @apply bg-gray-800/50  hover:bg-gray-800/80;

    svg {
      @apply text-blue-600;
    }
  }
}

.sidebar-link {
  @apply
    transition-all
    bg-transparent
    hover:bg-gray-800/40
    flex
    items-center
    pl-7
    h-12
    cursor-pointer
    text-white
    text-lg
    border-transparent
    border-r-[6px];

    span {
      @apply
      max-w-[70%]
      text-ellipsis
      truncate
      text-sm
    }
}

</style>


