import { View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {

    const navigation = useNavigation();
    const panGesture = Gesture.Pan().activeOffsetX([-10,10]).failOffsetY([-10,10]).onEnd((event) => {

        if (event.translationX < -50) {
            navigation.navigate('Pedidos')
        } else if (event.translationX > 50) {
            navigation.navigate('Home')
        }

    })

    return (
        <GestureDetector gesture={panGesture} >
            <View style={{ flex : 1 }} >

            </View>
        </GestureDetector>
    )
}