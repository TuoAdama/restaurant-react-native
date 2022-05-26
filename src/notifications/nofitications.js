import * as Notifications from 'expo-notifications';

async function getRegisterToken() {
    
    let token;

    var { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
        status = await Notifications.requestPermissionsAsync();
    }

    if (status !== 'granted') {
        alert('Impossible de recupérer les notifications');
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log(token);

    return token;
}


export { getRegisterToken};