import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SizableText, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import EditProfileScreen from "../screens/profile/EditPersonalScreen";
import EditPersonalScreen from "../screens/profile/EditPersonalScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="EditPersonal"
                component={EditPersonalScreen}
                options={{
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Personal
                        </SizableText>
                    ),
                    headerShadowVisible: false,
                }}
            />

        </ProfileStack.Navigator>
    );
};

export default ProfileNavigator;