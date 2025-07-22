import { useState } from "react";
import { Pressable, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

export function CartProduct ({dados, handlePress}) {

    const [produto, setProduto] = useState(dados && dados.produto)

    return (
        <View style={styles.container} >
            <Image
                style={styles.image}
                source={produto.imagem}
            />
            <View style={styles.quantidade} >
                <Text style={{
                    fontSize : 14,
                    color : 'white',
                    fontWeight : 'bold'
                }} >{dados.quantidade}</Text>
            </View>
            <View style={styles.informacoes} > 
                <Text style={{fontWeight : 'bold'}} >{produto.nome}</Text>
                <Text>{produto.categoria}</Text>
                <Text>{dados.preco && dados.preco.toFixed(2).replace('.', ',')}</Text>
            </View>
            {handlePress && (
                <TouchableOpacity style={styles.removerButton} onPress={() => handlePress()} >
                    <Text style={{color : 'red'}} >remover</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 90,
        boxShadow : '0px 2px 5px -3px black',
        marginVertical : 10,
        borderRadius : 5,
        flexDirection : 'row',
        position : 'relative',
    },
    image : {
        width : 120,
        height : '100%',
        borderRadius : 5,
    },
    quantidade : {
        height : 25,
        width : 25,
        borderRadius : '50%',
        backgroundColor : 'red',
        position : 'absolute',
        bottom : 10,
        left : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },
    informacoes : {
        padding : 10
    },
    removerButton : {
        position : 'absolute',
        bottom : 10,
        right : 10
    }
})