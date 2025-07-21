import { View, TextInput, StyleSheet } from "react-native"
import { FontAwesome as Icon } from "@expo/vector-icons"

export function SearchBar ({handleChange}) {

    const changeText = (e) => {
        if (handleChange) {
            handleChange(e.target.value)
        }
    }

    return (
        <View style={styles.container} >
            <Icon name="search" size={25} color='gray' />
            <TextInput
                placeholder='buscar pratos...'
                style={[styles.input]}
                underlineColorAndroid="transparent"
                onChangeText={text => { if (handleChange) handleChange(text) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : 40,
        width : '100%',
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : 'gray',
        flexDirection : 'row',
        borderRadius : 7,
        alignItems : 'center',
        paddingHorizontal : 10,
        gap : 15,
        marginVertical : 10
    },
    input : {
        height : '100%',
        width : '100%',
        outlineWidth : 0
    }
})