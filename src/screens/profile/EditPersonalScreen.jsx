import {Avatar, ScrollView, Separator, Spinner, XStack, YStack} from "tamagui";
import React, {useEffect} from "react";
import CustomInput from "../../components/CustomInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PrimaryButton from "../../components/button/PrimaryButton";
import {FontAwesome6} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {useToastController} from "@tamagui/toast";
import {useDispatch, useSelector} from "react-redux";
import {updateTrainee} from "../../api/trainee";
import {setStatus} from "../../redux/traineeSlice";
import {StatusEnum} from "../../utils/StatusEnum";

const editProfileSchema = yup.object({
    id: yup
        .string()
        .required("Trainee ID is required"),
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    mobilePhone: yup
        .string()
        .required("Mobile phone is required")
        .matches(/^[0-9]{10,15}$/, "Mobile phone is invalid"),
    address: yup
        .string()
        .required("Address is required")
        .min(10, "Address must be at least 10 characters"),
    email: yup
        .string()
        .email("Email is invalid")
        .required("Email is required"),
    educationId: yup
        .string()
        .required("Education is required"),
    batchId: yup
        .string()
        .required("Batch is required"),
    status: yup
        .mixed()
        .oneOf(Object.values(StatusEnum), 'Status must be either ACTIVE or NOT_ACTIVE')
}).required();

const InputFields = ({control, errors}) => {
    return (
        <YStack gap={"$3"}>
            <CustomInput
                name={"name"}
                control={control}
                icon={"user"}
                placeholder={"Full Name"}
                error={errors.name}
                editable
            />
            <CustomInput
                name={"mobilePhone"}
                control={control}
                icon={"phone"}
                placeholder={"Phone Number"}
                error={errors.mobilePhone}
                editable
            />
            <CustomInput
                name={"address"}
                control={control}
                icon={"location-dot"}
                placeholder={"Address"}
                error={errors.address}
                editable
            />
            <CustomInput
                name={"email"}
                control={control}
                icon={"envelope"}
                placeholder={"Email"}
                error={errors.email}
                editable={false}
            />
            {/*<CustomSelect*/}
            {/*    name={"educationId"}*/}
            {/*    control={control}*/}
            {/*    error={errors.educationId}*/}
            {/*    leftIcon={"graduation-cap"}*/}
            {/*    placeholder={'Select Educational Status'}*/}
            {/*    items={[]}*/}
            {/*    disabled={true}*/}
            {/*/>*/}
            {/*<CustomSelect*/}
            {/*    name={"batchId"}*/}
            {/*    control={control}*/}
            {/*    error={errors.batchId}*/}
            {/*    leftIcon={"school"}*/}
            {/*    placeholder={'Select Batch'}*/}
            {/*    items={[]}*/}
            {/*    disabled={true}*/}
            {/*/>*/}
        </YStack>
    )
}


const EditPersonalScreen = ({navigation}) => {
    const toast = useToastController()
    const dispatch = useDispatch()
    let {selectedTrainee, loading, error, status} = useSelector((state) => state.trainee);

    const {
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            id: "",
            name: "",
            mobilePhone: "",
            address: "",
            email: "",
            educationId: "",
            batchId: "",
        },
        resolver: yupResolver(editProfileSchema),
    });

    useEffect(() => {
        if (selectedTrainee) {
            setValue("id", selectedTrainee.id);
            setValue("name", selectedTrainee.name);
            setValue("mobilePhone", selectedTrainee.mobilePhone);
            setValue("email", selectedTrainee.userCredential.email);
            setValue("address", selectedTrainee.address);
            setValue("educationId", selectedTrainee.education.id);
            setValue("batchId", selectedTrainee.batch.id);
            setValue("status", StatusEnum.ACTIVE);
        }
    }, [selectedTrainee, setValue]);

    useEffect(() => {
            if (status === 200) {
                toast.show('', {
                    message: "Account Successfully Edited!",
                    native: false,
                });
                navigation.navigate('InitialNavigator', {screen: 'Profile'});
            } else if (error) {
                toast.show('', {
                    message: error.message,
                    native: false,
                });
            }

            dispatch(setStatus(null))
        }, [navigation, toast, error, status]
    )

    const onSubmit = () => {
        const {id, name, address, mobilePhone, educationId, batchId, status} = getValues()

        dispatch(updateTrainee({id, name, address, mobilePhone, educationId, batchId, status}))
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
                    title={
                        <>
                            {loading ? (
                                <Spinner size={"small"} color="lightgray"/>
                            ) : (
                                "Save"
                            )}
                        </>
                    }
                    onPress={handleSubmit(onSubmit)}
                />
            </XStack>
        </>
    )
}

export default EditPersonalScreen