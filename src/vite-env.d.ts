/// <reference types="vite/client" />
declare module '*.vue' { // *.vue文件的类型声明
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
declare module '*.md' { // *.md文件的类型声明
    const str: string
    export default str
}
