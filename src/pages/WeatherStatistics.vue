<template>
  <div class="q-gutter-y-xl">
    <div>
      <pie-chart title="نمودار بارش باران" :data="series" :loading="loading">
        <div class="col justify-center items-center q-gutter-y-sm">
          <q-input v-model="from" label="از" type="date" dense outlined />
          <q-input v-model="to" label="تا" type="date" dense outlined />
          <div class="q-mt-md">کل روز های بارندگی :{{ rainyDays?.rain }}</div>
          <div class="q-mt-md">کل روز ها :{{ rainyDays?.total }}</div>
        </div>
      </pie-chart>
    </div>
    <div>
      <pie-chart title="نمودار بارش برف" :data="seriesSnow" :loading="loadingSnow">
        <div class="col justify-center items-center q-gutter-y-sm">
          <q-input v-model="fromSnow" label="از" type="date" dense outlined />
          <q-input v-model="toSnow" label="تا" type="date" dense outlined />
          <div class="q-mt-md">کل روز های بارندگی :{{ snowyDays?.rain }}</div>
          <div class="q-mt-md">کل روز ها :{{ snowyDays?.total }}</div>
        </div>
      </pie-chart>
    </div>
  </div>
</template>
<script setup>
import PieChart from 'src/components/PieChart.vue'
import { getRainForCharts } from 'src/requests/chartWeather'
import { onMounted, ref, watch } from 'vue'

const series = ref([
  { name: 'روز بارانی', y: 0 },
  { name: 'روز بدون بارش', y: 0 },
])
const seriesSnow = ref([
  { name: 'روز برفی', y: 0 },
  { name: 'روز بدون بارش', y: 0 },
])

const loading = ref(false)
const loadingSnow = ref(false)
const from = ref('2025-01-01')
const to = ref(new Date().toISOString().split('T')[0])
const fromSnow = ref('2025-01-01')
const toSnow = ref(new Date().toISOString().split('T')[0])
const rainyDays = ref({
  total: 365,
  rain: 0,
})
const snowyDays = ref({
  total: 365,
  rain: 0,
})

onMounted(() => {
  getWeatherData()
  getWeatherDataSnow()
})
watch([from, to], () => {
  getWeatherData()
})
watch([fromSnow, toSnow], () => {
  getWeatherDataSnow()
})

const getWeatherData = async () => {
  if (!from.value || !to.value) return
  loading.value = true
  try {
    const data = await getRainForCharts(from.value, to.value)
    const days = data.data || []
    rainyDays.value.rain = days.filter((d) => d.prcp && d.prcp > 0).length
    rainyDays.value.total = days.length
    series.value = [
      { name: 'روز بارانی', y: rainyDays.value.rain },
      { name: 'روز بدون بارش', y: days.length - rainyDays.value.rain },
    ]
    console.log(series.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
const getWeatherDataSnow = async () => {
  if (!fromSnow.value || !toSnow.value) return
  loadingSnow.value = true
  try {
    const data = await getRainForCharts(fromSnow.value, toSnow.value)
    const days = data.data || []
    snowyDays.value.rain = days.filter((d) => d.snow && d.snow > 0).length
    snowyDays.value.total = days.length
    seriesSnow.value = [
      { name: 'روز برفی', y: snowyDays.value.rain },
      { name: 'روز بدون بارش', y: days.length - snowyDays.value.rain || snowyDays.value.total },
    ]
    console.log(series.value)
  } catch (error) {
    console.error(error)
  } finally {
    loadingSnow.value = false
  }
}
</script>
