import StackRoutes from "./source/routes/StackRoutes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
        <GestureHandlerRootView style={{flex : 1}}>
            <StackRoutes />
        </GestureHandlerRootView>
    );
}
