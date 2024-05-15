import { Icon } from "@roninoss/icons";
import { BarCodeScannerResult } from "expo-barcode-scanner";
import { Camera, CameraView } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { submitQRCodeLink } from "@/infra/supabase/links/insertLinks";
import { CameraType } from "expo-camera/build/legacy/Camera.types";

export default function Page() {
  const [facing, setFacing] = useState("back" as CameraType);
  const [scanned, setScanned] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(false);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);

    setHasPermission(status === "granted");
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    submitQRCodeLink({ link: data });
    setScanned(true);
  };

  function toggleCameraType() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        facing={facing}
        style={styles.camera}
        onBarcodeScanned={!scanned ? handleBarCodeScanned : undefined}
      >
        <View style={styles.buttonContainer}>
          {scanned && (
            <Pressable style={styles.button} onPress={() => setScanned(false)}>
              <Icon name="camera" size={24} color="white" />
              <Text style={styles.text}>Scan</Text>
            </Pressable>
          )}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

// const Page: React.FC = () => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState<boolean>(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
//     setScanned(true);
//     // Save the scanned link into the list (you need to implement this logic)
//     console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Camera
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={{ width: '100%', height: '100%' }}
//       />
//     </View>
//   );
// };

// export default Page;
