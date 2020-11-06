import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function NewPostScreen() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View>
      <Text>Title: </Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="title"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.title && <Text>Title is required.</Text>}


      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4
  }
});
