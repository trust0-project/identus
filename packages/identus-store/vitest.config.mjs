/// <reference types="vitest" />
import { defineConfig } from 'vite'

const isCI = process.env.CI === "true";


const testConfig = {
    setupFiles: ['./tests/setup.ts'],
    reporters: ['verbose'],
    coverage: {
        provider: 'istanbul',
        reporter: isCI ? ['json-summary', 'lcov'] : ['text', 'lcov'],
        thresholds: {
            "branches": 63,
            "functions": 75,
            "lines": 75,
            "statements": 75

        },
        include: [
            'src'
        ],
        exclude: [
            'src/castor/protos',
            'src/domain/models/errors'
        ]

    },
}

export default defineConfig({
    plugins: [
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        mainFields: ['module', 'main'],
    },
    test: {
        ...testConfig,
        environment: 'jsdom',
        include: ['tests/**/*.test.ts'],

    },
})