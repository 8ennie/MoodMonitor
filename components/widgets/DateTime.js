import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'


class DateTimeW extends Component {

    constructor() {
        super();
    }
    render() {
        date = new Date();
        return (
            <View>
                <Text style={[{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }]}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
                    " (" + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ")"}</Text>

            </View>
        );
    }
}

export default DateTimeW;