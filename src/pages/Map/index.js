import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import getDirections from 'react-native-google-maps-directions'

import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

import styles from './styles';

const MapKey = 'YOUR API KEY';

export default function Maps () {

  const [origin, setOrigin] = useState([0, 0]);
  const [destination, setDestination] = useState([-29.4815851, -51.4189068]);
  const [destinationText, setDestinationText] = useState('');

  if (Platform.OS === 'ios') {
    getLocation();
  }
  else {
    const requestLocationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão de Acesso à Localização",
          message: "Este aplicativo precisa acessar sua localização.",
          buttonNeutral: "Pergunte-me depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
      else {
        alert('Permissão de Localização negada');
      }
    };
    requestLocationPermission();
  }

  const getLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setOrigin([currentLatitude, currentLongitude]);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  const handleButton = () => {
    if (destinationText != '') {
      Geocoder.init(MapKey);
      Geocoder.from(destinationText)
        .then(json => {
          const location = json.results[0].geometry.location;
          const Latitude = ({ latitude: location.lat })
          const Longitude = ({ longitude: location.lng })
          setDestination(Latitude, Longitude);
        })
        .catch(error => console.warn(error));
    }
    else {
      alert("Digite o destino ! ")
    }
  }

  const handleGetGoogleMapDirections = () => {
    const data = {
      source: origin,
      destination: destination,
      params: [
        {
          key: "travelmode",
          value: "driving"
        }
      ]
    };
    getDirections(data)
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        
        region={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(origin.latitude - destination.latitude) + Math.abs(origin.latitude - destination.latitude) * .1,
          longitudeDelta: Math.abs(origin.longitude - destination.longitude) + Math.abs(origin.longitude - destination.longitude) * .1,
        }}
        loadingEnabled={true}
        toolbarEnabled={true}
        zoomControlEnabled={true}
      >

        <MapView.Marker coordinate={destination} >
          <MapView.Callout onPress={handleGetGoogleMapDirections}>
            <Text>Press to Get Direction</Text>
          </MapView.Callout>
        </MapView.Marker>

        <MapView.Marker coordinate={origin} >
          <MapView.Callout>
            <Text>This is where you are</Text>
          </MapView.Callout>
        </MapView.Marker>

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={MapKey}
        />
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDestinationText(text)}
          placeholder='Destino'
          value={destinationText}
        />

        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Buscar rota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
