<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps({
  chart: {
    type: String,
    required: false,
    default: 'column',
    validator: (value) => ['column', 'bar'].includes(value),
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  xAxis: {
    type: Array,
    required: true,
  },
  yAxis: {
    type: Object,
    required: false,
    default: () => ({ title: { text: 'مقادیر' } }),
  },
  series: {
    type: Array,
    required: true,
  },
})

const chartContainer = ref(null)

const chartOptions = {
  chart: {
    type: props.chart,
  },
  title: {
    text: props.title,
  },
  xAxis: {
    categories: props.xAxis,
    title: {
      text: props.xAxisTitle || '',
    },
  },
  yAxis: props.yAxis,
  series: props.series,
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: false,
      },
    },
    column: {
      dataLabels: {
        enabled: false,
      },
    },
  },
  credits: {
    enabled: false,
  },
}

onMounted(() => {
  if (chartContainer.value) {
    Highcharts.chart(chartContainer.value, chartOptions)
  }
})

watch(
  () => [props.chart, props.title, props.xAxis, props.series],
  () => {
    if (chartContainer.value) {
      Highcharts.chart(chartContainer.value, {
        ...chartOptions,
        chart: { type: props.chart },
        title: { text: props.title },
        xAxis: { categories: props.xAxis },
        series: props.series,
      })
    }
  },
  { deep: true },
)
</script>

<style scoped>
div {
  width: 100%;
  height: 400px;
}
</style>
