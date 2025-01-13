# Documentação do Gerenciador de Tarefas

## Visão Geral
Este projeto implementa um quadro de gerenciamento de tarefas responsivo que permite aos usuários criar, acompanhar e gerenciar tarefas. A aplicação apresenta uma interface limpa e moderna que funciona perfeitamente em dispositivos desktop e móveis.

## Funcionalidades
- Criação de tarefas com título e etiquetas
- Acompanhamento de conclusão de tarefas
- Armazenamento persistente usando localStorage
- Design responsivo para mobile e desktop
- Funcionalidade de remoção de tarefas
- Acompanhamento de progresso
- Inicialização com tarefas padrão

## Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript puro

## Componentes Principais

### 1. Seção de Entrada de Tarefas
- Campo para nome da tarefa
- Campo para etiqueta
- Botão de adicionar (+)

### 2. Exibição da Tarefa
Cada tarefa contém:
- Descrição
- Etiqueta (se fornecida)
- Data de criação
- Status de conclusão
- Botão "Concluir" (transforma-se em marca de seleção quando concluído)

### 3. Seção de Rodapé
- Botão para remover tarefas concluídas
- Contador de progresso mostrando tarefas concluídas/total

## Funcionalidades Principais

### Gerenciamento de Tarefas
- Criação de novas tarefas
- Gerenciamento de status de conclusão
- Remoção de tarefas concluídas *( foi adicionado para facilitar a remoção  de tarefas durante o desenvolvimento, e decidir deixar como funcionalidade adicional. )* 
- Atualização da interface com tarefas atuais

### Persistência de Dados
- Armazenamento e recuperação de tarefas usando localStorage
- Configuração de tarefas iniciais se nenhuma existir

## Design Responsivo

### Desktop
- Layout horizontal para grupos de entrada
- Informações da tarefa e botão de conclusão lado a lado
- Largura flexível até 600px

### Mobile (abaixo de 600px)
- Campos de entrada empilhados
- Informações da tarefa alinhadas verticalmente
- Botões em largura total

## Screenshots
### Desktop 
![alt text](<Projeto Desktop.png>)

### Mobile
![alt text](<Projeto Mobile.png>)

## Estrutura da Tarefa
```javascript
{
  id: string,
  descrição: string,
  etiqueta: string,
  concluída: boolean,
  dataCriação: string (data ISO)
}
```

## Tarefas Padrão
A aplicação inicializa com três tarefas de exemplo:
1. Tarefa Frontend: "Implementar tela de listagem de tarefas"
2. Tarefa Backend: "Criar endpoint para cadastro de tarefas"
3. Tarefa UX: "Implementar protótipo da listagem de tarefas"

## Suporte do Navegador
- Navegadores modernos com suporte a localStorage
- Design responsivo compatível com dispositivos móveis e desktop

## Possíveis Melhorias Futuras
1. Filtro por categorias
2. Datas de vencimento
3. Níveis de prioridade
4. Função de busca
5. Edição de tarefas
6. Suporte a múltiplos usuários

## Como Usar
1. Abra o arquivo index.html no navegador
2. Digite o nome da tarefa e uma etiqueta opcional
3. Clique no botão + para adicionar a tarefa
4. Use o botão "Concluir" para marcar tarefas como concluídas
5. Use o botão "Remover tarefas concluídas" para limpar tarefas finalizadas