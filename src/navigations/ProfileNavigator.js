import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SizableText, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Profile
                        </SizableText>
                    ),
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

        </ProfileStack.Navigator>
    );
};

export default ProfileNavigator;