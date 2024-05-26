import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import {Avatar, Image, SizableText, XStack, YStack} from "tamagui";
import ApplicationScreen from "../screens/application/ApplicationScreen";
import Icon from "../../assets/icon.png";
import {TouchableOpacity} from "react-native";
import TestScreen from "../screens/test/TestScreen";
import getCurrentGreeting from "../helpers/getCurrentGreeting"

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

const MainTabNavigator = ({navigation}) => {
    const handlePressIcon = () => {
        navigation.navigate('HomeNavigator', {screen: 'Notification'})
    };

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
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        height: 64,
                        shadowOpacity: 0,
                        borderWidth: 0,
                        elevation: 0,
                        backgroundColor: "white",
                    },
                    headerLeft: () => (
                        <XStack height={"100%"} aspectRatio={1} marginLeft={"$3"}>
                            <Avatar circular alignSelf={"center"}>
                                <Avatar.Image
                                    accessibilityLabel="ProfilePicture"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                            </Avatar>
                        </XStack>
                    ),
                    headerTitle: () => (
                        <YStack left={"$-5"} top={"$1"}>
                            <SizableText
                                size={"$3"}
                                style={{fontFamily: "PoppinsRegular"}}>
                                {getCurrentGreeting}
                            </SizableText>
                            <SizableText
                                size={"$7"}
                                style={{fontFamily: "PoppinsBold"}}>
                                Pratama Wibi
                            </SizableText>
                        </YStack>
                    ),
                    headerRight: () => (
                        <YStack marginRight={"$4"}>
                            <TouchableOpacity onPress={handlePressIcon}>
                                <FontAwesome6 name={"bell"} size={24}/>
                            </TouchableOpacity>
                        </YStack>
                    ),
                }}
            />
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
                        <XStack height={"80%"} aspectRatio={1} marginLeft={"$2"}>
                            <Image source={Icon} width={'100%'} height={'100%'}/>
                        </XStack>
                    ),
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Placement Tests
                        </SizableText>
                    ),
                    headerRight: () => (
                        <YStack marginRight={"$4"}>
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
                        <XStack height={"80%"} aspectRatio={1} marginLeft={"$2"}>
                            <Image source={Icon} width={'100%'} height={'100%'}/>
                        </XStack>
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
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabNavigator;
