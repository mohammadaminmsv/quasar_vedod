import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'black',
  actions: [{ icon: 'close', color: 'black' }],
  iconColor: 'primary',
  progress:true
})