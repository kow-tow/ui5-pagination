import { defineConfig } from 'vite'
import { resolve } from 'path'
import noderesolve from '@rollup/plugin-node-resolve'
export default defineConfig({
    build: {
        lib: {
            entry:[resolve(__dirname,'src/index.ts')],
            name:'ui5-pagination',
            fileName:'ui5-pagination',
            formats: ["es", "umd", "cjs"],
        },
        rollupOptions:{
            plugins:[
                noderesolve()
            ]
        }
    }
})