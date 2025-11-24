<template>
  <q-form class="flex justify-center el-messiri q-my-xl items-center">
    <div class="q-gutter-y-sm">
      <div class="row q-gutter-x-md">
        <q-input
          dense
          filled
          type="text"
          v-model="model.name"
          label="نام"
          :rules="[(val) => !!val || '']"
          no-error-icon
        />
        <q-input
          dense
          filled
          type="text"
          v-model="model.lastname"
          label="نام خانوادگی"
          :rules="[(val) => !!val || '']"
          no-error-icon
        />
      </div>
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
        type="tel"
        v-model="model.tel"
        label="شماره تلفن"
        maxlength="11"
        :rules="[
          (val) => !!val || 'شماره تلفن الزامی است',
          (val) => /^09[0-9]{9}$/.test(val) || 'فرمت شماره تلفن معتبر نیست (09xxxxxxxxx)',
        ]"
        no-error-icon
      />
      <q-input
        dense
        filled
        type="text"
        v-model="model.age"
        label="تاریخ تولد"
        hint="1380/10/25"
        maxlength="10"
        mask="date"
        :rules="[(val) => !!val || '']"
        no-error-icon
      />
      <q-radio
        v-model="model.gender"
        checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye"
        val="male"
        label="مرد"
      />
      <q-radio
        v-model="model.gender"
        checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye"
        val="female"
        label="زن"
      />
      <div class="row q-gutter-x-md">
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
        <q-input
          dense
          filled
          type="password"
          v-model="rePassword"
          label="تکرار رمز"
          :rules="[
            (val) => !!val || 'تکرار رمز عبور الزامی است',
            (val) => val === model.password || 'رمز عبور و تکرار آن مطابقت ندارند',
          ]"
          no-error-icon
        />
      </div>
      <q-toggle v-model="toggleRule" label="قوانین ثبت نام ثبول دارم" />
      <div class="q-gutter-x-md">
        <q-btn :disable="!toggleRule" color="pink" text-color="black" push @click="showMessage"
          >ثبت نام</q-btn
        >
        <q-btn color="grey-5" text-color="black" push @click="showMessage">پاک کردن</q-btn>
        <router-link class="text-subtitle1 text-blue-grey-8 q-pa-md rounded-borders" to="/login"
          >قبلا ثبت نام کردم!</router-link
        >
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { reactive, ref } from 'vue'

const $q = useQuasar()
const showMessage = () => {
  console.log($q)
  $q.notify({
    type: 'info',
    message: 'This is a "info" type notification.',
  })
  $q.notify({
    type: 'warning',
    message: 'This is a "warning" type notification.',
  })
  $q.notify({
    type: 'positive',
    message: 'This is a "positive" type notification.',
  })
  $q.notify({
    type: 'negative',
    message: 'This is a "negative" type notification.',
  })
}

const toggleRule = ref(false)
const rePassword = ref('')
const model = reactive({
  name: '',
  lastname: '',
  email: '',
  age: '',
  password: '',
  tel: '',
  gender: 'male',
})
</script>
