import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
class localNotificationService {
    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
                if(!notification?.data){
                    return
                }
                notification.userInteraction = true;
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // popInitialNotification: true,
            // requestPermissions: true,
        });
    }
    unregister = () => {       
        PushNotification.unregister();
    }
    showNotificaton = (id, title, messsage, data = {}, options = {}) => {
        PushNotification.localNotification({
            ...this.buildAndroidNotification(id, title, messsage, data, options),
            title: title || "",
            message: messsage ||"",
            playSound: options.playSound || false,
            soundName: options.soundName || "default",
            userInteraction : false,
        });
    }
    buildAndroidNotification = (id, title , message , data = {}, options = {}) => {
        return{
            id : id,
            autoCancel : true,
            largeIcon : options.largeIcon || "@drawable/ic_launcher",
            smallIcon : options.smallIcon || "@drawable/ic_launcher",
            bigText : message || "",
            subText : message || "",
            vibrate : options.vibrate || true,
            vibration : options.vibration || 300,
            priority : options.priority || "high",
            importance : options.importance || "high",
            data : data,
        }
    }
    cancelAllLocalNotification = () =>{
        PushNotification.cancelAllLocalNotifications();
    }
    removeDeliveredNotificationByID = (notificationId) =>{
        PushNotification.cancelLocalNotifications({id: `${notificationId}`})
    }
}

export const localNoti = new localNotificationService();
