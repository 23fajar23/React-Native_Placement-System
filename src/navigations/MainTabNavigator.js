import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import {Ionicons} from "@expo/vector-icons";
import {SizableText} from "tamagui";
import ApplicationScreen from "../screens/ApplicationScreen";

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
                color={focused ? "deepskyblue" : "grey"}
                size={"$1"}
                fontFamily={"PoppinsRegular"}>
                {label}
            </SizableText>
        )
    };
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarItemStyle: {
                    height: 44,
                    alignSelf: "center"
                },
                tabBarStyle: {
                    height: 56,
                    borderColor: "white",
                    shadowColor: "white"
                },
                tabBarIcon: ({focused, color, size}) =>
                    screenOptions(route, focused).tabBarIcon({size, color}),
                tabBarLabel: ({focused}) =>
                    screenOptions(route, focused).tabBarLabel({focused}),
                tabBarActiveTintColor: 'deepskyblue',
                tabBarInactiveTintColor: 'grey'
            })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Test" component={TestScreen}/>
            <Tab.Screen name="Application" component={ApplicationScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
