import {Button, Image, ScrollView, SizableText, XStack, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import Logo from '../../assets/logo.png'
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordInput from "../components/PasswordInput";
import CustomSelect from "../components/CustomSelect";
import {educationalStatus} from "../dummys/educationalStatus";
import {batches} from "../dummys/batches";

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

const RegisterScreen = () => {
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
    };

    return (
        <ScrollView>
            <YStack flex={1} gap={"$5"} alignItems={'center'} padding={"$5"}>
                <YStack width={"25%"} aspectRatio={1} marginTop={"$3"}>
                    <Image source={Logo} width={'100%'} height={'100%'}/>
                </YStack>

                <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>Buat Akun Baru</SizableText>

                <YStack alignItems={"center"} width={"100%"} gap={"$3"}>
                    <YStack gap={"$3"}>
                        <CustomInput
                            name={"name"}
                            control={control}
                            icon={"user"}
                            placeholder={"Nama Lengkap"}
                            error={errors.name}
                        />
                        <CustomInput
                            name={"mobilePhone"}
                            control={control}
                            icon={"phone"}
                            placeholder={"Nomor Handphone"}
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
                            placeholder={"Alamat"}
                            error={errors.address}
                        />
                        <CustomSelect
                            leftIcon={"graduation-cap"}
                            placeholder={"Pilih Pendidikan Terakhir"}
                            items={educationalStatus}
                        />
                        <CustomSelect
                            leftIcon={"school"}
                            placeholder={"Pilih Batch"}
                            items={batches}
                        />
                        <PasswordInput
                            name={"password"}
                            control={control}
                            placeholder={"Password"}
                            error={errors.password}
                        />
                    </YStack>
                </YStack>

                <Button
                    style={{borderRadius: 999}}
                    size={'$5'}
                    width={"100%"}
                    backgroundColor={"deepskyblue"}
                    color={"white"}
                    onPress={handleSubmit(onSubmit)}>
                    <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'}
                                 color={"white"}>Daftar</SizableText>
                </Button>

                <XStack gap={"$1"} alignSelf={"center"}>
                    <SizableText
                        style={{fontFamily: 'PoppinsRegular'}}
                        size={"$5"}
                        color={"lightgray"}>
                        Sudah memiliki akun?
                    </SizableText>
                    <TouchableOpacity>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={"$5"}
                            color={"deepskyblue"}>
                            Masuk
                        </SizableText>
                    </TouchableOpacity>
                </XStack>
            </YStack>
        </ScrollView>
    )
}

export default RegisterScreen