import {useDispatch, useSelector} from "react-redux";
import {FlatList, TouchableOpacity} from "react-native";
import {SizableText, XStack, YStack} from "tamagui";
import LogoCard from "../../components/LogoCard";
import {FontAwesome6} from "@expo/vector-icons";
import NoteChip from "../../components/NoteChip";
import Icon from "../../../assets/icon.png";
import {toggleBookmark} from "../../redux/bookmarkSlice";
import EmptyList from "../../components/EmptyList";
import {formatDate} from "../../utils/formatDate";

const SavedTestList = ({handlePressItem}) => {
    const dispatch = useDispatch()
    const {tests} = useSelector((state) => state.test);
    const bookmarked = useSelector((state) => state.bookmark.bookmarkedTests);

    const bookmarkedTests = tests.filter(test => bookmarked[test.id]);

    const handleToggleBookmark = (id) => {
        dispatch(toggleBookmark(id));
    };

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => handlePressItem}>
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
                        <SizableText style={{fontFamily: 'PoppinsBold'}}
                                     size={'$7'}>{item.company.name}</SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"gray"}>
                            {item.rolePlacement}
                        </SizableText>
                    </YStack>
                    <XStack flex={1} justifyContent={"flex-end"} margin={"$3"}>
                        <TouchableOpacity onPress={() => handleToggleBookmark(item.id)}>
                            <FontAwesome6 name={"bookmark"} color={"deepskyblue"} size={24} solid/>
                        </TouchableOpacity>
                    </XStack>
                </XStack>
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
                            {item.placement}
                        </SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$5'}
                            color={"deepskyblue"}>
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
                                text={item.education.name}
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
            {bookmarkedTests.length === 0 ? (
                <EmptyList text={"saved test"}/>
            ) : (
                <FlatList
                    data={bookmarkedTests}
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

export default SavedTestList;