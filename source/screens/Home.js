import { View, Text, StyleSheet } from "react-native"
import { SearchBar } from "../components/SearchBar"
import { Categories } from "../components/Categories"

export default function Home() {
    return (
        <View style={styles.page}>
            <Text style={styles.title} >O que vai querer comer hoje?</Text>
            <SearchBar handleChange={(text) => console.log(text)} />
            <Text>Categorias</Text>
            <Categories handleChange={(category) => console.log(category)} />
            <Text>Pratos</Text>
        </View>
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