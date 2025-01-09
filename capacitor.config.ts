import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'safeFood',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http'
  },
  android: {
    allowMixedContent: true  // HTTP isteklerine izin ver
  }
};

export default config;
