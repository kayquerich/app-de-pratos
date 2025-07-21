import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

export function CardProduct({dados}) {

    const navigation = useNavigation()

    const handlePress = () => {
        navigation.navigate('details', { id : dados.id })
    }

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <Image
                style={styles.image}
                source={dados.imagem}
            />
            <View style={{padding: 10, width : '60%', flexDirection : 'column', position : 'relative'}}>
                <Text style={{fontWeight : 'bold', flexWrap : 'nowrap'}} >{dados.nome}</Text>
                <Text style={{textAlign : 'justify', marginTop : 5}}>{dados.descricao.substring(0,60) + '...'}</Text>
                <Text style={styles.preco} >R$ {dados.preco.toFixed(2).replace('.', ',')}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 140,
        boxShadow : '0px 2px 5px -3px black',
        marginVertical : 10,
        borderRadius : 5,
        flexDirection : 'row',
    },
    image : {
        width : 120,
        height : '100%',
        borderRadius : 5,
    },
    preco : {
        fontWeight : 'bold',
        position : 'absolute',
        bottom : 10,
        left : 10,
    }
})