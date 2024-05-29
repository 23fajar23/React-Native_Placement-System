import {ScrollView, SizableText, Spinner, XStack, YStack} from "tamagui";
import BannerCard from "../../components/home/BannerCard";
import background from "../../../assets/images/background.png"
import woman_work from "../../../assets/images/woman-work.png"
import people_group from "../../../assets/images/people_group.png"
import person_with_laptop from "../../../assets/images/person_with_laptop.png"
import StatisticCard from "../../components/home/StatisticCard";
import {TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTests} from "../../api/test";
import TestItem from "../test/TestItem";
import {toggleBookmark} from "../../redux/bookmarkSlice";
import EmptyList from "../../components/EmptyList";
import * as SecureStore from "expo-secure-store";
import {getApplicationsByTraineeId} from "../../api/application";

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {tests, loading} = useSelector((state) => state.test);
    const {traineeApplications} = useSelector((state) => state.application);
    const bookmarked = useSelector((state) => state.bookmark.bookmarkedTests);

    useEffect(() => {
        dispatch(getTests());
    }, [dispatch]);

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

    const latestTests = tests.slice(-5);
    const reversedTests = [...latestTests].reverse();

    const activeApplicationsCount = traineeApplications.filter(application => application.finalResult === null).length;

    const handleToTestList = () => {
        navigation.navigate('InitialNavigator', {screen: 'Test'})
    };

    const handlePressItem = (testId) => {
        navigation.navigate('TestNavigator', {screen: 'TestDetail', params: {testId}});
    };

    const handleToggleBookmark = (id) => {
        dispatch(toggleBookmark(id));
    };

    return (
        <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
            <YStack flex={1} padding={"$3"} gap={"$5"}>
                <ScrollView
                    flex={1}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    marginHorizontal={"$-3"}>
                    <XStack paddingHorizontal={"$3"} gap={"$3"}>
                        <BannerCard
                            background={background}
                            image={woman_work}
                            title={"Preparing for Work in 2024"}
                            textButton={"Read more"}
                            link={"https://enigmacamp.com/blog/mempersiapkan-kerja-di-tahun-2024"}
                        />
                        <BannerCard
                            background={background}
                            image={people_group}
                            title={"Welcome Aboard Trainee IT Bootcamp Batch 3 Malang"}
                            textButton={"Get to know"}
                            link={"https://www.instagram.com/p/C7L7tTrLNWV/"}
                        />
                        <BannerCard
                            background={background}
                            image={person_with_laptop}
                            title={"Easy Ways Learn to Become a Software Engineer"}
                            textButton={"Read more"}
                            link={"https://enigmacamp.com/blog/bootcamp-pemrograman-cara-mudah-belajar-jadi-software-engineer"}
                        />
                    </XStack>
                </ScrollView>
                <YStack flex={1} gap={"$3"}>
                    <XStack flex={1} gap={"$3"}>
                        <StatisticCard count={tests.length ? tests.length : 0} title={"Active Tests"}/>
                        <StatisticCard count={bookmarked.length ? bookmarked.length : 0} title={"Saved Tests"}/>
                    </XStack>
                    <XStack flex={1} gap={"$3"}>
                        <StatisticCard
                            count={traineeApplications.length ? traineeApplications.length : 0}
                            title={"Total Applications"}
                        />
                        <StatisticCard
                            count={activeApplicationsCount ? activeApplicationsCount : 0}
                            title={"Active Applications"}
                        />
                    </XStack>
                </YStack>
                <XStack flex={1} justifyContent={"space-between"} alignItems={"center"}>
                    <SizableText
                        style={{fontFamily: 'PoppinsBold'}}
                        size={'$7'}>
                        Recent Tests
                    </SizableText>
                    <TouchableOpacity onPress={handleToTestList}>
                        <SizableText
                            style={{fontFamily: 'PoppinsBold'}}
                            size={'$5'}
                            color={"deepskyblue"}>
                            See All
                        </SizableText>
                    </TouchableOpacity>
                </XStack>
                <YStack
                    flex={1}
                    paddingHorizontal={"$1"}
                    gap={"$3"}>
                    {loading ? (
                        <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
                            <Spinner size={"large"} color="lightgray"/>
                        </YStack>
                    ) : reversedTests.length === 0 ? (
                        <EmptyList text={"recent placement test"}/>
                    ) : (
                        reversedTests.map(test => (
                                <TestItem
                                    key={test.id}
                                    item={test}
                                    handlePressItem={handlePressItem}
                                    handleToggleBookmark={handleToggleBookmark}
                                    isBookmarked={bookmarked[test.id]}
                                />
                            )
                        )
                    )}
                </YStack>
            </YStack>
        </ScrollView>
    )
}

export default HomeScreen