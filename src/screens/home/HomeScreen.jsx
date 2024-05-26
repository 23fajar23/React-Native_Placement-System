import {ScrollView, SizableText, XStack, YStack} from "tamagui";
import BannerCard from "../../components/home/BannerCard";
import background from "../../../assets/images/background.png"
import woman_work from "../../../assets/images/woman-work.png"
import people_group from "../../../assets/images/people_group.png"
import person_with_laptop from "../../../assets/images/person_with_laptop.png"
import StatisticCard from "../../components/home/StatisticCard";
import {TouchableOpacity} from "react-native";
import TestList from "../test/TestList";

const HomeScreen = ({navigation}) => {

    const handlePressItem = () => {
        navigation.navigate('TestNavigator', {screen: 'TestDetail'})
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
                        />
                        <BannerCard
                            background={background}
                            image={people_group}
                            title={"Welcome Aboard Trainee IT Bootcamp Batch 16"}
                            textButton={"Get to know"}
                        />
                        <BannerCard
                            background={background}
                            image={person_with_laptop}
                            title={"Easy Ways Learn to Become a Software Engineer"}
                            textButton={"Read more"}
                        />
                    </XStack>
                </ScrollView>
                <YStack flex={1} gap={"$3"}>
                    <XStack flex={1} gap={"$3"}>
                        <StatisticCard count={17} title={"Active Tests"}/>
                        <StatisticCard count={5} title={"Saved Tests"}/>
                    </XStack>
                    <XStack flex={1} gap={"$3"}>
                        <StatisticCard count={5} title={"Total Applications"}/>
                        <StatisticCard count={3} title={"Active Applications"}/>
                    </XStack>
                </YStack>
                <XStack flex={1} justifyContent={"space-between"} alignItems={"center"}>
                    <SizableText
                        style={{fontFamily: 'PoppinsBold'}}
                        size={'$7'}>
                        Recent Tests
                    </SizableText>
                    <TouchableOpacity>
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
                    backgroundColor={"white"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    marginHorizontal={"$-3"}>
                    <TestList handlePressItem={handlePressItem}/>
                </YStack>
            </YStack>
        </ScrollView>
    )
}

export default HomeScreen