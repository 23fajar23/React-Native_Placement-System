import {SizableText, Spinner, Text, XStack, YStack} from "tamagui";
import {FlatList, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import api from "../../api/auth";
import IconCircleCard from "../../components/IconCircleCard";
import NoteChip from "../../components/NoteChip";

const NotificationList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/posts')
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderItem = ({item}) => (
            <>
                <Text color={"white"}>{item.title}</Text>
                <TouchableOpacity>
                    <YStack flex={1} gap={"$3"}>
                        <XStack flex={1} gap={"$3"}>
                            <IconCircleCard/>
                            <YStack flex={4} gap={"$1"} justifyContent={"center"}>
                                <SizableText
                                    style={{fontFamily: 'PoppinsBold'}}
                                    size={'$5'}>
                                    Successfully Applied Test!
                                </SizableText>
                                <XStack>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$3'}
                                        color={"gray"}>
                                        20 Jun 2024{"  |  "}
                                    </SizableText>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$3'}
                                        color={"gray"}>
                                        20:49
                                    </SizableText>
                                </XStack>
                            </YStack>
                            <YStack flex={1} justifyContent={"center"} alignItems={"flex-end"}>
                                <NoteChip
                                    backgroundColor={"deepskyblue"}
                                    text={"New"}
                                    borderColor={"deepskyblue"}
                                    textColor={"white"}/>
                            </YStack>
                        </XStack>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                        </SizableText>
                    </YStack>
                </TouchableOpacity>
            </>
        )
    ;

    return (
        <YStack
            flex={1}
            backgroundColor={"white"}
            alignItems={"center"}
            justifyContent={"center"}
            paddingHorizontal={"$3"}>
            {loading ? (
                <Spinner size={"large"} color="lightgray"/>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}/>
            )}
        </YStack>
    );
};


export default NotificationList