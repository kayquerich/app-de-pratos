import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native"
import { CartProduct } from "../components/CartProduct"
import { MaterialIcons as Icon } from "@expo/vector-icons"
import { MaterialCommunityIcons as Icone } from "@expo/vector-icons"

export default function Pedido () {

    const [pedido, setPedido] = useState()
    const route = useRoute()
    const { id } = route.params || ''

    useEffect(() => {
        
        const fetchPedido = async () => {
            const saved_pedidos = JSON.parse(await AsyncStorage.getItem('pedidos')) || []
            const getPedido = saved_pedidos.filter(pedido => pedido.id === id)[0]
            setPedido(getPedido)
            console.log(getPedido)
        }
        fetchPedido()

    }, [])

    const checkPedido = async () => {
        const pedidoAtualizado = {...pedido, recebido : true}
        setPedido(pedidoAtualizado)

        const pedidosSalvos = await AsyncStorage.getItem('pedidos');
        let listaPedidos = pedidosSalvos ? JSON.parse(pedidosSalvos) : [];

        const pedidosAtualizados = listaPedidos.map(p => 
        p.id === pedidoAtualizado.id ? pedidoAtualizado : p
        );

        await AsyncStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
    }

    const navigation = useNavigation()
    const goBack = () => navigation.goBack()

    return (
        <View style={styles.page} >
            <ScrollView style={{flex : 1}} >

                <View style={{flexDirection : 'row'}} >
                    <Pressable style={styles.backbutton} onPress={goBack} >
                        <Icone name="chevron-left" size={30} color='red' />
                    </Pressable>
                    <Text style={{fontSize : 20, fontWeight : 'bold'}} >{pedido && pedido.id}</Text>
                </View>

                {pedido && pedido.sacola?.map((produto, index) => (
                    <CartProduct dados={produto} key={index} />
                ))}

                <Text style={{fontSize : 20, fontWeight : 'bold', marginVertical : 10}} >Resumo do pedido</Text>

                <View style={{gap : 10}} >
                    <Text>Valor Total : {pedido && pedido.valorTotal}</Text>
                    <Text style={{fontSize : 16}}>Local de Entrega <Icon name="location-pin" size={16} color='gray' /></Text>
                    <Text>{pedido && pedido.endereco}</Text>
                </View>

                {pedido && !pedido.recebido ? (
                    <Pressable style={styles.check} onPress={checkPedido} >
                        <Text style={{color : 'green', fontSize : 18, fontWeight : 'bold'}} >Marcar como Recebido</Text>
                    </Pressable>
                ) : (
                    <Text style={{color : 'green', fontSize : 18, fontWeight : 'bold', marginVertical : 15, alignSelf : 'center'}} >Pedido Recebido</Text>
                )}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page : {
        flex : 1,
        backgroundColor : 'white',
        padding : 15,
        position : 'relative'
    },
    check : {
        width : '100%',
        height : 40,
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : 'gray',
        alignItems : 'center',
        justifyContent : 'center',
        marginVertical : 15
    },
    backbutton : {
        marginRight : 15
    }
})