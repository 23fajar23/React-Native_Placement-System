import {Separator, SizableText, Spinner, Text, XStack, YStack} from "tamagui";
import {FlatList, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import api from "../../services/ApiService";
import Icon from "../../../assets/icon.png";
import {FontAwesome6} from "@expo/vector-icons";
import LogoCard from "../../components/LogoCard";
import NoteChip from "../../components/NoteChip";

const TestList = ({handlePressItem}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);

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

    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={handlePressItem}>
            <Text color={"white"}>{item.title}</Text>
            <YStack
                flex={1}
                gap={"$3"}
                padding={"$3"}
                borderWidth={"$0.5"}
                borderRadius={"$11"}
                borderColor={"lightgrey"}
                backgroundColor={"white"}>
                <XStack flex={1} gap={"$3"}>
                    <LogoCard icon={Icon}/>
                    <YStack flex={2} alignSelf={"center"} gap={"$1"}>
                        <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>Company</SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"gray"}>
                            Role
                        </SizableText>
                    </YStack>
                    <XStack flex={1} justifyContent={"flex-end"} margin={"$3"}>
                        <TouchableOpacity onPress={toggleBookmark}>
                            <FontAwesome6 name={"bookmark"} color={"deepskyblue"} size={24} solid={bookmarked}/>
                        </TouchableOpacity>
                    </XStack>
                </XStack>
                <Separator flex={1} borderWidth={"$0.5"}/>
                <XStack flex={1} gap={"$3"}>
                    <YStack
                        flex={1}
                        backgroundColor={"white"}
                    />
                    <YStack flex={3.5} gap={"$1"}>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"gray"}>
                            Placement Place
                        </SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"deepskyblue"}>
                            Available : 14
                        </SizableText>
                        <XStack gap={"$2"}>
                            <NoteChip
                                text={"28 Aug 2023"}
                                textColor={"gray"}
                                borderColor={"gray"}
                                backgroundColor={"white"}/>
                            <NoteChip
                                text={"All"}
                                textColor={"gray"}
                                borderColor={"gray"}
                                backgroundColor={"white"}/>
                            <NoteChip
                                text={"Min. S1"}
                                textColor={"gray"}
                                borderColor={"gray"}
                                backgroundColor={"white"}/>
                        </XStack>
                    </YStack>
                </XStack>
            </YStack>
        </TouchableOpacity>
    );

    return (
        <>
            {loading ? (
                <Spinner size={"large"} color="lightgray"/>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 13}}
                    nestedScrollEnabled
                />
            )}
        </>
    );
};


export default TestList