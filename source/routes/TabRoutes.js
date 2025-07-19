import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Pedidos from "../screens/Pedidos";
const Tab = createBottomTabNavigator();

const screenConfig = ({route}) => ({

    tabBarIcon : ({focused}) => {

        let iconName;

        if (route.name === 'Home') {
            iconName ='home';
        } else if (route.name === 'Sacola') {
            iconName = 'shopping';
        } else if (route.name === 'Pedidos') {
            iconName = 'receipt';
        }

        return <Icon name={iconName} size={20} color='#fff'/>

    },

    headerShown : false,
    tabBarActiveBackgroundColor : '#7a0000ff',
    tabBarInactiveBackgroundColor : '#7a0000ff'

})

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={screenConfig}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Sacola" component={Cart} />
            <Tab.Screen name="Pedidos" component={Pedidos} />
        </Tab.Navigator>
    )
}