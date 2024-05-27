import TestDetailScreen from "../screens/test/TestDetailScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SizableText} from "tamagui";
import SavedTestScreen from "../screens/test/SavedTestScreen";

const TestStack = createNativeStackNavigator();

const TestNavigator = () => {
    return (
        <TestStack.Navigator>
            <TestStack.Screen
                name="TestDetail"
                component={TestDetailScreen}
                options={{
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Details
                        </SizableText>
                    ),
                    headerShadowVisible: false,
                }}
            />
            <TestStack.Screen
                name="SavedTest"
                component={SavedTestScreen}
                options={{
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Saved Tests
                        </SizableText>
                    ),
                    headerShadowVisible: false,
                }}
            />
        </TestStack.Navigator>
    );
};

export default TestNavigator;