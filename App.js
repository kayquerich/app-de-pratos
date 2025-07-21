import StackRoutes from "./source/routes/StackRoutes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "./source/components/Header";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function App() {
    return (
        <GestureHandlerRootView style={{flex : 1}}>
            <Container>
                <SafeAreaView style={{flex : 1}}>

                    <Header />
                    <StackRoutes />

                </SafeAreaView>
            </Container>
        </GestureHandlerRootView>
    );
}

function Container ({children}) {
    if (Platform.OS === 'web') return <SafeAreaProvider style={{flex : 1}} >{children}</SafeAreaProvider>
    return <View style={{flex : 1}}>{children}</View>
}