import {Card, ScrollView, Separator, SizableText, Spinner, XStack, YStack} from "tamagui";
import LogoCard from "../../components/LogoCard";
import Icon from "../../../assets/icon.png";
import NoteChip from "../../components/NoteChip";
import PrimaryButton from "../../components/button/PrimaryButton";
import Stage from "../../components/stage/Stage";
import {FontAwesome6} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getApplicationById} from "../../api/application";
import {getTextStageColor} from "../../utils/getTextStageColor";
import {getBackgroundStageColor} from "../../utils/getBackgroundStageColor";
import {getCurrentStage} from "../../utils/getCurrentStage";

const ApplicationDetailScreen = ({route, navigation}) => {
    const {applicationId} = route.params;
    const dispatch = useDispatch();
    const {selectedApplication, loading} = useSelector((state) => state.application);

    useEffect(() => {
        dispatch(getApplicationById(applicationId))
    }, [dispatch, applicationId]);

    const application = selectedApplication?.customer?.applications?.find(app => app.id === applicationId);
    let finalResult = application?.finalResult;

    return (
        <>
            {loading || !selectedApplication ? (
                <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : (
                <>
                    <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
                        <YStack
                            flex={1}
                            alignItems={"center"}
                            backgroundColor={"white"}
                            paddingHorizontal={"$3"}
                            paddingTop={"$2"}
                            paddingBottom={"$3"}
                            gap={"$3"}>
                            <Card
                                gap={"$3"}
                                width={"100%"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                padding={"$3"}
                                borderWidth={"$0.5"}
                                borderRadius={"$11"}
                                borderColor={"lightgrey"}
                                backgroundColor={"white"}>
                                <XStack width={"25%"}>
                                    <LogoCard icon={Icon}/>
                                </XStack>
                                <YStack gap={"$1"} alignItems={"center"}>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsBold'}}
                                        size={'$7'}>{selectedApplication.test.company.name}
                                    </SizableText>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"deepskyblue"}>
                                        {selectedApplication.test.rolePlacement}
                                    </SizableText>
                                </YStack>
                                <Separator width={"100%"} borderWidth={"$0.5"}/>
                                <YStack gap={"$2"} alignItems={"center"}>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"gray"}>
                                        {selectedApplication.test.placement}
                                    </SizableText>
                                    <XStack gap={"$2"}>
                                        <NoteChip
                                            text={selectedApplication.test.stages[0].quotas[0].type}
                                            textColor={"gray"}
                                            borderColor={"gray"}
                                            backgroundColor={"white"}/>
                                        <NoteChip
                                            text={`Min. ${selectedApplication.test.education.name}`}
                                            textColor={"gray"}
                                            borderColor={"gray"}
                                            backgroundColor={"white"}/>
                                    </XStack>
                                </YStack>
                            </Card>
                            <Separator width={"100%"} borderWidth={"$0.5"} marginVertical={"$1"}/>
                            <SizableText
                                style={{fontFamily: 'PoppinsRegular'}}
                                size={'$5'}>
                                Your Application Status
                            </SizableText>
                            <YStack width={"100%"} alignItems={"center"} gap={"$1"}>
                                {selectedApplication.test.stages.map((stage, index) => {
                                    const currentStage = getCurrentStage(selectedApplication.test.stages);
                                    const textStageColor = getTextStageColor(stage, index, selectedApplication.customer.applications.testStageResultList);
                                    const backgroundStageColor = getBackgroundStageColor(stage, index, selectedApplication.customer.applications.testStageResultList);

                                    return (
                                        <React.Fragment key={index}>
                                            <Stage
                                                backgroundColor={backgroundStageColor}
                                                textColor={textStageColor}
                                                title={stage.nameStage}
                                                date={stage.dateTime}
                                                currentStage={currentStage}/>
                                            {index !== selectedApplication.test.stages.length - 1 && (
                                                <FontAwesome6 name={"angle-down"} color={textStageColor} size={24}/>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </YStack>
                        </YStack>
                    </ScrollView>

                    <XStack
                        position={"fixed"}
                        bottom={0}
                        left={0}
                        right={0}
                        alignSelf={"flex-end"}
                        backgroundColor={"white"}
                        padding={"$3"}
                        paddingBottom={"$5"}
                        borderTopColor={"lightgrey"}
                        borderTopWidth={"$0.5"}>
                        <PrimaryButton
                            disabled={finalResult === null}
                            title={finalResult === null ? "Waiting..." : "Discover Another Test"}
                            onPress={() => navigation.navigate("Test")}
                        />
                    </XStack>
                </>
            )}
        </>
    )
}

export default ApplicationDetailScreen