import {Separator, SizableText, XStack, YStack} from "tamagui";
import {FlatList, RefreshControl, TouchableOpacity} from "react-native";
import React, {useState} from "react";
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
    const {traineeApplications} = useSelector(state => state.application);
    const [refreshing, setRefreshing] = useState(false);

    const reversedTraineeApplications = [...traineeApplications].reverse();

    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(getApplicationsByTraineeId(await SecureStore.getItemAsync('userId')));
        setRefreshing(false);
    };

    const renderItem = ({item}) => {
        const currentStage = getCurrentStage(item.test.stages);
        const stageIndex = item.test.stages.indexOf(currentStage);
        const textStageColor = getTextStageColor(currentStage, stageIndex, item.application.testStageResultList);
        const backgroundStageColor = getBackgroundStageColor(currentStage, stageIndex, item.application.testStageResultList);

        return (
            <TouchableOpacity onPress={() => handlePressItem(item)}>
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
                                        textColor={"deepskyblue"}
                                        backgroundColor={"rgba(0, 191, 255, 0.1)"}
                                        borderColor={"rgba(0, 191, 255, 0.1)"}/>
                                ) : (
                                    <NoteChip
                                        text={currentStage ? currentStage.nameStage : "No Stage"}
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
            {traineeApplications.length === 0 && !refreshing ? (
                <EmptyList text={"application"}/>
            ) : (
                <FlatList
                    data={reversedTraineeApplications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.application.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 13, paddingVertical: 7, gap: 13}}
                    nestedScrollEnabled
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
                    }
                />
            )}
        </>
    );
};

export default ApplicationList;
