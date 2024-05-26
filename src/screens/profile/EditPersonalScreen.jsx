import {Avatar, ScrollView, Separator, XStack, YStack} from "tamagui";
import React from "react";
import CustomInput from "../../components/CustomInput";
import * as yup from "yup";
import CustomSelect from "../../components/CustomSelect";
import {educationalStatus} from "../../dummys/educationalStatus";
import {batches} from "../../dummys/batches";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PrimaryButton from "../../components/button/PrimaryButton";
import {FontAwesome6} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

const editProfileSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    mobilePhone: yup
        .string()
        .required("Mobile phone is required")
        .matches(/^[0-9]{10,15}$/, "Mobile phone is invalid"),
    email: yup
        .string()
        .email("Email is invalid")
        .required("Email is required"),
    address: yup
        .string()
        .required("Address is required")
        .min(10, "Address must be at least 10 characters"),
    educationId: yup
        .string()
        .required("Education is required"),
    batchId: yup
        .string()
        .required("Batch is required"),
}).required();

const InputFields = ({control, errors}) => (
    <YStack gap={"$3"}>
        <CustomInput
            name={"name"}
            control={control}
            icon={"user"}
            placeholder={"Full Name"}
            error={errors.name}
        />
        <CustomInput
            name={"mobilePhone"}
            control={control}
            icon={"phone"}
            placeholder={"Phone Number"}
            error={errors.mobilePhone}
        />
        <CustomInput
            name={"email"}
            control={control}
            icon={"envelope"}
            placeholder={"Email"}
            error={errors.email}
        />
        <CustomInput
            name={"address"}
            control={control}
            icon={"location-dot"}
            placeholder={"Address"}
            error={errors.address}
        />
        <CustomSelect
            name={"educationId"}
            control={control}
            error={errors.educationId}
            leftIcon={"graduation-cap"}
            placeholder={"Select Educational Status"}
            items={educationalStatus}
        />
        <CustomSelect
            name={"batchId"}
            control={control}
            error={errors.batchId}
            leftIcon={"school"}
            placeholder={"Select Batch"}
            items={batches}
        />
    </YStack>
);


const EditPersonalScreen = ({navigation}) => {
    const {
        control,
        getValues,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: "",
            mobilePhone: "",
            email: "",
            address: "",
            educationId: "",
            batchId: "",
        },
        resolver: yupResolver(editProfileSchema),
    });

    const onSubmit = () => {
        const {name, mobilePhone, email, address} = getValues()
        navigation.navigate('Profile')
    };

    return (
        <>
            <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
                <YStack alignItems={"center"} padding={"$3"} gap={"$5"}>
                    <TouchableOpacity borderRadius={"$20"}>
                        <Avatar circular size={"$11"}>
                            <Avatar.Image
                                accessibilityLabel="ProfilePicture"
                                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                            />
                        </Avatar>
                        <XStack position={"absolute"} alignSelf={"flex-end"} right={"$0.5"} bottom={"$0.5"}>
                            <FontAwesome6 name={"square-pen"} color={"deepskyblue"} size={32}/>
                        </XStack>
                    </TouchableOpacity>

                    <Separator width={"100%"} borderWidth={"$0.5"}/>

                    <InputFields control={control} errors={errors}/>
                </YStack>
            </ScrollView>

            <XStack
                position={"fixed"}
                bottom={0}
                left={0}
                right={0}
                alignSelf={"flex-end"}
                backgroundColor={"white"}
                padding={"$3"}
                paddingBottom={"$5"}
                borderTopColor={"lightgrey"}
                borderTopWidth={"$0.5"}>
                <PrimaryButton
                    title={"Save"}
                    onPress={handleSubmit(onSubmit)}
                />
            </XStack>
        </>
    )
}

export default EditPersonalScreen