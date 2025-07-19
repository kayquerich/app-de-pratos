import * as Location from 'expo-location';
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Endereco() {
    
    const [endereco, setEndereco] = useState(null);

    useEffect(() => {
        (async () => {

            try {

                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') return;

                const location = await Location.getCurrentPositionAsync({});

                if (Platform.OS === 'web') {

                    const { latitude, longitude } = location.coords;

                    const headers = Platform.OS === 'web' ? {} : {
                        'User-Agent': 'MeuApp/1.0 (meu@email.com)',
                    };

                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            format: 'json',
                        },
                        headers,
                    });

                    const address = response.data.address;

                    // 4. Extrai e formata o endereço
                    const enderecoFormatado = {
                        rua: address.road,
                        bairro: address.suburb || address.neighbourhood,
                        cidade: address.city_district || address.town || address.village,
                        estado: address.state,
                        cep: address.postcode,
                    };

                    const stringAddress = `${enderecoFormatado.rua || ''}, ${enderecoFormatado.bairro || ''}, ${enderecoFormatado.cidade || ''} - ${enderecoFormatado.estado || ''}, ${enderecoFormatado.cep || ''}`; // obs geoCode apartir do sdk 49 só  funciona nativamente

                    await AsyncStorage.setItem('endereco', stringAddress);

                    setEndereco(stringAddress);
                } else {
                    const geoLocation = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });

                    await AsyncStorage.setItem('endereco', geoLocation[0].formattedAddress);

                    setEndereco(geoLocation[0].formattedAddress)
                }
            } catch (error) {
                console.error("Error fetching location:", error);
            }

        })()

    }, [])
    
    return (
        <View style={styles.container}>
            {endereco ? (
                <Text style={styles.text}>
                    {endereco}
                </Text>
            ) : (<Text>Carregando...</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    text : {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    }
}) 