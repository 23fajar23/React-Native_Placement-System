import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestNavigator from "./TestNavigator";
import ApplicationNavigator from "./ApplicationNavigator";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {deleteToken, setStatus, setToken} from "../redux/authSlice";
import {useToastController} from "@tamagui/toast";
import {jwtDecode} from "jwt-decode";
import {Spinner, YStack} from "tamagui";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const toast = useToastController();

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("userToken");
            if (storedToken) {
                dispatch(setToken(storedToken));
            }
            setIsCheckingToken(false);
        };

        loadToken();
    }, [dispatch]);

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    toast.show('', {
                        message: "Session Has Expired!",
                        native: false,
                    });
                    await SecureStore.deleteItemAsync('userToken');
                    dispatch(deleteToken());
                }
            }
        };

        if (!isCheckingToken) {
            checkToken();
        }
    }, [dispatch, token, toast, isCheckingToken]);

    if (isCheckingToken) {
        return (
            <YStack flex={1} alignItems={"center"} justifyContent={"center"}>
                <Spinner size={"large"} color="lightgray"/>
            </YStack>
        );
    }

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