import React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";

import { useNavigation } from "@react-navigation/native";
import type { RootParamsScreen } from "../../types/Navigation";

export default function SignUp() {
  const navigation = useNavigation<RootParamsScreen>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
  });
  const schema = yup.object().shape({
    firstName: yup.string().required("Nome é obrigatório"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "A senha precisa ter no mínimo 6 caracteres"),
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    phoneNumber: yup.string().required("Número de telefone é obrigatório"),
  });

  const onSubmit = (data: any) => {
    schema.validate(data).then(() => {
      if (data) {
        AsyncStorage.setItem("newUser", JSON.stringify(data));
        navigation.navigate("Home");
      }
    });
  };
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('newUser')
  //     if(value !== null) {
  //       console.log("Aqui estamos trazendo os dados do localstorage", value)
  //     }
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
  // getData()

  return (
    <>
      <Header pageName="SignUp" />
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View className="bg-slate-500 flex-1 items-center justify-center w-full">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ padding: 20, marginTop: 40 }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="user"
                  size={20}
                  color="#ff0000"
                  placeholder="Digite seu nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className=""
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text className="mb-5">This is required.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="mail"
                  size={20}
                  color="#ff0000"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu nome"
                />
              )}
              name="email"
            />
            {errors.firstName && (
              <Text className="mb-5">This is required.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="key"
                  size={20}
                  color="#ff0000"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite sua senha"
                />
              )}
              name="password"
            />
            {errors.password && <Text className="mb-5">This is required.</Text>}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="phone"
                  size={20}
                  color="#ff0000"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu email"
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && (
              <Text className="mb-5">This is required.</Text>
            )}

            <View>
              <Button
                onPress={handleSubmit(onSubmit)}
                className="bg-zinc-800 p-5 rounded-full items-center justify-center mt-10"
                Size
              >
                <Text className="text-white font-bold">Fazer o Cadastro</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableNativeFeedback>
    </>
  );
}
