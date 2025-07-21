import { useState } from "react"
import { View, Pressable, StyleSheet, Text } from "react-native"

export function Categories ({handleChange}) {

    const categories = [
        'Todas',
        'Café',
        'Almoço',
        'Jantar'
    ]

    const [selected, setSelected] = useState(false)
    const [choose, setChoose] = useState(0)

    const HandlePress = (index, item) => {

        setSelected(true)
        setChoose(index)

        if (handleChange) handleChange(item && item.toLowerCase());
    }

    return (
        <View style={styles.container} >
            {categories.map((item, index) => (
                <Pressable
                    style={[styles.item, index === choose && {backgroundColor : '#b8272cff'}]} 
                    key={index}
                    onPress={() => HandlePress(index, item)}
                >
                    <Text style={[{fontWeight : 500}, index === choose && {color : 'white'}]} >{item}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : 30,
        width : '100%',
        flexDirection : 'row',
        gap : 15,
        marginVertical : 10
    },
    item : {
        height : 30,
        width : 70,
        backgroundColor : '#ffa6a9ff',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 7,
    },
})