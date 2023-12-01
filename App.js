import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from './src/components/Header';
import { Timer } from './src/components/Timer';
import {Audio} from "expo-av"

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]

export default function App() {
  const [isWorking, setIsworking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if(isActive){
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000);
    }else{
      clearInterval(interval)
    }

    if(time === 0){
      setIsActive(false)
      setIsworking(!isWorking)
      // setIsworking((prev) => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return ()=> clearInterval(interval)
  }, [isActive, time])
  

  const hanldeStartStop = ()=>{
    playsound()
    setIsActive(!isActive)
  }

  const playsound = async()=>{
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]} ]}>
      <View style={{flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' && 30}}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime} 
          setTime={setTime}
        />
        <Timer time={time} />
          <TouchableOpacity style={styles.btn} onPress={hanldeStartStop}>
            <Text style={styles.btnText}>{isActive ? "STOP" : "START"}</Text>
          </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
  }
});
