import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pawprints.app',
  appName: 'Paw Prints',
  webDir: 'www',
  plugins: {
    App: {
      scheme: 'pawprints',
    },
    DeepLinks: {
      scheme: 'pawprints',
      host: 'callback',
    },
  },
};

export default config;
