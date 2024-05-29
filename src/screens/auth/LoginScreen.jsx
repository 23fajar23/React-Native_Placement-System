import {Checkbox, Label, ScrollView, Separator, SizableText, Spinner, XStack, YStack} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import Logo from '../../../assets/logo.png'
import IconCard from "../../components/IconCard";
import CustomInput from "../../components/CustomInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordInput from "../../components/PasswordInput";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import PrimaryButton from "../../components/button/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {login} from "../../api/auth";
import {useToastController} from "@tamagui/toast";
import * as SecureStorage from "expo-secure-store";
import {setStatus} from "../../redux/authSlice";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Email is invalid")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
}).required();

const InputFields = ({control, errors}) => (
    <YStack gap={"$3"}>
        <CustomInput
            name={"email"}
            control={control}
            icon={"envelope"}
            placeholder={"Email"}
            error={errors.email}
            editable
        />
        <PasswordInput
            name={"password"}
            control={control}
            placeholder={"Password"}
            error={errors.password}
        />
    </YStack>
);

const LoginAlternatives = () => (
    <YStack alignItems={"center"} gap={"$3"}>
        <XStack alignItems={"center"}>
            <Separator marginVertical={"$5"} borderWidth={"$0.5"}/>
            <SizableText
                textAlign={"center"}
                marginHorizontal={"$3"}
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}
                color={"gray"}>
                or continue with
            </SizableText>
            <Separator marginVertical={"$5"} borderWidth={"$0.5"}/>
        </XStack>
        <XStack gap={"$3"}>
            <IconCard icon={"facebook"}/>
            <IconCard icon={"google"}/>
            <IconCard icon={"apple"}/>
        </XStack>
    </YStack>
);

const LoginScreen = ({navigation}) => {
    const [rememberMe, setRememberMe] = useState(false);
    const toast = useToastController()

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const dispatch = useDispatch();
    const {loading, error, status} = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCredentials = async () => {
            const savedEmail = SecureStorage.getItem('rememberedEmail');
            const savedPassword = SecureStorage.getItem('rememberedPassword');
            if (savedEmail && savedPassword) {
                setValue('email', savedEmail);
                setValue('password', savedPassword);
            }
        };
        fetchCredentials();

        if (status === 200) {
            toast.show('', {
                message: "Login Success!",
                native: false,
            });
            navigation.navigate('InitialNavigator');
        } else if (error) {
            toast.show('', {
                message: error.message,
                native: false,
            });
        }

        dispatch(setStatus(null));
    }, [navigation, toast, error, status, setValue, dispatch]);

    const onSubmit = ({email, password}) => {
        dispatch(login({email, password}));

        if (rememberMe) {
            SecureStorage.setItem('rememberedEmail', email);
            SecureStorage.setItem('rememberedPassword', password);
        } else {
            SecureStorage.deleteItemAsync('rememberedEmail');
            SecureStorage.deleteItemAsync('rememberedPassword');
        }

        setRememberMe(false);
    };

    const onClickRegister = () => {
        navigation.navigate('Register')
    };

    return (
        <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
            <YStack flex={1} backgroundColor={"white"} gap={"$5"} alignItems={'center'} padding={"$3"}>
                <AuthHeader logo={Logo} title={"Login to Your Account"}/>

                <YStack alignItems={"center"} width={"100%"} gap={"$3"}>
                    <InputFields control={control} errors={errors}/>
                    <XStack alignItems={'center'} gap={'$2'}>
                        <Checkbox
                            theme={'blue'}
                            id={'remember_me'}
                            size={'$3'}
                            checked={rememberMe}
                            onCheckedChange={setRememberMe}>
                            <Checkbox.Indicator>
                                <FontAwesome6
                                    name={'check'}
                                    size={8}
                                    color={"white"}
                                />
                            </Checkbox.Indicator>
                        </Checkbox>
                        <Label top={"$1"} style={{fontFamily: "PoppinsRegular"}} size={'$3'} htmlFor={'remember_me'}>
                            Remember me
                        </Label>
                    </XStack>
                </YStack>

                <PrimaryButton
                    onPress={handleSubmit(onSubmit)}
                    title={
                        <>
                            {loading ? (
                                <Spinner size={"small"} color="lightgray"/>
                            ) : (
                                "Login"
                            )}
                        </>
                    }
                />

                <TouchableOpacity>
                    <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'} color={"deepskyblue"}>
                        Forgot the password?
                    </SizableText>
                </TouchableOpacity>

                <LoginAlternatives/>

                <AuthFooter onPress={onClickRegister} text={"Sign Up"}/>
            </YStack>
        </ScrollView>
    )
}

export default LoginScreen;
