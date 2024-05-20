import {Button, Card, Checkbox, Image, Input, Label, SizableText, XStack, YStack} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import Icon from '../../assets/icon.png'
import IconCard from "../components/IconCard";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordInput from "../components/PasswordInput";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Email is invalid")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
}).required();

const LoginScreen = () => {
    const {
        control,
        getValues,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = () => {
        const {email, password} = getValues()
    };

    return (
        <YStack flex={1} justifyContent={'space-between'} alignItems={'center'} padding={"$5"}>
            <YStack width={"40%"} aspectRatio={1}>
                <Image source={Icon} width={'100%'} height={'100%'}/>
            </YStack>

            <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>Masuk dengan akun Anda</SizableText>

            <YStack alignItems={"center"} width={"100%"} gap={"$3"}>
                <YStack gap={"$3"}>
                    <CustomInput
                        name={"email"}
                        control={control}
                        icon={"envelope"}
                        placeholder={"Masukkan Email"}
                        error={errors.email}
                    />
                    <PasswordInput
                        name={"password"}
                        control={control}
                        placeholder={"Masukkan Password"}
                        error={errors.password}
                    />
                </YStack>
                <XStack alignItems={'center'} gap={'$3'}>
                    <Checkbox theme={'blue'} id={'remember_me'} size={'$3'}>
                        <Checkbox.Indicator>
                            <FontAwesome6 name={'check'} size={8} color={"white"}/>
                        </Checkbox.Indicator>
                    </Checkbox>
                    <Label style={{fontFamily: "PoppinsRegular"}} size={'$5'} htmlFor={'remember_me'}>Ingat saya</Label>
                </XStack>
                <Button
                    style={{borderRadius: 999}}
                    size={'$5'}
                    width={"100%"}
                    backgroundColor={"deepskyblue"}
                    color={"white"}
                    onPress={handleSubmit(onSubmit)}>
                    <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'} color={"white"}>Masuk</SizableText>
                </Button>
                <TouchableOpacity>
                    <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'} color={"deepskyblue"}>
                        Lupa password?
                    </SizableText>
                </TouchableOpacity>
            </YStack>

            <YStack alignItems={"center"} gap={"$5"}>
                <XStack alignItems={"center"}>
                    <XStack flex={1} height={2} backgroundColor={"lightgray"}/>
                    <SizableText
                        textAlign={"center"}
                        marginHorizontal={"$3"}
                        style={{fontFamily: 'PoppinsRegular'}}
                        size={'$5'}
                        color={"gray"}>
                        atau lanjutkan dengan
                    </SizableText>
                    <XStack flex={1} height={2} backgroundColor={"lightgray"}/>
                </XStack>
                <XStack gap={"$3"}>
                    <IconCard icon={"facebook"}/>
                    <IconCard icon={"google"}/>
                    <IconCard icon={"apple"}/>
                </XStack>
            </YStack>

            <XStack gap={"$1"} alignSelf={"center"}>
                <SizableText
                    style={{fontFamily: 'PoppinsRegular'}}
                    size={"$5"}
                    color={"lightgray"}>
                    Belum punya akun?
                </SizableText>
                <TouchableOpacity>
                    <SizableText
                        style={{fontFamily: 'PoppinsRegular'}}
                        size={"$5"}
                        color={"deepskyblue"}>
                        Daftar
                    </SizableText>
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}

export default LoginScreen