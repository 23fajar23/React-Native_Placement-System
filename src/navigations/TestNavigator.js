import DetailTestScreen from "../screens/test/DetailTestScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Image, SizableText, YStack} from "tamagui";
import Icon from "../../assets/icon.png";
import {TouchableOpacity} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";

const TestStack = createNativeStackNavigator();

const TestNavigator = () => {
    return (
        <TestStack.Navigator>
            <TestStack.Screen
                name="DetailTest"
                component={DetailTestScreen}
                options={{
                    headerTitle: "",
                    headerShadowVisible: false,
                    headerRight: () => (
                        <YStack>
                            <TouchableOpacity>
                                <FontAwesome6 name={"bookmark"} size={24}/>
                            </TouchableOpacity>
                        </YStack>
                    ),
                }}
            />

        </TestStack.Navigator>
    );
};

export default TestNavigator;