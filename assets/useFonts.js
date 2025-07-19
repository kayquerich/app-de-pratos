import * as Font from "expo-font";

export default function useFonts() {
    return Font.useFonts({
        'DancingScript-Bold': require('../assets/fonts/DancingScript-Bold.ttf'),
    })
}