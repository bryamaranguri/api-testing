import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // setupFiles: ['./setupTests.ts'], // si necesitas archivos de configuración
  },
});
