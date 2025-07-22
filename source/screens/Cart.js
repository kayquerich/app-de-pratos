import { StyleSheet, Text, View } from "react-native";
import { GestureDetector, Gesture, Pressable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartProduct } from "../components/CartProduct";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { ScrollView } from "react-native";

export default function Cart() {

    const navigation = useNavigation();
    const panGesture = Gesture.Pan().activeOffsetX([-10,10]).failOffsetY([-10,10]).onEnd((event) => {

        if (event.translationX < -50) {
            navigation.navigate('Pedidos')
        } else if (event.translationX > 50) {
            navigation.navigate('Home')
        }

    })

    const [endereco, setEndereco] = useState()

    const [valorAtual, setValorAtual] = useState(0)
    const [sacola, setSacola] = useState([])
    useEffect(() => {

        const fetchBag = async () => {

            setValorAtual(0)

            const sacola = await AsyncStorage.getItem('sacola')
            setSacola(JSON.parse(sacola) || [])

            const total =  JSON.parse(sacola).reduce((acc ,item) => {
                return acc + parseFloat(item.preco)
            }, 0)

            setValorAtual(valorAtual + total)

            const saved_endereco = await AsyncStorage.getItem('endereco')
            setEndereco(saved_endereco)

        }
        fetchBag()

    }, [])

    const handleRemove = async (item) => {

        const novaSacola = sacola.filter(produto => produto.id !== item.id)
        setSacola(novaSacola)

        await AsyncStorage.setItem('sacola', JSON.stringify(novaSacola))

        const novoValorTotal = novaSacola.reduce((acc, produto) => acc + parseFloat(produto.preco), 0)
        setValorAtual(novoValorTotal)

    }

    const finalizarPedido = async () => {

        let pedidos = await AsyncStorage.getItem('pedidos') || '[]'
        pedidos = JSON.parse(pedidos)

        const numero = Math.floor(1000 + Math.random() * 9000);
    
        const pedido = {
            id : 'Pedido#' + numero, 
            sacola : sacola,
            valorTotal : valorAtual + 0.99 + 6.00,
            endereco : endereco,
            recebido : false,
        }

        pedidos.push(pedido)
        await AsyncStorage.setItem('pedidos', JSON.stringify(pedidos))
        await AsyncStorage.setItem('sacola', JSON.stringify([]))
        setSacola([])
        setValorAtual(0)
        navigation.navigate('Pedidos')
    }

    return (
        <GestureDetector gesture={panGesture} >
            <View style={styles.page} >
                <ScrollView  showsVerticalScrollIndicator={false} style={{flex : 1}}>
                    <View style={{flex : 1}} >
                        <Text style={styles.title} >Sacola</Text>
                        {sacola.length === 0 ? (
                            <View style={styles.emptyPage}>
                                <Text style={{marginVertical : '50%'}} >Ainda não há produtos por aqui</Text>
                            </View>
                        ) : (
                            <View style={{position : 'relative', flex : 1}} >
                                {sacola.map((item, index) => (
                                    <CartProduct dados={item}  handlePress={() => handleRemove(item)} key={index} />
                                ))}
                                <Text style={styles.title} >Resumo de pedido</Text>
                                <View style={{gap : 10}} >
                                    <Text>Valor atual : {valorAtual.toFixed(2).replace('.', ',')}</Text>
                                    <Text>Taxa de entrega : 6,00</Text>
                                    <Text>Taxa de serviço : 0,99</Text>
                                    <Text>Local da entrega : {endereco}</Text>
                                    <Text style={{
                                        fontSize : 18,
                                        color : 'gray',
                                        fontWeight : 'bold'
                                    }} >Valor Total : {(valorAtual + 6.00 + 0.99).toFixed(2).replace('.', ',')}</Text>
                                </View>
                                <View style={styles.pagamento} >
                                    <Text style={{fontSize : 16}}>Pagamento na entrega - <Icon name='money-bill' size={20} color='green'/> Dinheiro </Text>
                                </View>
                                <Pressable style={styles.finalizar} onPress={finalizarPedido} >
                                    <Text style={{
                                        color : 'white',
                                        fontSize : 14,
                                        fontWeight : 'bold'
                                    }} >Finalizar Pedido</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    page : {
        flex : 1,
        backgroundColor : 'white',
        padding : 15
    },
    title : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10
    },
    emptyPage : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    pagamento : {
        height : 40,
        width : '100%',
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : 'gray',
        marginVertical : 15,
        alignItems : 'center',
        justifyContent : 'center'
    },
    finalizar : {
        width : '70%',
        height : 40,
        backgroundColor : 'red',
        borderRadius : 7,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
    }
})