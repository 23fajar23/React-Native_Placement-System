import {Image, SizableText, XStack, YStack} from "tamagui";
import {Dimensions, Linking, TouchableOpacity} from "react-native";
import {useToastController} from "@tamagui/toast";

const {width: deviceWidth} = Dimensions.get('window');
const cardWidth = deviceWidth * 0.9;

const BannerCard = ({background, title, textButton, image, link}) => {
    const toast = useToastController()

    const handlePress = () => {
        if (link) {
            Linking.openURL(link).catch(
                toast.show('', {
                    message: 'Failed to open link!',
                    native: false,
                })
            );
        }
    };

    return (
        <XStack
            flex={1}
            height={"$13"}
            width={cardWidth}
            borderRadius={"$11"}
            overflow={"hidden"}
            alignItems={"center"}
            justifyContent={"center"}>
            <Image
                position={"absolute"}
                source={background}
                width={"100%"}
                height={"100%"}
                objectFit={"cover"}
                opacity={0.8}/>
            <YStack flex={1} alignItems={"flex-start"} justifyContent={"center"} left={"$5"} gap={"$3"}>
                <SizableText
                    style={{fontFamily: 'PoppinsBold'}}
                    size={'$5'}
                    color={"white"}>
                    {title}
                </SizableText>
                <TouchableOpacity onPress={handlePress}>
                    <SizableText
                        style={{fontFamily: 'PoppinsRegular'}}
                        size={'$3'}
                        borderRadius={"$20"}
                        paddingHorizontal={"$3"}
                        paddingVertical={"$1.5"}
                        paddingTop={"$2"}
                        backgroundColor={"white"}
                        color={"deepskyblue"}>
                        {textButton}
                    </SizableText>
                </TouchableOpacity>
            </YStack>
            <YStack flex={1} top={"$3"} right={"$1"}>
                <Image
                    source={image}
                    style={{width: '100%', height: '100%', objectFit: 'contain'}}
                />
            </YStack>
        </XStack>
    )
}

export default BannerCard