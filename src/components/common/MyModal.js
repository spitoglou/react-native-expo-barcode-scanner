import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'

class MyModal extends Component {

    state = {
        modalVisible: false,
    }

    setModalVisible (visible) {
        this.setState({modalVisible: visible})
    }

    render () {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.')
                    }}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                <Button onPress={() => this.setModalVisible(true)}>
                    Show Modal
                </Button>
                {/*<TouchableOpacity onPress={() => {*/}
                {/*this.setModalVisible(true)*/}
                {/*}}>*/}
                {/*<Text>Show Modal</Text>*/}
                {/*</TouchableOpacity>*/}

            </View>
        )
    }
}

export { MyModal }