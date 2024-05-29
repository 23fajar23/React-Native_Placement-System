import {Separator, SizableText, Spinner, Text, XStack, YStack} from "tamagui";
import {FlatList, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import api from "../../api/auth";
import Icon from "../../../assets/icon.png";
import {FontAwesome6} from "@expo/vector-icons";
import LogoCard from "../../components/LogoCard";
import NoteChip from "../../components/NoteChip";
import {useDispatch, useSelector} from "react-redux";
import {getApplicationsByTraineeId} from "../../api/application";
import * as SecureStore from "expo-secure-store";
import {getTraineeById} from "../../api/trainee";
import EmptyList from "../../components/EmptyList";

const ApplicationList = ({handlePressItem}) => {
    const dispatch = useDispatch()
    const [loading, traineeApplications] = useSelector(state => state.application);

    useEffect(() => {
        const fetchUserIdAndTraineeApplications = async () => {
            try {
                const userId = await SecureStore.getItemAsync('userId');
                if (userId) {
                    dispatch(getApplicationsByTraineeId(userId));
                }
            } catch (error) {
                console.error('Failed to fetch userId from SecureStore', error);
            }
        };

        fetchUserIdAndTraineeApplications();
    }, [dispatch]);

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={handlePressItem(item.id)}>
            <YStack>
                <XStack flex={1} gap={"$3"}>
                    <LogoCard icon={Icon}/>
                    <YStack flex={4} gap={"$1"} justifyContent={"center"}>
                        <SizableText
                            style={{fontFamily: 'PoppinsBold'}}
                            size={'$7'}>
                            {item.test.company.name}
                        </SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"gray"}>
                            Role
                        </SizableText>
                        <XStack>
                            <NoteChip
                                text={"Stage 1"}
                                textColor={"deepskyblue"}
                                backgroundColor={"#eff4ff"}
                                borderColor={"#eff4ff"}/>
                        </XStack>
                    </YStack>
                    <YStack flex={1} justifyContent={"center"} alignItems={"flex-end"}>
                        <FontAwesome6 name={"angle-right"} color={"black"} size={24}/>
                    </YStack>
                </XStack>
                <Separator flex={1} borderWidth={"$0.5"} marginVertical={"$3"}/>
            </YStack>
        </TouchableOpacity>
    );

    return (
        <>
            {loading ? (
                <YStack flex={1} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : traineeApplications.length === 0 ? (
                <EmptyList text={"application"}/>
            ) : (
                <FlatList
                    data={traineeApplications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 13, paddingVertical: 7, gap: 13}}
                    nestedScrollEnabled
                />
            )}
        </>
    );
};


export default ApplicationList