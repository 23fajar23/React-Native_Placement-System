import {ScrollView, Spinner, YStack} from "tamagui";
import Logo from '../../../assets/logo.png'
import CustomInput from "../../components/CustomInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordInput from "../../components/PasswordInput";
import CustomSelect from "../../components/CustomSelect";
import AuthHeader from "../../components/auth/AuthHeader";
import PrimaryButton from "../../components/button/PrimaryButton";
import AuthFooter from "../../components/auth/AuthFooter";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useToastController} from "@tamagui/toast";
import {registerTrainee} from "../../api/auth";
import {getBatches} from "../../api/batch";
import {getEducations} from "../../api/education";

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

const InputFields = ({control, errors}) => {
    const dispatch = useDispatch()
    const {batches} = useSelector((state) => state.batch)
    const {educations} = useSelector((state) => state.education)

    useEffect(() => {
        dispatch(getBatches())
        dispatch(getEducations())
    }, [dispatch]);

    const extractNumber = (name) => {
        const match = name.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };

    const sortedBatches = batches?.slice().sort((a, b) => {
        if (a.region < b.region) return -1;
        if (a.region > b.region) return 1;
        const numA = extractNumber(a.name);
        const numB = extractNumber(b.name);
        return numA - numB;
    });

    const sortedEducations = educations?.slice().sort((a, b) => a.value - b.value);

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
                name={"email"}
                control={control}
                icon={"envelope"}
                placeholder={"Email"}
                error={errors.email}
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
            <CustomSelect
                name={"educationId"}
                control={control}
                error={errors.educationId}
                leftIcon={"graduation-cap"}
                placeholder={"Select Educational Status"}
                items={sortedEducations}
                disabled={false}
            />
            <CustomSelect
                name={"batchId"}
                control={control}
                error={errors.batchId}
                leftIcon={"school"}
                placeholder={"Select Batch"}
                items={sortedBatches}
                disabled={false}
            />
            <PasswordInput
                name={"password"}
                control={control}
                placeholder={"Password"}
                error={errors.password}
            />
        </YStack>
    );
}

const RegisterScreen = ({navigation}) => {
    const toast = useToastController()

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

    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);

    const onSubmit = async () => {
        const {name, mobilePhone, email, address, educationId, batchId, password} = getValues();

        try {
            const res = await dispatch(registerTrainee({
                name,
                mobilePhone,
                email,
                address,
                educationId,
                batchId,
                password
            }));

            if (res.payload && res.payload.status === 201) {
                toast.show('', {
                    message: "New Account Created!",
                    native: false,
                });
                navigation.navigate('Login');
            }
        } catch (error) {
            toast.show('', {
                message: error.message,
                native: false,
            });
        }
    };

    const onClickLogin = () => {
        navigation.navigate('Login')
    };


    return (
        <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
            <YStack flex={1} backgroundColor={"white"} gap={"$5"} alignItems={'center'} padding={"$3"}>
                <AuthHeader logo={Logo} title={"Create New Account"}/>

                <InputFields control={control} errors={errors}/>

                <PrimaryButton
                    onPress={handleSubmit(onSubmit)}
                    title={
                        <>
                            {loading ? (
                                <Spinner size={"small"} color="lightgray"/>
                            ) : (
                                "Sign Up"
                            )}
                        </>
                    }/>

                <AuthFooter onPress={onClickLogin} text={"Login"}/>
            </YStack>
        </ScrollView>
    )
}

export default RegisterScreen