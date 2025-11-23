<template>
  <q-item
    class="el-messiri"
    clickable
    :tag="props.name"
    v-ripple
    active-class="my-menu-link"
    :to="props.to"
    :active="$route.path === props.link"
  >
    <q-item-section v-if="props.icon" avatar>
      <q-icon color="primary" size="md" :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #79c4e6
</style>
