import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data
    const location = locations[0]
    if (location) {
      console.log("Location in background", location.coords)
    }
  }
})

 // Stop location tracking in foreground
 export const stopForegroundUpdate = () => {
  foregroundSubscription?.remove()
  setPosition(null)
}

// Start location tracking in foreground
export const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove()

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      location => {
        setPosition(location.coords)
      }
    )
}

// Start location tracking in background
export const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }

   // Stop location tracking in background
   export const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      console.log("Location tacking stopped")
    }
  }

// export default function ActualLocation() {
//   // Define position state: {latitude: number, longitude: number}
//   const [position, setPosition] = useState(null)

//   // Request permissions right after starting the app
//   useEffect(() => {
//     const requestPermissions = async () => {
//       const foreground = await Location.requestForegroundPermissionsAsync()
//       if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
//     }
//     requestPermissions()
//   }, [])

//   // Start location tracking in foreground
//   const startForegroundUpdate = async () => {
//     // Check if foreground permission is granted
//     const { granted } = await Location.getForegroundPermissionsAsync()
//     if (!granted) {
//       console.log("location tracking denied")
//       return
//     }

//     // Make sure that foreground location tracking is not running
//     foregroundSubscription?.remove()

//     // Start watching position in real-time
//     foregroundSubscription = await Location.watchPositionAsync(
//       {
//         // For better logs, we set the accuracy to the most sensitive option
//         accuracy: Location.Accuracy.BestForNavigation,
//       },
//       location => {
//         setPosition(location.coords)
//       }
//     )
//   }

//   // Stop location tracking in foreground
//   const stopForegroundUpdate = () => {
//     foregroundSubscription?.remove()
//     setPosition(null)
//   }

//   // Start location tracking in background
//   const startBackgroundUpdate = async () => {
//     // Don't track position if permission is not granted
//     const { granted } = await Location.getBackgroundPermissionsAsync()
//     if (!granted) {
//       console.log("location tracking denied")
//       return
//     }

//     // Make sure the task is defined otherwise do not start tracking
//     const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
//     if (!isTaskDefined) {
//       console.log("Task is not defined")
//       return
//     }

//     // Don't track if it is already running in background
//     const hasStarted = await Location.hasStartedLocationUpdatesAsync(
//       LOCATION_TASK_NAME
//     )
//     if (hasStarted) {
//       console.log("Already started")
//       return
//     }

//     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//       // For better logs, we set the accuracy to the most sensitive option
//       accuracy: Location.Accuracy.BestForNavigation,
//       // Make sure to enable this notification if you want to consistently track in the background
//       showsBackgroundLocationIndicator: true,
//       foregroundService: {
//         notificationTitle: "Location",
//         notificationBody: "Location tracking in background",
//         notificationColor: "#fff",
//       },
//     })
//   }

//   // Stop location tracking in background
//   const stopBackgroundUpdate = async () => {
//     const hasStarted = await Location.hasStartedLocationUpdatesAsync(
//       LOCATION_TASK_NAME
//     )
//     if (hasStarted) {
//       await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
//       console.log("Location tacking stopped")
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Longitude: {position?.longitude}</Text>
//       <Text>Latitude: {position?.latitude}</Text>
//       <View style={styles.separator} />
//       <Button
//         onPress={startForegroundUpdate}
//         title="Start in foreground"
//         color="green"
//       />
//       <View style={styles.separator} />
//       <Button
//         onPress={stopForegroundUpdate}
//         title="Stop in foreground"
//         color="red"
//       />
//       <View style={styles.separator} />
//       <Button
//         onPress={startBackgroundUpdate}
//         title="Start in background"
//         color="green"
//       />
//       <View style={styles.separator} />
//       <Button
//         onPress={stopBackgroundUpdate}
//         title="Stop in foreground"
//         color="red"
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   button: {
//     marginTop: 15,
//   },
//   separator: {
//     marginVertical: 8,
//   },
// })