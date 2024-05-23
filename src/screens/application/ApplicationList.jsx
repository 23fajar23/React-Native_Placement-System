import {Separator, SizableText, Spinner, Text, XStack, YStack} from "tamagui";
import {FlatList, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import api from "../../services/ApiService";
import Icon from "../../../assets/icon.png";
import {FontAwesome6} from "@expo/vector-icons";
import LogoCard from "../../components/LogoCard";
import NoteChip from "../../components/NoteChip";

const ApplicationList = ({handlePressItem}) => {
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

    const renderItem = ({item}) => (
            <>
                <Text color={"white"}>{item.title}</Text>
                <TouchableOpacity onPress={handlePressItem}>
                    <YStack>
                        <XStack flex={1} gap={"$3"}>
                            <LogoCard icon={Icon}/>
                            <YStack flex={4} gap={"$1"} justifyContent={"center"}>
                                <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>Company</SizableText>
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
                                <FontAwesome6 name={"chevron-right"} color={"black"} size={24} solid={bookmarked}/>
                            </YStack>
                        </XStack>
                        <Separator flex={1} borderWidth={"$0.5"} marginVertical={"$3"}/>
                    </YStack>
                </TouchableOpacity>
            </>
        )
    ;

    return (
        <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}
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


export default ApplicationList