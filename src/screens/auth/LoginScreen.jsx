import {Checkbox, Label, ScrollView, Separator, SizableText, XStack, YStack} from "tamagui";
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

const InputFields = ({control, errors}) => (
    <YStack gap={"$3"}>
        <CustomInput
            name={"email"}
            control={control}
            icon={"envelope"}
            placeholder={"Email"}
            error={errors.email}
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
        navigation.navigate('Home')
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
                    <XStack alignItems={'center'} gap={'$3'}>
                        <Checkbox theme={'blue'} id={'remember_me'} size={'$3'}>
                            <Checkbox.Indicator>
                                <FontAwesome6 name={'check'} size={8} color={"white"}/>
                            </Checkbox.Indicator>
                        </Checkbox>
                        <Label style={{fontFamily: "PoppinsRegular"}} size={'$5'} htmlFor={'remember_me'}>
                            Remember me
                        </Label>
                    </XStack>
                </YStack>

                <PrimaryButton onPress={handleSubmit(onSubmit)} title={"Login"}/>

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

export default LoginScreen