import {Image, SizableText, XStack, YStack} from "tamagui";
import Empty from "../../assets/illustrations/empty.png";

const EmptyList = ({text}) => {
    return (
        <YStack flex={1} alignItems={"center"} justifyContent={"center"} gap={"$3"}>
            <XStack height={"40%"} aspectRatio={1} marginLeft={"$2"}>
                <Image source={Empty} width={'100%'} height={'100%'}/>
            </XStack>
            <SizableText
                style={{fontFamily: 'PoppinsBold'}}
                size={'$7'}>
                Empty
            </SizableText>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}>
                You don't have any {text} at this time
            </SizableText>
        </YStack>
    )
}

export default EmptyList