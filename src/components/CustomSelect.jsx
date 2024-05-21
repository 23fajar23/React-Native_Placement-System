import {Select} from "@tamagui/select";
import {Adapt, Separator, Sheet, SizableText, XStack, YStack} from "tamagui";
import {useMemo} from "react";
import {FontAwesome6} from "@expo/vector-icons";
import {Controller} from "react-hook-form";

const CustomSelect = ({name, leftIcon, control, placeholder, items, error}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value}}) => (
                <YStack>
                    <Select value={value} onValueChange={onChange} disablePreventBodyScroll>
                        <Select.Trigger
                            alignItems={"center"}
                            size={"$5"}
                            borderColor={"white"}
                            width={"100%"}
                            iconAfter={() =>
                                <FontAwesome6 name={"chevron-down"} size={16} color={"grey"}/>
                            }>
                            <YStack position={"absolute"} zIndex={1} left={"$4"}>
                                <FontAwesome6
                                    name={leftIcon}
                                    size={16}
                                    color={"grey"}
                                    solid/>
                            </YStack>
                            <Select.Value
                                left={"$5"}
                                size={"$5"}
                                style={{fontFamily: "PoppinsRegular"}}
                                placeholder={placeholder}
                                color={"grey"}>
                                {value ? value.name : placeholder}
                            </Select.Value>
                        </Select.Trigger>

                        <Adapt when="sm" platform="touch">
                            <Sheet
                                modal
                                dismissOnSnapToBottom
                                animationConfig={false}
                                snapPointsMode={"fit"}>
                                <Sheet.Frame style={{borderTopStartRadius: 64, borderTopEndRadius: 64}}>
                                    <YStack alignItems={"center"}>
                                        <XStack marginVertical={"$3"} height={3} width={"$3"}
                                                backgroundColor={"lightgray"}
                                                borderRadius={"$9"}/>
                                        <SizableText
                                            alignSelf={"center"}
                                            style={{fontFamily: 'PoppinsBold'}}
                                            size={'$7'}>
                                            {placeholder}
                                        </SizableText>
                                    </YStack>
                                    <Separator marginVertical={"$3"} marginHorizontal={"$5"} borderWidth={"$0.5"}/>
                                    <Adapt.Contents/>
                                </Sheet.Frame>
                                <Sheet.Overlay
                                    enterStyle={{opacity: 0}}
                                    exitStyle={{opacity: 0}}
                                />
                            </Sheet>
                        </Adapt>

                        <Select.Content zIndex={9999}>
                            <Select.Viewport>
                                <Select.Group paddingHorizontal={"$5"} paddingVertical={"$3"} gap={"$3"}>
                                    {useMemo(
                                        () =>
                                            items.map((item, i) => {
                                                return (
                                                    <Select.Item
                                                        alignItems={"center"}
                                                        width={"100%"}
                                                        padding={"$3"}
                                                        backgroundColor={"whitesmoke"}
                                                        borderWidth={"$0.5"}
                                                        borderColor={value === item.id ? "deepskyblue" : "white"}
                                                        borderRadius={"$5"}
                                                        index={i}
                                                        key={item.id}
                                                        value={item.id}>
                                                        <Select.ItemText
                                                            alignSelf={"center"}
                                                            style={{
                                                                fontFamily: "PoppinsRegular",
                                                            }}
                                                            size={"$5"}>
                                                            {item.name}
                                                        </Select.ItemText>
                                                        <Select.ItemIndicator>
                                                            <FontAwesome6
                                                                name={"circle-check"}
                                                                size={16}
                                                                color={"deepskyblue"}/>
                                                        </Select.ItemIndicator>
                                                    </Select.Item>
                                                )
                                            }),
                                        [items, value]
                                    )}
                                </Select.Group>
                            </Select.Viewport>
                        </Select.Content>
                    </Select>
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

export default CustomSelect