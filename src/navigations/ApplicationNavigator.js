import DetailTestScreen from "../screens/test/DetailTestScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Image, SizableText, YStack} from "tamagui";
import Icon from "../../assets/icon.png";
import {TouchableOpacity} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import ApplicationDetailScreen from "../screens/application/ApplicationDetailScreen";

const ApplicationStack = createNativeStackNavigator();

const TestNavigator = () => {
    return (
        <ApplicationStack.Navigator>
            <ApplicationStack.Screen
                name="DetailApplication"
                component={ApplicationDetailScreen}
                options={{
                    headerShadowVisible: false,
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Stages
                        </SizableText>
                    ),
                }}
            />

        </ApplicationStack.Navigator>
    );
};

export default TestNavigator;