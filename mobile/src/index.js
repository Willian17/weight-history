import React from 'react'
import {SafeAreaView, Text, StyleSheet} from 'react-native'

export default function App(){
    return (
        <>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Histórico de pesos</Text>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FB'
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25
    }
})