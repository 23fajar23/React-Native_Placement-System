import {YStack} from "tamagui";
import TestList from "./TestList";

const TestScreen = ({navigation}) => {

    const handlePressItem = () => {
        navigation.navigate('TestNavigator')
    };

    return (
        <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
            <TestList handlePressItem={handlePressItem}/>
        </YStack>
    );
};


export default TestScreen