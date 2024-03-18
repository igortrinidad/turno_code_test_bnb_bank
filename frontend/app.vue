<template>
  <Html lang="en">
    <Head>
      <Meta charset="utf-8" />
      <Title>BNB Banking</Title>
    </Head>

    <Body id="body" class="body-class hide-scrollbar">
      <NuxtLoadingIndicator :height="4" :throttle="25" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup>

  import '@/styles/main.scss'

  import { CommonHelpers } from '@igortrindade/lazyfy'
  import { getActivePinia } from 'pinia'

  onMounted(() => {
    
    useEmitter().on('clearLocalCache', () => {
      clearLocalCache()
    })

    if (typeof window !== 'undefined') {
      initListenerClearCacheAndIndexedDb()
    }

    useSharedStore().menuIsOpen = false
  })

  onBeforeUnmount(() => {
    useEmitter().off('clearLocalCache')
  })

  const initListenerClearCacheAndIndexedDb = () => {
    CommonHelpers.clearBrowserCacheListener('KeyX', true, clearLocalCache)
  }

  const clearLocalCache = () => {
    CommonHelpers.clearBrowserCache()
    document.cookie.replace(/(?:\/)([^#]+)(?=#|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain = domain.replace(/^\.?[^.]+/, ''), document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`, domain), location.hostname));
    getActivePinia()._s.forEach(store => store.$reset());
    useRouter().push('/')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

</script>
