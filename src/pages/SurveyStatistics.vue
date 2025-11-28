<template>
  <q-form @submit="inserPollFun" class="q-pa-lg">
    <div class="q-pa-sm">نظر سنجی</div>
    <div class="q-gutter-sm">
      <q-radio
        v-for="opt in PollsObtions"
        :key="opt.uuid"
        v-model="selectedOption"
        checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye"
        :val="opt.id"
        :label="opt.value"
      />
    </div>
    <div>
      <q-btn type="submit" fill dense color="blue-8" class="q-px-lg">ثبت</q-btn>
    </div>
  </q-form>

  <SolarChart />
</template>
<script setup>
import { useQuasar } from 'quasar'
import SolarChart from 'src/components/SolarChart.vue'
import { getPolls, postPolls, postRes } from 'src/requests/PollRequest'
import { onMounted, ref } from 'vue'

const $q = useQuasar()
let PollsObtions = ref([])
const title = ref('در حال بارگذاری...')
const selectedOption = ref(null)

onMounted(() => {
  makePolls()
  pollResault()
})

const makePolls = async () => {
  $q.loading.show({
    message: 'در حال بارگیری لطفا صبر کنید',
  })
  try {
    const data = await getPolls('3RnYXo5kWye')
    title.value = data.title
    PollsObtions.value = data.poll_options
  } catch (error) {
    console.log(error)
  } finally {
    $q.loading.hide()
  }
}

const inserPollFun = async () => {
  if (!selectedOption.value) {
    $q.notify({ type: 'negative', message: 'لطفاً یک گزینه انتخاب کنید!' })
    return
  }

  $q.loading.show()

  try {
    const res = await postPolls('3RnYXo5kWye', selectedOption.value)
    console.log('رأی ثبت شد:', res)

    $q.notify({ type: 'positive', message: 'رأی شما ثبت شد!' })
  } catch (error) {
    $q.notify({ type: 'negative', message: error })
  } finally {
    $q.loading.hide()
    pollResault()
  }
}

const pollResault = async () => {
  $q.loading.show({
    message: 'در حال بارگیری لطفا صبر کنید',
  })
  try {
    const response = await postRes('3RnYXo5kWye')
    console.log(response)
  } catch (error) {
    console.error('خطا در ثبت رأی:', error)
  } finally {
    $q.loading.hide()
  }
}
</script>
