import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native'
import Mood from '../models/Mood';


const Realm = require('realm');

class MoodAdd extends Component {

    state = {
        date: new Date(),
        mainMood: 3,
        moods: [],
        expandedMood: false,
        note: "",
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandedMood: !this.state.expandedMood });
    }


    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    onPressMainMood(newMood) {
            this.setState({
                mainMood: newMood
            })
        
    }


    onPressMood(mood) {
            var newMoods = this.state.moods;
            if (newMoods.includes(mood)) {
                newMoods.splice(newMoods.indexOf(mood), 1);
            } else {
                newMoods.push(mood);
            }
            this.setState({
                moods: newMoods
            })
    }

    onSaveMood() {
        let realm = new Realm({ schema: [Mood] });
        realm.write(() => {
            realm.create('Mood', { id: realm.objects('Mood').length + 1, mainMood: this.state.mainMood, moods: this.state.moods, note: this.state.note, date: this.state.date });
        });
        realm.close();

        this.props.navigation.navigate('Home')

    }


    render() {
        const { date } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, {fontSize:30, fontWeight:'bold'}]}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
                " (" + date.getHours() + ":" + date.getMinutes() + ")"}</Text>
                <Text style={styles.heading}>How Are You Feeling?</Text>
                <View style={styles.imgMainMoodGroup}>
                    <TouchableOpacity onPress={() => this.onPressMainMood(1)}>
                        <Image
                            style={this.state.mainMood === 1 ? styles.imgMainMoodSelected : styles.imgMainMood}
                            source={require('../resources/images/sad_icon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressMainMood(2)}>
                        <Image
                            style={this.state.mainMood === 2 ? styles.imgMainMoodSelected : styles.imgMainMood}
                            source={require('../resources/images/normal_icon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressMainMood(3)}>
                        <Image
                            style={this.state.mainMood === 3 ? styles.imgMainMoodSelected : styles.imgMainMood}
                            source={require('../resources/images/happy_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.imgMoodGroup}>
                    <Text style={styles.heading}>In what Mood are you?</Text>
                    <Image style={styles.imgExpand}
                        source={this.state.expandedMood ? require('../resources/images/expand_less_18dp.png') : require('../resources/images/expand_more_18dp.png')}
                    />
                </TouchableOpacity>
                <View style={{ height: this.state.expandedMood ? null : 0, overflow: 'hidden' }}>
                    <View style={[styles.imgMoodGroup]}>
                        <TouchableOpacity onPress={() => this.onPressMood(1)}>
                            <Image
                                style={this.state.moods.includes(1) ? styles.imgMoodSelected : styles.imgMood}
                                source={require('../resources/images/angry_icon.png')}
                            />
                            <Text style={styles.moodDesc}>Angry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressMood(2)}>
                            <Image
                                style={this.state.moods.includes(2) ? styles.imgMoodSelected : styles.imgMood}
                                source={require('../resources/images/sad_crying_icon.jpg')}
                            />
                            <Text style={styles.moodDesc}>Sad</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressMood(3)}>
                            <Image
                                style={this.state.moods.includes(3) ? styles.imgMoodSelected : styles.imgMood}
                                source={require('../resources/images/happy_smiley_icon.jpg')}
                            />
                            <Text style={styles.moodDesc}>Happy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.imgMoodGroup]}>
                        <TouchableOpacity onPress={() => this.onPressMood(4)}>
                            <Image
                                style={this.state.moods.includes(4) ? styles.imgMoodSelected : styles.imgMood}
                                source={require('../resources/images/tired_icon.jpg')}
                            />
                            <Text style={styles.moodDesc}>Tired</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressMood(5)}>
                            <Image
                                style={this.state.moods.includes(5) ? styles.imgMoodSelected : styles.imgMood}
                                source={require('../resources/images/scared_icon.png')}
                            />
                            <Text style={styles.moodDesc}>Scared</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressMood(6)}>
                            <Image
                                style={this.state.moods.includes(6) ? styles.imgMoodSelected : styles.imgMood}
                                source={require('../resources/images/loved_icon.jpg')}
                            />
                            <Text style={styles.moodDesc}>Loved</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Button title="Save Your Mood" style={styles.saveButton} onPress={() => this.onSaveMood()}></Button>
                </View>

            </View >
        );
    }
    moodSelected(mood) {
        return this.state.moods.includes(mood);
    }
}




const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 20,
    },
    imgMainMoodGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgMainMood: {
        height: 100,
        width: 100,
        margin: 3,
        resizeMode: 'stretch',
        borderRadius: 90,

    },
    imgMainMoodSelected: {
        height: 120,
        width: 120,
        margin: 3,
        resizeMode: 'stretch',
        borderRadius: 90
    },
    imgMoodGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15,
    },
    imgMood: {
        height: 50,
        width: 50,
        margin: 3,
        resizeMode: 'stretch',
        borderRadius: 90,
        borderColor: 'red',
        borderWidth: 0,
        marginEnd: 10,
        marginStart: 10,
    },
    imgMoodSelected: {
        height: 50,
        width: 50 ,
        margin: 3,
        resizeMode: 'stretch',
        borderRadius: 90,
        borderColor: 'red',
        borderWidth: 2,
        marginEnd: 10,
        marginStart: 10,
    },
    moodDesc: {
        textAlign: 'center'
    },
    imgExpand: {
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    saveButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        paddingEnd: 20,
        paddingStart: 20,
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    }
})


export default MoodAdd;