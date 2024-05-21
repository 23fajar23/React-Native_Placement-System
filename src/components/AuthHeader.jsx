import {Image, SizableText, YStack} from "tamagui";

const AuthHeader = ({logo, title}) => (
    <>
        <YStack width={"25%"} aspectRatio={1} marginTop={"$3"}>
            <Image source={logo} width={'100%'} height={'100%'}/>
        </YStack>
        <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>{title}</SizableText>
    </>
);

export default AuthHeader