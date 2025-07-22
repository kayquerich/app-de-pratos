import { useRoute, useNavigation } from "@react-navigation/native"
import { View, Image, StyleSheet, Text, TouchableOpacity, Pressable } from "react-native"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default function Details() {

    const route = useRoute()
    const navigation = useNavigation()
    const { id } = route.params || {};
    const [produto, setProduto] = useState({});
    const [precoAtual, setPrecoAtual] = useState(produto.preco || 0)
    const [sacola, setSacola] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {

            const savedProducts = await AsyncStorage.getItem('produtos')
            if (savedProducts) {

                const products = JSON.parse(savedProducts)
                const productDetails = products.find(product => product.id === id)
                setProduto(productDetails)
                setPrecoAtual(productDetails.preco || 0)

            } else {
                console.log("produtos não encontrados")
            }

            const savedBag = await AsyncStorage.getItem('sacola')
            if (savedBag) setSacola(JSON.parse(savedBag));

        }
        fetchProducts()
    }, [])

    const [quantidade, setQuantidade] = useState(1)

    const alterarQuantidade = (type) => {
        if (type === '+') {
            setQuantidade(quantidade + 1)
            setPrecoAtual(produto.preco * (quantidade + 1))
        } else if (type === '-') {
            if (quantidade > 1) {
                setPrecoAtual(produto.preco * (quantidade - 1))
                setQuantidade(quantidade - 1)
            } else {
                setQuantidade(1)
            }
        }
    }

    const addToBag = async () => {
        
        const index = sacola.findIndex(item => item.produto.id === produto.id)

        let novaSacola = []
        if (index !== -1) {

            novaSacola = sacola.map((item, key) => {
                if (key === index) {
                    const newQtd = item.quantidade + quantidade
                    return {
                        ...item,
                        quantidade : newQtd,
                        preco : produto.preco * newQtd
                    }
                }
                return item
            })

        } else {

            const productOnBag = {
                id : sacola.length,
                produto : produto,
                preco : precoAtual,
                quantidade : quantidade
            }

            novaSacola = [...sacola, productOnBag]

        }

        setSacola(novaSacola)
        await AsyncStorage.setItem('sacola', JSON.stringify(novaSacola))

        navigation.navigate('TabRoutes', {
            screen : 'Sacola'
        })

    }

    return (
        <View style={{backgroundColor : 'white', flex : 1, position : 'relative'}} >
            <Image 
                style={styles.image}
                source={produto.imagem}
            />
            <View style={{padding: 15}} >
                <Text style={styles.title} >{produto.nome}</Text>
                <Text>{produto.descricao}</Text>
                <Text style={{fontWeight : "bold", marginVertical : 10}} >Preço : {produto.preco && produto.preco.toFixed(2).replace('.', ',')} R$</Text>
            </View>           
            <View style={styles.footer} >

                <TouchableOpacity style={styles.buttonAlterQtd} onPress={() => alterarQuantidade('-')} >
                    <Text style={{color : 'red', fontSize : 30, marginTop : -22}} >_</Text>
                </TouchableOpacity>

                <Text style={{fontSize : 20, fontWeight : 'bold', marginHorizontal : 10}} >{quantidade}</Text>

                <TouchableOpacity style={styles.buttonAlterQtd} onPress={() => alterarQuantidade('+')} >
                    <Text style={{color : 'red', fontSize : 30, marginTop : -6}} >+</Text>
                </TouchableOpacity>

                <Pressable style={styles.addButton} onPress={addToBag} >
                    <Text style={{color : 'white'}} >Adicionar</Text>
                    <Text style={{color : 'white'}} >{precoAtual.toFixed(2).replace('.', ',')}R$</Text>
                </Pressable>

            </View>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()} >
                <Icon name="chevron-left" size={30} color="red" />
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    image : {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }, 
    footer : {
        position : 'absolute',
        bottom : 0,
        height : 60,
        width : '100%',
        paddingHorizontal : 15,
        flexDirection : 'row',
        alignItems : 'center',
    },
    buttonAlterQtd : {
        height : '100%',
        width : 50,
        justifyContent : 'center',
        alignItems : 'center',
    },
    addButton : {
        height : '70%',
        width : 200,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#a20000ff',
        borderRadius : 5,
        marginLeft : 10,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    }, 
    backButton : {
        position : 'absolute',
        top : 10,
        left : 10,
        zIndex : 1,
        backgroundColor : 'white',
        borderRadius : 50,
    }   
})