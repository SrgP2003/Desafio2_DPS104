import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";
import colors from '../utils/colors';

const Form = ({ reservas, setReservas, guardarMostrarForm, guardarReservasStorage }) => {
    // Variables para el formulario
    const [nombre, guardarNombre] = useState('');
    const [plato, guardarPlato] = useState('');
    const [bebida, guardarBebida] = useState('');
    const [postre, guardarPostre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [seccionComer, guardarSeccionComer] = useState('');
    const [numPersonas, guardarNumPersonas] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };
    // Muestra u oculta el Time Picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
        guardarHora(hora.toLocaleString('es-ES', opciones));
        hideTimePicker();
    };
    // Crear nueva reserva
    const createNewReservation = () => {
        // Validar
        if (
            nombre.trim() === '' ||
            plato.trim() === '' ||
            bebida.trim() === '' ||
            postre.trim() === '' ||
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            seccionComer.trim() === '' ||
            numPersonas.trim() === ''
        ) {
            mostrarAlerta();
            return;
        }
        // Validación básica de teléfono (mínimo 8 dígitos)
        if (!/^\d{8,}$/.test(telefono.trim())) {
            Alert.alert('Error', 'El teléfono debe tener al menos 8 dígitos numéricos', [{ text: 'OK' }]);
            return;
        }
        // Validación de cantidad de personas (debe ser número mayor a 0)
        if (isNaN(numPersonas) || parseInt(numPersonas) < 1) {
            Alert.alert('Error', 'La cantidad de personas debe ser un número mayor a 0', [{ text: 'OK' }]);
            return;
        }
        // Crear una nueva reserva
        const reserva = {
            nombre,
            plato,
            bebida,
            postre,
            telefono,
            fecha,
            hora,
            seccionComer,
            numPersonas,
            id: shortid()
        };
        const reservasNuevo = [...reservas, reserva];
        setReservas(reservasNuevo);
        guardarReservasStorage(JSON.stringify(reservasNuevo));
        guardarMostrarForm(false);
        // Resetear el formulario
        guardarNombre('');
        guardarPlato('');
        guardarBebida('');
        guardarPostre('');
        guardarTelefono('');
        guardarFecha('');
        guardarHora('');
        guardarSeccionComer('');
        guardarNumPersonas('');
    }
    // Muestra la alerta si falla la validación
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{ text: 'OK' }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre del cliente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarNombre(texto)}
                        value={nombre}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Plato principal:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPlato(texto)}
                        value={plato}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Bebida:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarBebida(texto)}
                        value={bebida}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Tipo de postre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPostre(texto)}
                        value={postre}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono de Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType='numeric'
                        value={telefono}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Cantidad de personas:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarNumPersonas(texto)}
                        keyboardType='numeric'
                        value={numPersonas}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Sección para comer:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={texto => guardarSeccionComer(texto)}
                        value={seccionComer}
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={createNewReservation} style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva Reserva</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Form;