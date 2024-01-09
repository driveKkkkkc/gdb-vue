import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import '@highlightjs/vue-plugin'
import hljs from 'highlight.js'
// import 'highlightjs-line-numbers.js'
import 'highlight.js/styles/atom-one-light.css'
import 'highlight.js/lib/common'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

// 全局注册element-plus的icon图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('highlight', {
  mounted(el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: HTMLElement) => {
      hljs.highlightBlock(block) // 高亮代码块
    })
  }
})

app.use(router).use(ElementPlus).mount('#app');
