import type {Config} from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/src/test/jestSetup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules', './src/test'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  collectCoverageFrom: [
    'src/{components,utils,hooks,domain,screens}/**/*.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-native-chart-kit|sp-react-native-mqtt|react-native-toast-message|@react-navigation|react-native-feather|@react-native(-community)?|react-native-safe-area-context)/)',
  ],
};

export default config;
