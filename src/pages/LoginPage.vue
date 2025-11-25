<template>
  <q-form class="flex justify-center el-messiri q-my-xl items-center" @submit="onSubmit">
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
        :type="showPas ? 'password' : 'text'"
        v-model="model.password"
        label="رمز"
        :rules="[
          (val) => !!val || 'رمز عبور الزامی است',
          (val) => val.length >= 6 || 'رمز عبور باید حداقل ۶ کاراکتر باشد',
          (val) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(val) || 'رمز عبور باید شامل حرف و عدد باشد',
        ]"
        no-error-icon
      >
      <template v-slot:append>
          <q-icon
            :name="showPas ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPas = !showPas"
          />
        </template>
      </q-input>

      <div class="q-mb-md">
        <q-btn color="pink" text-color="black" type="submit" push>ورود</q-btn>
      </div>
      <router-link class="text-subtitle1 text-blue-grey-8 q-mt-md rounded-borders" to="/register">
        ثبت نام کنید!</router-link
      >
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { requestUserByEmail } from 'src/requests/user'
import { useAuthStore } from 'src/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const auth = useAuthStore()
const router = useRouter()
const showPas = ref(true)
const onSubmit = async () => {
  $q.loading.show({
    message: 'در حال بارگیری لطفا صبر کنید',
  })
  try {
    const respone = await requestUserByEmail(model.email)
    if (respone?.myUser[0]?.password !== model.password) {
      $q.notify({
        type: 'warning',
        message: 'رمز عبور صحیح نیست',
      })
    } else {
      auth.loginAct(respone.myUser[0])
      router.push('/')
    }
  } catch (error) {
    console.log(error)
    $q.notify({
      type: 'negative',
      message: error,
    })
  } finally {
    $q.loading.hide()
  }
}

const model = reactive({
  email: '',
  password: '',
})
</script>
