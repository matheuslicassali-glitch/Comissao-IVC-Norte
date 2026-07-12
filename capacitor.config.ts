import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.comissaoivcnorte.app',
  appName: 'Comissao IVC Norte',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#FFF8F0',
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#FFF8F0',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: false,
    }
  }
};

export default config;
