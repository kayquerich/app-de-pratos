import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function CardPedido ({dados}) {

    const naviagtion = useNavigation()

    const setIcon = () => {
        if (dados.recebido) {
            return <Icon name="check-circle" size={20} color='green' />
        }
        return <FontAwesome name="warning" size={20} color='yellow' />
    }

    const goToDetails = () => {
        naviagtion.navigate('pedido', { id : dados.id})
    }

    return (
        <Pressable style={styles.cardPedido} onPress={goToDetails} >
            <View style={styles.header} >
                <Text style={{fontSize : 18, fontWeight : 'bold', color : '#920000ff'}} >{dados.id}</Text>
                <View>
                    <Icon name="chevron-right" size={26} color='gray' />
                </View>
            </View>
            <View style={styles.produtos} >
                {dados.sacola && dados.sacola.slice(0,2).map((item, index) => (
                    <Text key={index} >{item.quantidade} {item.produto.nome}</Text>
                ))}
                {dados.sacola.length > 2 ? (
                    <Text>e mais...</Text>
                ) : (<></>)}
            </View>
            <Text style={styles.status} >{setIcon()}  {dados.recebido ? 'Pedido Recebido' : 'Em Andamento'}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardPedido : {
        width : '100%',
        height : 140,
        marginVertical : 10,
        position : 'relative',
        borderRadius : 5,
        boxShadow : '0px 2px 5px -3px black'
    },
    header : {
        height : 40,
        width : '100%',
        borderBottomWidth : 1,
        borderStyle : 'solid',
        borderColor : 'gray',
        paddingHorizontal : 10,
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center'
    },
    produtos : {
        padding : 10,
        gap : 5,
        width : '100%'
    },
    status : {
        position : 'absolute',
        bottom : 10,
        right : 10
    }
})