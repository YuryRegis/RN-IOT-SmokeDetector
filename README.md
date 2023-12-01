<div style="text-align: center;">
  <img src="https://cdn3.vectorstock.com/i/1000x1000/71/77/no-smoking-sign-with-cigarette-vector-22767177.jpg" alt="Logo do Projeto" style="width: 200px; height: 200px; border-radius: 50px">
</div>

# Detector de Fumaça IoT

Este projeto foi desenvolvido por estudantes da Pontifícia Universidade Católica de Minas Gerais, unidade Poços de Caldas, com o objetivo de criar um protótipo de detector de fumaça de cigarros IoT. O dispositivo pode ser utilizado em residências, hotéis, empresas e outros ambientes para monitorar ambientes fechados que proibem fumar cigarros, charutos, cachimbos, narguilés e outros produtos derivados do tabaco em locais de uso coletivo, públicos ou privados (artigo 49 da Lei nº 12.546/2011). O protótipo foi desenvolvido utilizando a plataforma Arduino (ESP32), protocolo MQTT, e a linguagem de programação utilizada no dispositivo IoT foi C++.

**Professor Responsável:**
- Claudio Faria

**Alunos:**
- Lucas Mascarenhas dos Santos
- Pedro Rodrigues Neto
- Tassiano dos Santos Cardoso
- Yury Regis Neiva Pereira

# Download - Detector de Fumaça IoT

- [Android](https://github.com/YuryRegis/RN-IOT-SmokeDetector/blob/master/android/app/release/app-release.apk)
- iOS (ainda não disponível)

# Telas do Aplicativo

<table>
  <tr>
    <td><img src="link_da_imagem_configuracao" alt="Configuração" style="width: 200px; height: 400px;"></td>
    <td><img src="link_da_imagem_monitoramento" alt="Monitoramento" style="width: 200px; height: 400px;"></td>
    <td><img src="link_da_imagem_sobre" alt="Sobre Nós" style="width: 200px; height: 400px;"></td>
  </tr>
</table>

- **Configuração:** Esta tela é responsável por receber dados de conexão com um broker MQTT.
- **Monitoramento:** Aqui são exibidos os dados do sensor de fumaça em tempo real.
- **Sobre Nós:** Oferece informações sobre a equipe e o projeto.

# Instruções para Configuração do Broker MQTT (ThingSpeak)

Este projeto utiliza o serviço de broker MQTT do ThingSpeak para a comunicação do detector de fumaça. Caso necessite configurar os dados de conexão, siga os passos abaixo:

1. **Crie uma Conta no ThingSpeak:**
   - Acesse [este link](https://www.mathworks.com/mwaccount/register) para criar uma conta no ThingSpeak, caso ainda não tenha uma.

2. **Obtenha seus Dados de Configuração:**
   - Após criar a conta, acesse a documentação oficial do ThingSpeak para mais detalhes sobre como configurar o broker MQTT e obter os dados necessários: [Documentação ThingSpeak](https://www.mathworks.com/help/thingspeak/).
   
3. **Dados para Conexão:**
   - Para configurar o detector de fumaça, utilize os seguintes dados de conexão fornecidos pelo ThingSpeak:
     - **ID de Cliente**
     - **ID do Tópico** (`2334858`)
     - **Usuário**
     - **Senha**
     - **Host** `mqtt://mqtt3.thingspeak.com:1883`

4. **Configuração Padrão:**
   - Por padrão, este projeto já carrega os dados de conexão pré-configurados para o broker MQTT do ThingSpeak. No entanto, caso necessite personalizar ou atualizar essas configurações, utilize as informações fornecidas acima.
      

Para mais detalhes e instruções específicas sobre a configuração do broker MQTT do ThingSpeak, consulte a [documentação oficial do ThingSpeak](https://www.mathworks.com/help/thingspeak/).

# Instruções para Configurar e Executar um Projeto React Native (CLI)

## Pré-requisitos:

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

- Node.js: [Download e Instalação do Node.js](https://nodejs.org/)
- React Native CLI: Instale globalmente via npm ou yarn:
  ```bash
  npm install -g react-native-cli
   ```
   ```bash
   yarn global add react-native-cli
   ```
## Clone do repositório

   ```bash
   git clone https://github.com/YuryRegis/RN-IOT-SmokeDetector.git
   ```
## Configuração do Projeto:

- Acesse o Diretório do Projeto:

    ```bash
   cd RN-IOT-SmokeDetector
    ```
- Instale as Dependências (npm ou yarn):
   ```bash
   npm install
   ```
   ```bash
   yarn install
   ```
- Preparando simulador (iOS)
   ```bash
   cd ios && pod install && cd ..
   ```
## Executando o projeto
- Inicializando projeto no emulador Android
   ```bash
   react-native run-android
   ```
- Inicializando projeto no simulador iOS
   ```bash
   react-native run-ios
   ```
# Contribuições Externas:

Este projeto está aberto para contribuições externas! Se você tem ideias para melhorias, correções ou novos recursos, ficaríamos muito felizes em receber sua contribuição através de Pull Requests (PRs). Suas sugestões são valiosas para o desenvolvimento contínuo deste projeto.

Fique à vontade para explorar o código, sugerir melhorias, reportar problemas ou implementar novos recursos. Estamos ansiosos para colaborar com a comunidade e tornar este projeto ainda melhor!

Para contribuir, siga estes passos simples:
- Faça um fork deste repositório.
- Faça as alterações desejadas em sua cópia do projeto.
- Abra uma nova Pull Request com uma descrição detalhada das alterações propostas.

Agradecemos antecipadamente por suas contribuições e estamos ansiosos para ver suas ideias!

# Agradecimentos e Conclusão:

Gostaria de expressar meus sinceros agradecimentos a todos os envolvidos neste projeto:

- **Colegas de Equipe:** Agradeço a todos os colegas envolvidos por sua dedicação e colaboração no desenvolvimento deste projeto. Seu trabalho em equipe foi fundamental para o sucesso deste empreendimento.

- **Professor Claudio Faria:** Agradecemos ao Professor Claudio Faria pelo apoio, orientação e valiosos insights fornecidos ao longo deste projeto. Sua orientação foi fundamental para nosso aprendizado e crescimento.

- **Pontifícia Universidade Católica de Minas Gerais:** Expressamos nossa gratidão à instituição PUC-Minas por proporcionar o ambiente propício ao aprendizado, incentivando a inovação e o desenvolvimento de projetos como este.

Com isso, concluímos este projeto com grande satisfação e aprendizado, esperando que ele possa contribuir positivamente para a comunidade e para nossas trajetórias profissionais futuras.

Agradecemos a todos pelo apoio e oportunidade de realizar este trabalho.
