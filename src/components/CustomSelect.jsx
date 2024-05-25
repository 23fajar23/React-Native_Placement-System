import {Select} from "@tamagui/select";
import {Adapt, SizableText, YStack} from "tamagui";
import {useMemo} from "react";
import {FontAwesome6} from "@expo/vector-icons";
import {Controller} from "react-hook-form";
import CustomSheet from "./CustomSheet";

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
                                <FontAwesome6 name={"caret-down"} size={16} color={"grey"}/>
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
                            <CustomSheet title={placeholder} titleColor={"black"} content={<Adapt.Contents/>}/>
                        </Adapt>

                        <Select.Content zIndex={9999}>
                            <Select.Viewport>
                                <Select.Group padding={"$3"} gap={"$3"}>
                                    {useMemo(
                                        () =>
                                            items.map((item, i) => {
                                                return (
                                                    <Select.Item
                                                        alignItems={"center"}
                                                        width={"100%"}
                                                        padding={"$3"}
                                                        backgroundColor={"white"}
                                                        borderWidth={"$0.5"}
                                                        borderColor={value === item.id ? "deepskyblue" : "lightgray"}
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
                                                                name={"square-check"}
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