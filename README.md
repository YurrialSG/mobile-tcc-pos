A documentação do projeto se encontra em [Pata Marca API](https://gitlab.com/senac_pos-tcc_desenvolvimento-web-mobile-2019/projeto_tcc-7/pata-marca-api).

## Guia de utilização (uso online)

1.  Escanear QRCode ou acessar o link do sistema [Pata Marca Mobile](https://play.google.com/store/apps/details?id=com.yurrialsg.mobile_tcc_pos): <br />
    ![pata-marca](/uploads/80ab1c3946c994c34776e01cb6646514/pata-marca.png) <br />
    `https://play.google.com/store/apps/details?id=com.yurrialsg.mobile_tcc_pos`
2. Instalar o aplicativo no seu Smartphone.


## Instalando (uso local)

1. Clone este repositório na sua máquina local

2. Se não tiver o Expo instalado na sua máquina deve instalar como global com 
   ```npm install -g expo-cli```

3. Instale as dependências via npm (na raiz do projeto)
   `npm install`

4. Modificar o arquivo '*src/components/client.js*' de acordo com as suas necessidades:
   
   
*  Rodar o projeto com o emulador do android studio: Modificar *WebSocketLink* e *HttpLink* do arquivo para

>   new WebSocketLink({
>        uri: 'ws://10.0.2.2:4000/graphql',
>         options: { lazy: true },
>     }),
>       authLink.concat(new HttpLink({
>        uri: Platform.select({
>             ios: 'http://10.0.2.2:4000/graphql',
>             android: 'http://10.0.2.2:4000/graphql'
>         })
>      }))

*  Rodar o projeto com app Expo instalado no seu smartphone: Modificar *WebSocketLink* e *HttpLink* do arquivo para

>   new WebSocketLink({
>        uri: 'ws://192.168.0.13:4000/graphql',
>         options: { lazy: true },
>     }),
>       authLink.concat(new HttpLink({
>        uri: Platform.select({
>             ios: 'http://192.168.0.13:4000/graphql',
>             android: 'http://192.168.0.13:4000/graphql'
>         })
>      }))

5. Depois de configurar o arquivo de acordo com a sua necessidade e com a api local rodando, rode a aplicação (na raiz do projeto)
   `expo start`

6. Executar as seguintes ações de acordo com a sua necessidade:


*  Rodando com emulador android studio: Com o emulador aberto, pressione a tecla 'a' que o projeto será inicializado.
*  Rodando com o app Expo instalado no seu smartphone: Após QRCode Tunnel estiver pronto, deve selecionado e em seguido pelo app do Expo deve apontar a câmera do celular ao QRCode para que  sejá inicializado o projeto.