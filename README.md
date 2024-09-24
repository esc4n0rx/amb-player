
# Ambilight Video Player

Esse projeto é um player de vídeo com efeito Ambilight, onde o fundo da página muda automaticamente com as cores dominantes do vídeo que tá rolando. O usuário pode escolher qual vídeo assistir de uma lista e o efeito de luz ambiente vai acompanhar o vídeo.

## Funcionalidades

- **Escolha de Vídeo**: Quando a página carrega, o usuário escolhe entre os vídeos disponíveis.
- **Efeito Ambilight**: As cores do fundo se ajustam em tempo real com as cores do vídeo que tá sendo exibido.
- **Estilo Responsivo**: O player tem bordas arredondadas e ajusta o vídeo sem cortar nada, se adaptando a diferentes telas.

## Tecnologias Utilizadas

- **React**
- **CSS**

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

- O player pega as cores principais do vídeo usando um *canvas* escondido que faz a extração em tempo real.
- O fundo da página vai mudando de forma suave enquanto o vídeo rola, criando um efeito de luz ambiente bem imersivo.

## Estrutura do Projeto

- `src/App.js`: Componente principal que inclui o player e o modal de seleção de vídeo.
- `src/App.css`: Arquivo de estilos que define a aparência do player e do modal.
