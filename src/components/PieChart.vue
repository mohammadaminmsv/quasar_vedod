<template>
  <div class="q-pa-md" style="min-height: 300px; position: relative">
    <div v-if="loading" class="flex flex-center absolute-full bg-transparent">
      <q-spinner color="primary" size="50px" />
    </div>

    <div class="row">
      <div class="col-12 col-md-4">
        <div class="text-subtitle1 q-mb-md">محدوده انتخاب تاریخ:</div>
        <div class="flex col-grow">
          <slot></slot>
        </div>
      </div>

      <div class="col-12 col-md-8" v-show="!loading">
        <div ref="piechartContainer" style="min-height: 300px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps({
  title: { type: String, default: 'نمودار پای' },
  data: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

const piechartContainer = ref(null)
let chart = null

const chartOptions = ref({
  chart: { type: 'pie' },
  title: { text: props.title },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'contrast',
        },
      },
    },
  },
  series: [
    {
      name: 'مقدار',
      data: [...props.data], // آرایه جدید
    },
  ],
})

onMounted(() => {
  if (piechartContainer.value) {
    chart = Highcharts.chart(piechartContainer.value, chartOptions.value)
  }
})

watch(
  () => [props.title, props.data],
  () => {
    if (!chart) return
    chart.update({
      title: { text: props.title },
      series: [
        {
          data: [...props.data],
        },
      ],
    })
  },
  { deep: true },
)
</script>

<style scoped>
.absolute-full {
  position: absolute;
  inset: 0;
}
</style>
