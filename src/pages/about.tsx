import React from 'react';
import PucLogo from '../assets/puc.png';
import {View, ScrollView, Text, StyleSheet, Image} from 'react-native';

function AboutUS() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Title}>IOT Smoke Detector</Text>
      </View>
      <View style={styles.ImageContainer}>
        <Image source={PucLogo} style={styles.Image} />
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.Text}>
          This project was developed by students of the Pontifical Catholic
          University of Minas Gerais, with the objective of developing a
          prototype of a smoke detector, which can be used in homes, companies
          and other places. The prototype was developed using the Arduino
          platform (ESP32), MQTT protocol and the programming language used was
          C ++.
        </Text>
        <View style={styles.Spacer} />
        <Text style={styles.Text}>
          Este projeto foi desenvolvido por estudantes da Pontifícia
          Universidade Católica de Minas Gerais, com o objetivo de desenvolver
          uma protótipo de detector de fumaça, que pode ser usado em
          residências, empresas e outros lugares. O protótipo foi desenvolvido
          utilizando a plataforma Arduino (ESP32), protocolo MQTT e a linguagem
          de programação utilizada foi C++.
        </Text>
        <View style={styles.Spacer} />
        <Text style={[styles.Bold, styles.Text]}>Professor orientador:</Text>
        <View style={styles.Spacer} />
        <Text style={styles.Text}>Claudio Faria</Text>
        <View style={styles.Spacer} />
        <Text style={[styles.Bold, styles.Text]}>Alunos:</Text>
        <View style={styles.Spacer} />
        <Text style={styles.Text}>Lucas Mascarenhas dos Santos</Text>
        <Text style={styles.Text}>Pedro Rodrigues Neto</Text>
        <Text style={styles.Text}>Tassiano dos Santos Cardoso</Text>
        <Text style={styles.Text}>Yury Regis Neiva Pereira</Text>
        <View style={styles.Spacer} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  header: {
    // width: '100%',
    borderBottomColor: '#B589D6',
    borderBottomWidth: 3,
    height: 90,

    alignItems: 'center',
    justifyContent: 'center',
  },
  Spacer: {
    height: 20,
    width: '100%',
  },
  Title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A369C',
  },
  ImageContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 190,
    height: 190,
    borderRadius: 45,
  },
  TextContainer: {
    paddingHorizontal: 16,
  },
  Text: {
    fontSize: 18,
    color: '#070707',
  },
  Bold: {
    fontWeight: 'bold',
  },
});

export default AboutUS;
