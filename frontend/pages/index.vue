<template>
  <div class="w-full flex flex-col gap-4 pt-12 p-2">

    <InputWithIcon
      v-model:value="username"
      icon="material-symbols:person-outline-rounded"
      placeholder="Insert your username"
      id_input="username"
    />

    <InputWithIcon
      v-model:value="password"
      icon="material-symbols:lock-open-outline-rounded"
      placeholder="Insert your password"
      type="password"
      id_input="password"
    />

    <button 
      @click="login()"
      class="btn btn-primary"
    >
      <Icon 
        v-if="useUserStore().isLoading"
        name="svg-spinners:90-ring-with-bg"
        class="absolute top-2 left-6"
      />
      Login
    </button>

    <hr />

    <button class="btn btn-ghost" @click="fillUserInfo('user')">
      FILL CUSTOMER USER
    </button>

    <button class="btn btn-ghost" @click="fillUserInfo('admin')">
      FILL ADMIN
    </button>

  </div>
</template>
<script setup>


  const username = ref('')
  const password = ref('')

  const login = async () => {
    useUserStore().login(username.value, password.value)
  }

  const fillUserInfo = (type) => {
    if(type === 'admin') {
      username.value = 'admin@test.com'
    } else {
      username.value = 'customer@test.com'
    }
    password.value = 'password'
  }

</script>