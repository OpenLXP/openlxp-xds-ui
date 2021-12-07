// jest.config.js

module.exports = {
  // dont collect coverage from tailwind.config.js

  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/jest.config.js',
    '!**/coverage/**',
    '!**/.next/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/tailwind.config.js',
    '<rootDir>/postcss.config.js',
    '<rootDir>/pages/_app.js',
  ],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
     https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
     https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

    //imports for @ imports
    '^components/(.*)$': '<rootDir>/components/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^contexts/(.*)$': '<rootDir>/contexts/$1',
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^public/(.*)$': '<rootDir>/public/$1',
    '^config/(.*)$': '<rootDir>/config/$1',
  },

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/.old',
    '<rootDir>/pages/_app.js',
  ],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
     https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
