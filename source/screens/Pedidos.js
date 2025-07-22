import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardPedido } from "../components/CardPedido";

export default function Pedidos() {

    const navigation = useNavigation()
    const panGesture = Gesture.Pan().activeOffsetX([-10,10]).failOffsetY([-10,10]).onEnd((event) => {

        if (event.translationX > -50) {
            navigation.navigate('Sacola')
        }

    })

    const [pedidos, setPedidos] = useState([])
    useEffect(() => {

        const fetchPedidos = async () => {
            const saved_pedidos = await AsyncStorage.getItem('pedidos')
            setPedidos(JSON.parse(saved_pedidos) || [])
        }
        fetchPedidos()

    }, [])

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.page} >
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.title} >Seus Pedidos</Text>
                    {pedidos.map((pedido, index) => (
                        <CardPedido dados={pedido} key={index} />
                    ))}

                </ScrollView>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    page : {
        flex : 1,
        backgroundColor : 'white',
        padding : 15,
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        marginBottom : 10
    }
})