import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import {Image, SizableText, YStack} from "tamagui";
import ApplicationScreen from "../screens/application/ApplicationScreen";
import Icon from "../../assets/icon.png";
import {TouchableOpacity} from "react-native";
import TestScreen from "../screens/test/TestScreen";

const Tab = createBottomTabNavigator();

const screenOptions = (route, focused) => {
    let iconName;
    let label;

    switch (route.name) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            label = 'Home';
            break;
        case 'Test':
            iconName = focused ? 'document-text' : 'document-text-outline';
            label = 'Test';
            break;
        case 'Application':
            iconName = focused ? 'briefcase' : 'briefcase-outline';
            label = 'Application';
            break;
        case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            label = 'Profile';
            break;
        default:
            break;
    }

    return {
        tabBarIcon: ({size, color}) => (
            <Ionicons name={iconName} size={size} color={color}/>
        ),
        tabBarLabel: ({focused}) => (
            <SizableText
                style={{fontFamily: focused ? "PoppinsBold" : "PoppinsRegular"}}
                color={focused ? "deepskyblue" : "grey"}
                size={"$1"}>
                {label}
            </SizableText>
        )
    };
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarItemStyle: {
                    height: 44,
                    alignSelf: "center"
                },
                tabBarStyle: {
                    height: 56,
                    borderColor: "white",
                    shadowColor: "white",
                    elevation: 0
                },
                tabBarIcon: ({focused, color, size}) =>
                    screenOptions(route, focused).tabBarIcon({size, color}),
                tabBarLabel: ({focused}) =>
                    screenOptions(route, focused).tabBarLabel({focused}),
                tabBarActiveTintColor: 'deepskyblue',
                tabBarInactiveTintColor: 'grey'
            })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen
                name="Test"
                component={TestScreen}
                options={{
                    headerStyle: {
                        shadowOpacity: 0,
                        borderWidth: 0,
                        elevation: 0,
                        backgroundColor: "white",
                    },
                    headerLeft: () => (
                        <YStack height={"80%"} aspectRatio={1} marginLeft={"$3"}>
                            <Image source={Icon} width={'100%'} height={'100%'}/>
                        </YStack>
                    ),
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Placement Tests
                        </SizableText>
                    ),
                    headerRight: () => (
                        <YStack marginRight={"$5"}>
                            <TouchableOpacity>
                                <FontAwesome6 name={"bookmark"} size={24}/>
                            </TouchableOpacity>
                        </YStack>
                    ),
                }}
            />
            <Tab.Screen
                name="Application"
                component={ApplicationScreen}
                options={{
                    headerStyle: {
                        shadowOpacity: 0,
                        borderWidth: 0,
                        elevation: 0,
                        backgroundColor: "white",
                    },
                    headerLeft: () => (
                        <YStack height={"80%"} aspectRatio={1} marginLeft={"$3"}>
                            <Image source={Icon} width={'100%'} height={'100%'}/>
                        </YStack>
                    ),
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Applications
                        </SizableText>
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
