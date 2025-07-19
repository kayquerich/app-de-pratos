import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import TabRoutes from "./TabRoutes";
import Header from "../components/Header";
const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Container>

            <SafeAreaView style={{flex : 1}}>

                <Header />

                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="TabRoutes" component={TabRoutes} />
                    </Stack.Navigator>
                </NavigationContainer>

            </SafeAreaView>

        </Container>
    )
}

function Container ({children}) {
    if (Platform.OS === 'web') return <SafeAreaProvider style={{flex : 1}} >{children}</SafeAreaProvider>
    return <View style={{flex : 1}}>{children}</View>
}