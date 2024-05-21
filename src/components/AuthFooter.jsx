import {SizableText, XStack} from "tamagui";
import {TouchableOpacity} from "react-native";

const AuthFooter = ({onPress, text}) => (
    <XStack alignSelf={"center"}>
        <SizableText
            style={{fontFamily: 'PoppinsRegular'}}
            size={"$5"}
            color={"lightgray"}>
            Don't have an account?{"  "}
        </SizableText>
        <TouchableOpacity onPress={onPress}>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={"$5"}
                color={"deepskyblue"}>
                {text}
            </SizableText>
        </TouchableOpacity>
    </XStack>
);

export default AuthFooter