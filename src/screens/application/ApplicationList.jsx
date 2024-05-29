import {Separator, SizableText, Spinner, XStack, YStack} from "tamagui";
import {FlatList, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import Icon from "../../../assets/icon.png";
import {FontAwesome6} from "@expo/vector-icons";
import LogoCard from "../../components/LogoCard";
import NoteChip from "../../components/NoteChip";
import {useDispatch, useSelector} from "react-redux";
import {getApplicationsByTraineeId} from "../../api/application";
import * as SecureStore from "expo-secure-store";
import EmptyList from "../../components/EmptyList";
import {getTextStageColor} from "../../utils/getTextStageColor";
import {getBackgroundStageColor} from "../../utils/getBackgroundStageColor";
import {ResultEnum} from "../../utils/ResultEnum";
import {getCurrentStage} from "../../utils/getCurrentStage";

const ApplicationList = ({handlePressItem}) => {
    const dispatch = useDispatch();
    const {loading, traineeApplications} = useSelector(state => state.application);

    const reversedTraineeApplications = [...traineeApplications].reverse();

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

    const renderItem = ({item}) => {
        const stageToShow = getCurrentStage(item.test.stages);
        const stageIndex = item.test.stages.indexOf(stageToShow);
        const textStageColor = getTextStageColor(stageToShow, stageIndex, item.application.testStageResultList);
        const backgroundStageColor = getBackgroundStageColor(stageToShow, stageIndex, item.application.testStageResultList);

        return (
            <TouchableOpacity onPress={() => handlePressItem(item.application.id)}>
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
                                {item.test.rolePlacement}
                            </SizableText>
                            <XStack>
                                {item.application.finalResult === ResultEnum.PASSED ? (
                                    <NoteChip
                                        text={"Onboard"}
                                        textColor={"white"}
                                        backgroundColor={"blue"}
                                        borderColor={"blue"}/>
                                ) : (
                                    <NoteChip
                                        text={stageToShow ? stageToShow.nameStage : "No Stage"}
                                        textColor={textStageColor}
                                        backgroundColor={backgroundStageColor}
                                        borderColor={backgroundStageColor}/>
                                )}
                            </XStack>
                        </YStack>
                        <YStack flex={1} justifyContent={"center"} alignItems={"flex-end"}>
                            <FontAwesome6 name={"angle-right"} color={"black"} size={24}/>
                        </YStack>
                    </XStack>
                    <Separator flex={1} borderWidth={"$0.5"} marginVertical={"$3"}/>
                </YStack>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {loading ? (
                <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : traineeApplications.length === 0 ? (
                <EmptyList text={"application"}/>
            ) : (
                <FlatList
                    data={reversedTraineeApplications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.application.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 13, paddingVertical: 7, gap: 13}}
                    nestedScrollEnabled
                />
            )}
        </>
    );
};

export default ApplicationList;
