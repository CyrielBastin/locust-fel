import {
  createApp,
  defineComponent,
  h,
  hFragment,
  RouterOutlet,
} from './locust.js'
import { router } from './router.js'

const App = defineComponent({
  render() {
    return hFragment([
      h('header', { class: 'header' }, [
        h('h1', {}, ['Gutenberg Books']),
        h('p', {}, [
          'This is a simple app that uses the ',
          h('a', { href: 'https://gutendex.com/' }, ['Gutenberg API']),
          ' to display books.',
        ]),
      ]),

      h('main', {}, [h(RouterOutlet)]),

      h('footer', { class: 'footer' }, [
        'Made using a simple frontend framework',
      ]),
    ])
  },
})

createApp(App, {}, { router }).mount(document.getElementById('app'))
