import { CapacitorConfig } from '@capacitor/cli';

 const config: CapacitorConfig = {
 appId: 'YOUR_APP_ID',
 appName: 'TASK_APP',
 webDir: 'www',
 loggingBehavior: 'debug',
 server: {
     androidScheme: "http"
 },
 plugins: {
     CapacitorSQLite: {
     iosDatabaseLocation: 'Library/CapacitorDatabase',
     iosIsEncryption: false,
     iosKeychainPrefix: 'YOUR_APP_NAME',
     iosBiometric: {
         biometricAuth: false,
         biometricTitle : "Biometric login for capacitor sqlite"
     },
     androidIsEncryption: false,
     androidBiometric: {
         biometricAuth : false,
         biometricTitle : "Biometric login for capacitor sqlite",
         biometricSubTitle : "Log in using your biometric"
     },
     electronIsEncryption: false,
     electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
     electronMacLocation: "/Users/YOUR_NAME/CapacitorDatabases",
     electronLinuxLocation: "Databases"
     }
 }
 };
 export default config;