import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SearchBar } from "../components/SearchBar"
import { Categories } from "../components/Categories"
import { db } from "../../mock/db"
import { CardProduct } from "../components/CardProduct"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

export default function Home() {

    const [produtos, setProdutos] = useState(db.recipes)

    useEffect(() => {
        
        const setProducts = async () => {
            const savedProducts = await AsyncStorage.getItem('produtos')
            if (savedProducts) {
                setProdutos(JSON.parse(savedProducts))
            } else {
                await AsyncStorage.setItem('produtos', JSON.stringify(db.recipes))
            }
        }

        setProducts()

    }, [])

    const categoryChange = (category) => {
        const produtosFiltrados = db.recipes.filter(produto => category === 'todas' || produto.categoria.toLowerCase() === category)
        setProdutos(produtosFiltrados)
    }

    const handleSearch = (text) => {
        const produtosFiltrados = db.recipes.filter(produto => produto.nome.toLowerCase().includes(text.toLowerCase()))
        setProdutos(produtosFiltrados)
    }

    const navigator = useNavigation()
    const panGesture = Gesture.Pan().activeOffsetX([-10, 10]).failOffsetY([-10,10]).onEnd((event) => {
        if (event.translationX < -50) {
            navigator.navigate('Sacola')
        } 
    })

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex : 1}} >

                        <Text style={styles.title} >O que vai querer comer hoje?</Text>
                        <SearchBar handleChange={handleSearch} />
            
                        <Text>Categorias</Text>
                        <Categories handleChange={categoryChange} />
            
                        <Text>Pratos</Text>
                        {produtos.map((produto, index) => (
                            <CardProduct dados={produto} key={index}/>
                        ))}

                    </View>
                </ScrollView>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    page : {
        flex : 1,
        padding : 20,
        backgroundColor : '#fff'
    }, 
    title :{
        fontSize : 18,
        fontWeight : 'bold',
    }
})