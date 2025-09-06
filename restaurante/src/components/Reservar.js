import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Alert } from 'react-native';

const Reserva = ({ item, eliminarReserva }) => {
    const eliminateDialog = id => {
        Alert.alert(
            '¿Eliminar reserva?',
            '¿Estás seguro que deseas eliminar esta reserva?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => eliminarReserva(id) }
            ]
        );
    }
    return (
        <View style={styles.reservar}>
            <View>
                <Text style={styles.label}>Nombre del cliente: </Text>
                <Text style={styles.texto}>{item.nombre}</Text>
            </View>
            <View>
                <Text style={styles.label}>Plato principal: </Text>
                <Text style={styles.texto}>{item.plato}</Text>
            </View>
            <View>
                <Text style={styles.label}>Bebida: </Text>
                <Text style={styles.texto}>{item.bebida}</Text>
            </View>
            <View>
                <Text style={styles.label}>Tipo de postre: </Text>
                <Text style={styles.texto}>{item.postre}</Text>
            </View>
            <View>
                <Text style={styles.label}>Cantidad de personas: </Text>
                <Text style={styles.texto}>{item.numPersonas}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={() => eliminateDialog(item.id)} style={styles.btnDelete}>
                    <Text style={styles.deleteText}> Eliminar × </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reservar: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
    },
    btnDelete: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    deleteText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Reserva;