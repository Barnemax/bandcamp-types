import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Network requests to Bandcamp can be slow
    testTimeout: 20000,
  },
})
