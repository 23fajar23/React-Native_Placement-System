import {YStack} from "tamagui";
import NotificationList from "./NotificationList";

const NotificationScreen = () => {
    return (
        <YStack flex={1} backgroundColor={"white"}>
            <NotificationList/>
        </YStack>
    )
}

export default NotificationScreen