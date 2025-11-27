<template>
  <q-page padding>
    <div class="q-pa-md row justify-center items-center q-gutter-x-sm" style="max-width: 30%">
      <span>تعداد کاربران :</span>
      <q-select outlined dense v-model="total" :options="options" class="col-grow" />
    </div>
    <BarChart
      chart="column"
      title="تعداد کاربران متولد شده در هر ماه"
      :xAxis="[
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ]"
      :series="[series]"
      :yAxis="{
        title: {
          text: 'تعداد کاربران',
        },
      }"
    />
    <div class="q-pa-md row justify-center items-center q-gutter-x-sm" style="max-width: 30%">
      <span>تعداد کاربران :</span>
      <q-select outlined dense v-model="totalGender" :options="optionsGender" class="col-grow" />
    </div>
    <BarChart
      chart="bar"
      title="آمار متولدین کاربران زن و مرد"
      :xAxis="['زمستان', 'پاییز', 'تابستان', 'بهار']"
      :yAxis="{
        title: {
          text: 'تعداد فروش',
        },
      }"
      :series="seriesGender"
    />
  </q-page>
</template>
<script setup>
import { useQuasar } from 'quasar'
import BarChart from 'src/components/BarChart.vue'
import { getUserForCharts } from 'src/requests/chartUser'
import { userGender } from 'src/requests/user'
import { onMounted, reactive, ref, watch } from 'vue'
const $q = useQuasar()
const options = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '30',
    value: 30,
  },
  {
    label: '60',
    value: 60,
  },
  {
    label: '120',
    value: 120,
  },
  {
    label: '200',
    value: 200,
  },
  {
    label: 'همه',
    value: 0,
  },
]
const optionsGender = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '30',
    value: 30,
  },
  {
    label: '60',
    value: 60,
  },
  {
    label: '120',
    value: 120,
  },
  {
    label: '200',
    value: 200,
  },
  {
    label: 'همه',
    value: 10000,
  },
]
const total = ref(10)
const totalGender = ref(10)
const user = ref({})
let series = reactive({
  name: 'تعداد کاربران',
  data: [],
})
let seriesGender = reactive([
  {
    name: 'مردان',
    data: [],
  },
  {
    name: 'زنان',
    data: [],
  },
])
onMounted(() => {
  showUserBirth()
  showUserGender()
})

watch(total, (newValue, oldValue) => {
  console.log('تعداد کاربران تغییر کرد از', oldValue, 'به', newValue)
  series.data = []
  showUserBirth()
})
watch(totalGender, (newValue, oldValue) => {
  console.log('تعداد کاربران تغییر کرد از', oldValue, 'به', newValue)
  seriesGender[0].data = []
  seriesGender[1].data = []
  showUserGender()
})

const showUserBirth = async () => {
  $q.loading.show({
    message: 'در حال بارگیری لطفا صبر کنید',
  })
  try {
    user.value = await getUserForCharts(total.value.value || 10)
    const monthCounts = Array(12).fill(0)

    user.value.users
      .map((x) => x.birthDate)
      .forEach((date) => {
        const month = parseInt(date.split('-')[1]) - 1
        monthCounts[month]++
      })
    series.data = monthCounts
  } catch (error) {
    console.log(error)
  } finally {
    $q.loading.hide()
  }
}

const showUserGender = async () => {
  $q.loading.show({
    message: 'در حال بارگیری لطفا صبر کنید',
  })
  try {
    const { data } = await userGender(totalGender.value.value || 10)
    const maleCounts = Array(12).fill(0)
    const femaleCounts = Array(12).fill(0)

    data.myUser
      .filter((user) => user && user.gender === 'male' && user.age)
      .forEach((user) => {
        try {
          if (user.age.includes('/')) {
            const parts = user.age.split('/')
            if (parts.length >= 2) {
              const month = parseInt(parts[1])
              if (!isNaN(month) && month >= 1 && month <= 12) {
                maleCounts[month - 1]++
              }
            }
          }
        } catch (error) {
          console.log('خطا در پردازش کاربر:', user, error)
        }
      })

    data.myUser
      .filter((user) => user && user.gender === 'female' && user.age)
      .forEach((user) => {
        try {
          if (user.age.includes('/')) {
            const parts = user.age.split('/')
            if (parts.length >= 2) {
              const month = parseInt(parts[1])
              if (!isNaN(month) && month >= 1 && month <= 12) {
                femaleCounts[month - 1]++
              }
            }
          }
        } catch (error) {
          console.log('خطا در پردازش کاربر:', user, error)
        }
      })
    seriesGender[0].data = chunkSum(maleCounts)
    seriesGender[1].data = chunkSum(femaleCounts)
  } catch (error) {
    console.log(error)
  } finally {
    $q.loading.hide()
  }
}
function chunkSum(arr) {
  let result = []
  for (let i = 0; i < arr.length; i += 3) {
    const chunk = arr.slice(i, i + 3)
    result.push(chunk.reduce((sum, num) => sum + num, 0))
  }
  return result.reverse()
}
</script>
