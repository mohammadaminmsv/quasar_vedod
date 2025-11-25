import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'black',
  actions: [{ icon: 'close', color: 'black' }],
  iconColor: 'primary',
  progress:true
})


// $q.notify({
//     type: 'info',
//     message: 'This is a "info" type notification.',
//   })
//   $q.notify({
//     type: 'warning',
//     message: 'This is a "warning" type notification.',
//   })
//   $q.notify({
//     type: 'positive',
//     message: 'This is a "positive" type notification.',
//   })
//   $q.notify({
//     type: 'negative',
//     message: 'This is a "negative" type notification.',
//   })