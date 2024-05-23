import {Image, YStack} from "tamagui";

const LogoCard = ({icon}) => {
    return (
        <YStack
            flex={1}
            height={"100%"}
            borderColor={"lightgrey"}
            aspectRatio={1}
            backgroundColor={"white"}
            overflow={"hidden"}
            borderRadius={"$9"}
            borderWidth={"$0.5"}>
            <Image source={icon} width={'100%'} height={"100%"}/>
        </YStack>
    )
}

export default LogoCard