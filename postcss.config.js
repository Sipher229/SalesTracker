export default {
 plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(import.meta.PROD ? { cssnano: {} } : {})
  }
}
