import { View, StyleSheet, Text } from "react-native"


export const Timer = ({time}) => {
    const formattedTime =  `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`
  return (
    <View style={styles.container}>
        <Text style={styles.time}>{formattedTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#F2F2F2",
        padding: 15,
        borderRadius: 15,
        flex: .3,
        justifyContent: "center"
    },
    time: {
        fontSize: 80,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333333"
    }
})