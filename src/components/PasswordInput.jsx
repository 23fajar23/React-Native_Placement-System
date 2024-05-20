import {Input, SizableText, XStack, YStack} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";
import {Controller} from "react-hook-form";
import {useState} from "react";

const PasswordInput = ({name, control, placeholder, error}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const getIconColor = (value, isFocused) => {
        if (isFocused) {
            return 'dodgerblue';
        } else if (value) {
            return 'black';
        } else {
            return 'grey';
        }
    };

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(prev => !prev);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
                <YStack>
                    <XStack alignItems={"center"}>
                        <YStack position={"absolute"} zIndex={1} left={"$5"}>
                            <FontAwesome6
                                name={"lock"}
                                size={16}
                                color={getIconColor(value, isFocused)}
                                solid/>
                        </YStack>
                        <Input
                            secureTextEntry={secureTextEntry}
                            fontFamily={"PoppinsRegular"}
                            fontSize={"$5"}
                            size={"$5"}
                            focusStyle={{
                                borderColor: "dodgerblue",
                                backgroundColor: 'rgba(0, 191, 255, 0.05)'
                            }}
                            borderRadius={"$5"}
                            borderColor={"white"}
                            paddingLeft={"$9"}
                            width={"100%"}
                            placeholder={placeholder}
                            onChangeText={onChange}
                            onBlur={() => {
                                onBlur()
                                setIsFocused(false)
                            }}
                            onFocus={() => setIsFocused(true)}
                            value={value}/>
                        <YStack position={"absolute"} zIndex={1} right={"$5"}>
                            <FontAwesome6
                                name={secureTextEntry ? "eye" : "eye-slash"}
                                size={16}
                                color={getIconColor(value, isFocused)}
                                onPress={toggleSecureTextEntry}
                                solid/>
                        </YStack>
                    </XStack>
                    {error && (
                        <SizableText left={"$5"} marginTop={"$1"} fontSize={"$3"} color={"red"}>
                            {error.message}
                        </SizableText>
                    )}
                </YStack>
            )}
        />
    )
}

export default PasswordInput