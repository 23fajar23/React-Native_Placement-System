import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestNavigator from "./TestNavigator";
import ApplicationNavigator from "./ApplicationNavigator";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {setToken} from "../redux/authSlice";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("userToken")
            if (storedToken) {
                dispatch(setToken(storedToken))
            }
        }

        loadToken()
    }, [dispatch]);

    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen
                    name={"InitialNavigator"}
                    component={token ? MainTabNavigator : AuthNavigator}
                    options={{headerShown: false}}
                />
                <AppStack.Screen
                    name={"HomeNavigator"}
                    component={HomeNavigator}
                    options={{headerShown: false}}
                />
                <AppStack.Screen
                    name={"TestNavigator"}
                    component={TestNavigator}
                    options={{headerShown: false}}
                />
                <AppStack.Screen
                    name={"ApplicationNavigator"}
                    component={ApplicationNavigator}
                    options={{headerShown: false}}
                />
                <AppStack.Screen
                    name={"ProfileNavigator"}
                    component={ProfileNavigator}
                    options={{headerShown: false}}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;