import {Select} from "@tamagui/select";
import {Adapt, Separator, Sheet, SizableText, XStack, YStack} from "tamagui";
import {useMemo, useState} from "react";
import type {SelectProps} from 'tamagui'
import {FontAwesome6} from "@expo/vector-icons";

const CustomSelect = (props: SelectProps) => {
    const [val, setVal] = useState(null)

    return (
        <YStack>
            <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
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
                            name={"graduation-cap"}
                            size={16}
                            color={"grey"}
                            solid/>
                    </YStack>
                    <Select.Value
                        left={"$5"}
                        size={"$5"}
                        style={{fontFamily: "PoppinsRegular"}}
                        placeholder="Pilih Pendidikan Terakhir"
                        color={"grey"}/>
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                    <Sheet
                        modal
                        dismissOnSnapToBottom
                        animationConfig={false}
                        snapPointsMode={"fit"}>
                        <Sheet.Frame style={{borderTopStartRadius: 64, borderTopEndRadius: 64}}>
                            <YStack alignItems={"center"}>
                                <XStack marginVertical={"$3"} height={3} width={"$3"} backgroundColor={"lightgray"}
                                        borderRadius={"$9"}/>
                                <SizableText
                                    alignSelf={"center"}
                                    style={{fontFamily: 'PoppinsBold'}}
                                    size={'$7'}>
                                    Pilih Pendidikan Terakhir
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

                <Select.Content zIndex={200000}>
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
                                                borderColor={val === item.name ? "deepskyblue" : "white"}
                                                borderRadius={"$5"}
                                                index={i}
                                                key={item.name}
                                                value={item.name}>
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
                                [items, val]
                            )}
                        </Select.Group>
                    </Select.Viewport>
                </Select.Content>
            </Select>
        </YStack>
    )
}

const items = [
    {name: 'S1/D4'},
    {name: 'D3'},
    {name: 'SMA/SMK'},
]

export default CustomSelect