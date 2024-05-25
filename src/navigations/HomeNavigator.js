import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SizableText} from "tamagui";
import NotificationScreen from "../screens/home/NotificationScreen";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Notifications
                        </SizableText>
                    ),
                    headerShadowVisible: false,
                }}
            />

        </HomeStack.Navigator>
    );
};

export default HomeNavigator;