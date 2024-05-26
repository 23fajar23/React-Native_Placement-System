import {Separator, SizableText, Spinner, Text, XStack, YStack} from "tamagui";
import {FlatList, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import api from "../../api/auth";
import Icon from "../../../assets/icon.png";
import {FontAwesome6} from "@expo/vector-icons";
import LogoCard from "../../components/LogoCard";
import NoteChip from "../../components/NoteChip";

const ApplicationList = ({handlePressItem}) => {
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
        <TouchableOpacity onPress={handlePressItem}>
            <Text color={"white"}>{item.title}</Text>
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


export default ApplicationList