
# Ambilight Video Player

Este projeto é um **player de vídeo com efeito Ambilight**, onde o fundo da página muda dinamicamente de acordo com as cores predominantes do vídeo em reprodução. O usuário pode escolher qual vídeo assistir a partir de uma lista de opções, e o vídeo será exibido com um efeito de luz ambiente adaptado.

## Funcionalidades

- **Escolha de Vídeo**: Ao carregar a página, o usuário escolhe entre diferentes vídeos disponíveis.
- **Efeito Ambilight**: As cores do fundo da página se adaptam em tempo real com base nas cores do vídeo em reprodução.
- **Estilização Responsiva**: O player está estilizado com bordas arredondadas e ajusta dinamicamente o conteúdo do vídeo sem cortes.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para criação de interfaces de usuário.
- **CSS**: Utilizado para estilizar o player e o modal de seleção de vídeo.
- **HTML5 Video**: Tag para reprodução de vídeos.

## Como Executar o Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/ambilight-video-player.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ambilight-video-player
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o projeto:

   ```bash
   npm start
   ```

5. Abra o navegador e acesse:

   ```
   http://localhost:3000
   ```

## Como Funciona o Efeito Ambilight

- O player captura as cores dominantes do vídeo usando um `canvas` oculto que extrai as cores em tempo real.
- O fundo da página muda suavemente conforme o vídeo se reproduz, oferecendo uma experiência de luz ambiente envolvente.

## Estrutura do Projeto

- `src/App.js`: Componente principal que inclui o player e o modal de seleção de vídeo.
- `src/App.css`: Arquivo de estilos que define a aparência do player e do modal.
