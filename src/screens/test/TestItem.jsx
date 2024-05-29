import React from 'react';
import {TouchableOpacity} from 'react-native';
import {YStack, XStack, SizableText, Separator} from 'tamagui';
import {FontAwesome6} from '@expo/vector-icons';
import LogoCard from '../../components/LogoCard';
import NoteChip from '../../components/NoteChip';
import Icon from '../../../assets/icon.png';
import {formatDate} from '../../utils/formatDate';

const TestItem = ({item, handlePressItem, handleToggleBookmark, isBookmarked}) => {
    return (
        <TouchableOpacity onPress={() => handlePressItem(item.id)}>
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
                        <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>
                            {item.company.name}
                        </SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"gray"}>
                            {item.rolePlacement}
                        </SizableText>
                    </YStack>
                    <XStack flex={1} justifyContent={"flex-end"} margin={"$3"}>
                        <TouchableOpacity onPress={() => handleToggleBookmark(item.id)}>
                            <FontAwesome6 name={"bookmark"} color={"deepskyblue"} size={24} solid={isBookmarked}/>
                        </TouchableOpacity>
                    </XStack>
                </XStack>
                <Separator flex={1} borderWidth={"$0.5"}/>
                <XStack flex={1} gap={"$3"}>
                    <YStack flex={1} backgroundColor={"white"}/>
                    <YStack flex={3.5} gap={"$1"}>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"gray"}>
                            {item.placement}
                        </SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={item.stages[0].quotas[0].available === 0 ? "red" : "deepskyblue"}>
                            Available : {item.stages[0].quotas[0].available}
                        </SizableText>
                        <XStack gap={"$2"}>
                            <NoteChip
                                text={formatDate(item.stages[0].dateTime)}
                                textColor={"gray"}
                                borderColor={"gray"}
                                backgroundColor={"white"}/>
                            <NoteChip
                                text={item.stages[0].quotas[0].type}
                                textColor={"gray"}
                                borderColor={"gray"}
                                backgroundColor={"white"}/>
                            <NoteChip
                                text={`Min. ${item.education.name}`}
                                textColor={"gray"}
                                borderColor={"gray"}
                                backgroundColor={"white"}/>
                        </XStack>
                    </YStack>
                </XStack>
            </YStack>
        </TouchableOpacity>
    );
};

export default TestItem;
