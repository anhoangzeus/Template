import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enable => {
                if (enable) {
                    this.getToken(onRegister)
                } else {
                    this.requestPermission(onRegister)
                }
            }).catch(err => {
                console.log("Permission rejected", err);
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fmcToken => {
                if (fmcToken) {
                    onRegister(fmcToken)
                } else {
                    console.log("User does not have a device token");
                }
            }).catch(err => {
                console.log("gettoken Rejected", err);
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(err => {
                console.log("gettoken Rejected", err);
            })
    }

    deleteToken = () => {
        messaging().deleteToken()
            .catch(err => {
                console.log("gettoken Rejected", err);
            })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                }
            })

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                }
            })

        this.messageLisener = messaging().onMessage(async remoteMessage => {
            if (remoteMessage) {
                let notification = null
                if (Platform.OS = 'ios') {
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        })

        messaging().onTokenRefresh(fcmToken => {
            onRegister(fcmToken);
        })

    }
    unRegister = () => {
        this.messageLisener()
    }
}
 export const fcmService = new FCMService()
