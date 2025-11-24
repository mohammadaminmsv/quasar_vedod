<template>
  <q-form class="flex justify-center el-messiri q-my-xl items-center">
    <div class="q-gutter-y-sm" style="min-width: 30%">
      <q-input
        dense
        filled
        type="email"
        v-model="model.email"
        hint="exmaple@gmail.com"
        label="ایمیل "
        :rules="[
          (val) => !!val || 'ایمیل الزامی است',
          (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'فرمت ایمیل معتبر نیست',
        ]"
        lazy-rules
        error-message="لطفا ایمیل را به درستی وارد نمایید"
        no-error-icon
      />
      <q-input
        dense
        filled
        type="password"
        v-model="model.password"
        label="رمز"
        :rules="[
          (val) => !!val || 'رمز عبور الزامی است',
          (val) => val.length >= 6 || 'رمز عبور باید حداقل ۶ کاراکتر باشد',
          (val) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(val) || 'رمز عبور باید شامل حرف و عدد باشد',
        ]"
        no-error-icon
      />

      <div class="q-mb-md">
        <q-btn color="pink" text-color="black" push @click="showMessage">ورود</q-btn>
      </div>
      <router-link class="text-subtitle1 text-blue-grey-8 q-mt-md rounded-borders" to="/register">
        ثبت نام کنید!</router-link
      >
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { requestUserById } from 'src/requests/user'
import { reactive } from 'vue'

const $q = useQuasar()
const showMessage = async () => {
  console.log($q)
  try {
    const userData = await requestUserById('cmidltwis3vme06peltb5jls7')
    console.log(userData)
  } catch (error) {
    console.log(error)
  }
}



const model = reactive({
  email: '',
  password: '',
})
</script>
