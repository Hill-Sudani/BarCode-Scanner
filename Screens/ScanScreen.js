import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScannerClass extends React.Component {
  constructor() {
    super();
    this.state = {
      hascamerapermission: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    if (this.state.buttonState === 'clicked') {
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal',
      });
    }
  };

  render() {
    const hasCameraPermissions = this.state.hascamerapermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    else if (buttonState === 'normal) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              buttonState: 'normal',
            });
          }}>
          <Text>Click Me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {this.getCameraPermissions} title = 'QR CODE SCANNER'><Text>Scan QR Code</Text></TouchableOpacity>
      </View>
     
    ); }
  }
}
