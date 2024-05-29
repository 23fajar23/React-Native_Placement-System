import {Card, ScrollView, Separator, SizableText, Spinner, XStack, YStack} from "tamagui";
import LogoCard from "../../components/LogoCard";
import Icon from "../../../assets/icon.png";
import NoteChip from "../../components/NoteChip";
import PrimaryButton from "../../components/button/PrimaryButton";
import CustomAccordion from "../../components/CustomAccordion";
import QuotaRow from "../../components/QuotaRow";
import CustomSheet from "../../components/CustomSheet";
import React, {useEffect, useState} from "react";
import {useToastController} from "@tamagui/toast";
import ConfirmationContent from "../../components/ConfirmationContent";
import {useDispatch, useSelector} from "react-redux";
import {getTestById} from "../../api/test";
import {formatDate} from "../../utils/formatDate";
import {createApplication} from "../../api/application";
import * as SecureStore from "expo-secure-store";
import {setError, setStatus} from "../../redux/applicationSlice";

const TestDetailScreen = ({route, navigation}) => {
    const {testId} = route.params;
    const [openSheet, setOpenSheet] = useState(false)
    const toast = useToastController()
    const dispatch = useDispatch();
    const {selectedTest, loading: loadingTest} = useSelector((state) => state.test);
    const {loading: loadingApply, status, error} = useSelector((state) => state.application);

    useEffect(() => {
        dispatch(setError(null))

        dispatch(getTestById(testId));
    }, [dispatch, testId]);

    useEffect(() => {
            if (status === 200) {
                toast.show('', {
                    message: 'Successfully Applied Test!',
                    native: false,
                });
                navigation.navigate('InitialNavigator', {screen: 'Application'});
            } else if (error) {
                toast.show('', {
                    message: error.message,
                    native: false,
                });
            }

            dispatch(setStatus(null))
        }, [navigation, toast, error, status, dispatch]
    )

    const renderQuotaRows = () => {
        const quota = selectedTest.stages[0].quotas[0];
        const quotaBatches = quota.quotaBatches;

        if (quota.type === 'ALL') {
            return (
                <QuotaRow
                    key="all"
                    batch="ALL BATCH"
                    available={quota.available > 0 ? `Available: ${quota.available}` : 'Not Available'}
                    color={quota.available > 0 ? 'deepskyblue' : 'red'}
                />
            );
        } else {
            return quotaBatches.map((quotaBatch) => {
                return (
                    <QuotaRow
                        key={quotaBatch.id}
                        batch={`${quotaBatch.batch.name} ${quotaBatch.batch.region}`}
                        available={quotaBatch.quotaAvailable > 0 ? `Available: ${quotaBatch.quotaAvailable}` : 'Not Available'}
                        color={quotaBatch.quotaAvailable > 0 ? 'deepskyblue' : 'red'}
                    />
                );
            });
        }
    };

    const handleApply = async () => {
        const customerId = await SecureStore.getItemAsync('userId');

        if (customerId) {
            console.log("userId", customerId)
            console.log("testId", testId)
            const applicationData = {customerId, testId};
            dispatch(createApplication(applicationData));
            setOpenSheet(false);
        } else {
            toast.show('', {
                message: "Trainee ID Not Found!",
                native: false,
            });
            setOpenSheet(false);
        }
    };

    return (
        <>
            {loadingTest || !selectedTest ? (
                <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : (
                <>
                    <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
                        <YStack
                            flex={1}
                            backgroundColor={"white"}
                            paddingHorizontal={"$3"}
                            paddingTop={"$2"}
                            paddingBottom={"$3"}
                            gap={"$3"}>
                            <Card
                                gap={"$3"}
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
                                    <SizableText style={{fontFamily: 'PoppinsBold'}}
                                                 size={'$7'}>{selectedTest.company.name}</SizableText>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"deepskyblue"}>
                                        {selectedTest.rolePlacement}
                                    </SizableText>
                                </YStack>
                                <Separator width={"100%"} borderWidth={"$0.5"}/>
                                <YStack gap={"$2"} alignItems={"center"}>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"gray"}>
                                        {selectedTest.placement}
                                    </SizableText>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"deepskyblue"}>
                                        {formatDate(selectedTest.stages[0].dateTime)}
                                    </SizableText>
                                    <XStack gap={"$2"}>
                                        <NoteChip
                                            text={selectedTest.stages[0].quotas[0].type}
                                            textColor={"gray"}
                                            borderColor={"gray"}
                                            backgroundColor={"white"}/>
                                        <NoteChip
                                            text={`Min. ${selectedTest.education.name}`}
                                            textColor={"gray"}
                                            borderColor={"gray"}
                                            backgroundColor={"white"}/>
                                    </XStack>
                                </YStack>
                            </Card>
                            <CustomAccordion
                                title={"Quota"}
                                content={
                                    <YStack flex={1}>
                                        <XStack flex={1} justifyContent={"space-between"} width={"100%"}>
                                            <SizableText
                                                style={{fontFamily: 'PoppinsRegular'}}
                                                size={'$5'}>
                                                Total Quota
                                            </SizableText>
                                            <SizableText
                                                style={{fontFamily: 'PoppinsRegular'}}
                                                size={'$5'}>
                                                {selectedTest.stages[0].quotas[0].total} Slots
                                            </SizableText>
                                        </XStack>
                                        <Separator width={"100%"} borderWidth={"$0.5"} marginVertical={"$2"}/>
                                        <YStack flex={1} gap={"$1"}>
                                            {renderQuotaRows()}
                                        </YStack>
                                    </YStack>
                                }
                            />
                            <CustomAccordion
                                title={"Notes"}
                                content={
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"black"}>
                                        {selectedTest.note}
                                    </SizableText>
                                }
                            />
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
                            title={
                                <>
                                    {loadingApply ? (
                                        <Spinner size={"small"} color="lightgray"/>
                                    ) : (
                                        "Apply"
                                    )}
                                </>
                            }
                            onPress={() => setOpenSheet(true)}
                        />
                    </XStack>

                    <CustomSheet
                        title={"Apply Test"}
                        titleColor={"black"}
                        onOpenChange={setOpenSheet}
                        open={openSheet}
                        content={
                            <ConfirmationContent
                                confirmationText={"Are you sure you want to apply?"}
                                buttonText={"Yes, Apply"}
                                onPressSecondary={() => setOpenSheet(false)}
                                onPressPrimary={() => {
                                    handleApply()
                                    setOpenSheet(false)
                                }}
                            />
                        }
                    />
                </>
            )}
        </>
    )
}

export default TestDetailScreen