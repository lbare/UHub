import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const CustomModal: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full h-full justify-center items-center bg-black">
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex items-center justify-center mt-20">
          <View
            style={styles.modalView}
            className="m-20 bg-gray-500 border-full p-20 items-center shadow-xl"
          >
            <Text className="mb-15">Text</Text>
            <Button title="Hide Modal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomModal;
