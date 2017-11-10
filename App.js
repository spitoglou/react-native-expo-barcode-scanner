// @flow

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CardSection, Header } from './src/components/common'
import { BarCodeScanner, Permissions, ScreenOrientation, Speech } from 'expo'
import { Button } from './src/components/common/Button'

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        cameraActive: false,
        type: '',
        code: ''
    }

    _handleBarCodeRead = ({type, data}) => {
        Speech.speak(data.split('').join(' '))
        alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        this.setState({cameraActive: false, type: type, code: data})
    }

    async componentWillMount () {
        ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermission: status === 'granted'})
    }

    renderCamera () {
        const {hasCameraPermission} = this.state

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{flex: 1}}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        //style={StyleSheet.absoluteFill}
                        style={{height: '50%', alignSelf: 'stretch'}}
                    />
                    <CardSection>
                        <Button onPress={() => this.setState({cameraActive: false})}>
                            Go Back
                        </Button>
                    </CardSection>
                </View>
            )
        }
    }

    render () {
        if (this.state.cameraActive) {
            return this.renderCamera()
        } else {
            return (
                <View>
                    <Header headerText={'Scanner App'} />
                    <Text>Type: {this.state.type}</Text>
                    <Text>Code: {this.state.code}</Text>
                    <CardSection>
                        <Button onPress={this._activateScanner.bind(this)}>
                            Activate Camera/Scanner
                        </Button>
                    </CardSection>
                </View>
            )
        }
    }

    _activateScanner () {
        Speech.speak('The scanner is now active')
        this.setState({cameraActive: true})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
