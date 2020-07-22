import React,  {useEffect, useState } from 'react'
import {SafeAreaView, Text, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native'

import api from './services/api'

export default function App(){
    const [weights , setWeights] = useState([])
    useEffect(()=> {
        api.get("weights").then(response => {
            setWeights(response.data)
        })
    } , [])

  async  function handleAddWeight(){
        const response = await api.post("weights" , {
            value: 68
        })
        const weight = response.data
        setWeights([... weights, weight])
    }

    return (
        <>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Histórico de pesos</Text>
            <FlatList 
            data={weights}
            keyExtractor={weight => weight.id}
            renderItem={ ({item: weight}) => (
                <View style={styles.weightContainer}>
                    <Text style={styles.kg}> {weight.value} Kg </Text>
                    <Text style={styles.date}> {weight.date.split(', ')[1].split(' ', 3).join(' ')} </Text>
                </View>
            )}
            />
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={handleAddWeight}
            > 
                <Text style={styles.buttonText}> Adicionar </Text> 
            </TouchableOpacity>
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
    },
    weightContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderBottomColor: '#E0E5EC',
        borderTopColor: '#E0E5EC',
        height: 65,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    kg: {
        fontSize: 15,
        fontWeight: "900"
    },
    date: {
         color: '#697077',
         paddingTop: 5,
         fontWeight: '100'
    },
   button: {
        backgroundColor: '#0b3c49',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
     buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    }
})