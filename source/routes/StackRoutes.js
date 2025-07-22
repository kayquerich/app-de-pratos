import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./TabRoutes";
import Details from "../screens/Details";
import Pedido from "../screens/Pedido";
const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="TabRoutes" component={TabRoutes} />
                <Stack.Screen name='details' component={Details} />
                <Stack.Screen name='pedido' component={Pedido} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
