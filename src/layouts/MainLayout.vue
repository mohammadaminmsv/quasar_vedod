<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="vazirmatn-amin bg-blue-10">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleRightDrawer" />

        <q-toolbar-title> داشبورد امین </q-toolbar-title>
        <div>v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :mini-width="220" width="220" show-if-above elevated>
      <q-list class="q-gutter-y-md" padding tag="div">
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-footer elevated class="vazirmatn-amin bg-blue-10">
      <q-toolbar>
        <q-toolbar> داشبورد امین </q-toolbar>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'آمار کاربران',
    caption: 'تعداد کاربران بازدید کننده',
    icon: 'groups',
    to: 'userStatistics',
    link: '/userStatistics',
  },
  {
    title: 'نظر سنجی',
    caption: 'نظرات و نظر دهی',
    icon: 'trending_up',
    to: 'surveyStatistics',
    link: '/surveyStatistics',
  },
  {
    title: 'هواشناسی',
    caption: 'مروری بر آسمان',
    icon: 'cloud',
    to: 'WeatherStatistics',
    link: '/WeatherStatistics',
  },
  {
    title: 'خرید و فروش',
    caption: 'گزارش سفارشات و درآمد',
    icon: 'storefront',
    to: 'IncomeStatistics',
    link: '/IncomeStatistics',
  },
  {
    title: 'بورس',
    caption: 'نگاهی به بازار های مالی',
    icon: 'currency_exchange',
    to: 'StockStatistics',
    link: '/StockStatistics',
  },
  {
    title: 'سلامت و پزشکی',
    caption: 'وضعیت بهداشت و درمان',
    icon: 'medical_services',
    to: 'HealthStatistics',
    link: '/HealthStatistics',
  },
]

const leftDrawerOpen = ref(false)

function toggleRightDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
