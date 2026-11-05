import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import type { RotasDaPilha, RotasDasAbas } from "./src/navegacao/tipos";

import { TelaInicio } from "./src/telas/TelaInicio";
import { TelaProdutos } from "./src/telas/TelaProdutos";
import { TelaDetalheProduto } from "./src/telas/TelaDetalheProduto";
import { TelaCadastroProduto } from "./src/telas/TelaCadastroProduto";
import { TelaMovimentacoes } from "./src/telas/TelaMovimentacoes";
import { TelaSobre } from "./src/telas/TelaSobre";

import { ProvedorEstadoApp } from "./src/contexto/EstadoAppContext";

import { cores } from "./src/tema/tema";

const Pilha = createNativeStackNavigator<RotasDaPilha>();
const Abas = createBottomTabNavigator<RotasDasAbas>();

type NomeDoIcone = ComponentProps<typeof Ionicons>["name"];

// Um ícone para cada aba. A cor e o tamanho vêm da própria barra de abas, que
// destaca a aba ativa.
const ICONES_DAS_ABAS: Record<keyof RotasDasAbas, NomeDoIcone> = {
  AbaInicio: "home-outline",
  AbaProdutos: "pricetags-outline",
  AbaCadastro: "add-circle-outline",
  AbaMovimentacoes: "swap-vertical-outline",
  AbaSobre: "information-circle-outline",
};

function PilhaProdutos() {
  return (
    <Pilha.Navigator>
      <Pilha.Screen
        name="Produtos"
        component={TelaProdutos}
        options={{ title: "Produtos" }}
      />

      <Pilha.Screen
        name="DetalheProduto"
        component={TelaDetalheProduto}
        options={{ title: "Detalhes do Produto" }}
      />
    </Pilha.Navigator>
  );
}

function NavegacaoPrincipal() {
  return (
    <Abas.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: cores.primaria,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={ICONES_DAS_ABAS[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Abas.Screen name="AbaInicio" options={{ title: "Início" }}>
        {({ navigation }) => (
          <TelaInicio
            aoAbrirProdutos={() =>
              navigation.navigate("AbaProdutos", {
                screen: "Produtos",
              })
            }
            aoAbrirCadastro={() => navigation.navigate("AbaCadastro")}
            aoAbrirMovimentacoes={() => navigation.navigate("AbaMovimentacoes")}
          />
        )}
      </Abas.Screen>

      <Abas.Screen
        name="AbaProdutos"
        component={PilhaProdutos}
        options={{
          title: "Produtos",
          headerShown: false,
        }}
      />

      <Abas.Screen
        name="AbaCadastro"
        component={TelaCadastroProduto}
        options={{ title: "Cadastro" }}
      />

      <Abas.Screen
        name="AbaMovimentacoes"
        component={TelaMovimentacoes}
        options={{ title: "Movimentações" }}
      />

      <Abas.Screen
        name="AbaSobre"
        component={TelaSobre}
        options={{ title: "Sobre" }}
      />
    </Abas.Navigator>
  );
}

export default function App() {
  return (
    <ProvedorEstadoApp>
      <NavigationContainer>
        <NavegacaoPrincipal />
      </NavigationContainer>
    </ProvedorEstadoApp>
  );
}