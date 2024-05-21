import {Button, Image, ScrollView, SizableText, XStack, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import Logo from '../../../assets/logo.png'
import CustomInput from "../../components/CustomInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordInput from "../../components/PasswordInput";
import CustomSelect from "../../components/CustomSelect";
import {educationalStatus} from "../../dummys/educationalStatus";
import {batches} from "../../dummys/batches";
import AuthHeader from "../../components/AuthHeader";
import PrimaryButton from "../../components/PrimaryButton";
import AuthFooter from "../../components/AuthFooter";

const registerSchema = yup.object({
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
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
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
        <PasswordInput
            name={"password"}
            control={control}
            placeholder={"Password"}
            error={errors.password}
        />
    </YStack>
);

const RegisterScreen = ({navigation}) => {
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
            password: "",
        },
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = () => {
        const {name, mobilePhone, email, address, educationId, batchId, password} = getValues()
        navigation.navigate('Login')
    };

    const onClickLogin = () => {
        navigation.navigate('Login')
    };


    return (
        <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
            <YStack flex={1} backgroundColor={"white"} gap={"$7"} alignItems={'center'} padding={"$5"}>
                <AuthHeader logo={Logo} title={"Create New Account"}/>

                <YStack alignItems={"center"} width={"100%"} gap={"$3"}>
                    <InputFields control={control} errors={errors}/>
                </YStack>

                <PrimaryButton onPress={handleSubmit(onSubmit)} title={"Sign Up"}/>

                <AuthFooter onPress={onClickLogin} text={"Login"}/>
            </YStack>
        </ScrollView>
    )
}

export default RegisterScreen