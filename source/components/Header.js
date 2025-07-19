import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import useFonts from "../../assets/useFonts";
import Endereco from "./Endereco";

export default function Header() {

    const [fontsLoaded] = useFonts();

    return (
        <>
            <View style={styles.container}>
                <Icon name="food-turkey" size={40} color="#fff" />
                <Text style={styles.title}>SaboresApp</Text>
            </View>
            <Endereco/>
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 60,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#7a0000ff',
        paddingHorizontal : 20,
    },
    title : {
        fontFamily : 'DancingScript-Bold',
        fontSize : 25,
        color : '#fff',
        marginLeft : 15
    }
})