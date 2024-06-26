import {Select} from "@tamagui/select";
import {Adapt, ScrollView, SizableText, YStack} from "tamagui";
import {useMemo} from "react";
import {FontAwesome6} from "@expo/vector-icons";
import {Controller} from "react-hook-form";
import CustomSheet from "./CustomSheet";

const CustomSelect = ({name, leftIcon, control, placeholder, items, error, disabled}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value}}) => (
                <YStack>
                    <Select value={value} onValueChange={onChange} disablePreventBodyScroll>
                        <Select.Trigger
                            disabled={disabled}
                            alignItems={"center"}
                            size={"$5"}
                            borderColor={"white"}
                            width={"100%"}
                            iconAfter={() =>
                                <FontAwesome6
                                    name={"caret-down"} size={16}
                                    color={value || disabled ? "black" : "grey"}/>
                            }>
                            <YStack position={"absolute"} zIndex={1} left={"$4"}>
                                <FontAwesome6
                                    name={leftIcon}
                                    size={16}
                                    color={value || disabled ? "black" : "grey"}
                                    solid/>
                            </YStack>
                            <Select.Value
                                left={"$6"}
                                size={"$5"}
                                style={{fontFamily: "PoppinsRegular"}}
                                placeholder={placeholder}
                                color={value || disabled ? "black" : "grey"}>
                                {value ? value.name : placeholder}
                            </Select.Value>
                        </Select.Trigger>

                        <Adapt when="sm" platform="touch">
                            <CustomSheet title={placeholder} titleColor={"black"} content={<Adapt.Contents/>}/>
                        </Adapt>

                        <Select.Content zIndex={9999}>
                            <Select.Viewport>
                                <ScrollView>
                                    <Select.Group padding={"$3"} gap={"$3"}>
                                        {useMemo(
                                            () =>
                                                items?.map((item, index) => {
                                                    return (
                                                        <Select.Item
                                                            alignItems={"center"}
                                                            width={"100%"}
                                                            padding={"$3"}
                                                            backgroundColor={"white"}
                                                            borderWidth={"$0.5"}
                                                            borderColor={value === item.id ? "deepskyblue" : "lightgray"}
                                                            borderRadius={"$5"}
                                                            index={index}
                                                            key={item.id}
                                                            value={item.id}>
                                                            <Select.ItemText
                                                                alignSelf={"center"}
                                                                style={{
                                                                    fontFamily: "PoppinsRegular",
                                                                }}
                                                                size={"$5"}>
                                                                {item.name} {item.region}
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
                                </ScrollView>
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