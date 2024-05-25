import {SizableText, YStack} from "tamagui";

const StatisticCard = ({count, title}) => {
    return (
        <YStack
            flex={1}
            borderColor={"lightgrey"}
            borderRadius={"$9"}
            borderWidth={"$0.5"}
            paddingVertical={"$3"}
            paddingHorizontal={"$5"}>
            <SizableText
                style={{fontFamily: 'PoppinsBold'}}
                size={'$9'}
                color={"deepskyblue"}>
                {count}
            </SizableText>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}>
                {title}
            </SizableText>
        </YStack>
    )
}

export default StatisticCard