import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function Pedidos() {

    const navigation = useNavigation()
    const panGesture = Gesture.Pan().activeOffsetX([-10,10]).failOffsetY([-10,10]).onEnd((event) => {

        if (event.translationX > -50) {
            navigation.navigate('Sacola')
        }

    })

    return (
        <GestureDetector gesture={panGesture}>
            <View style={{flex : 1}} >

            </View>
        </GestureDetector>
    )
}