# ORAKLO — UI Rules

## 1. Objetivo

Estas regras definem como a interface deve ser implementada no projeto.

Toda UI deve reforçar:

- clareza
- racionalidade
- consistência
- confiança

Toda UI deve evitar:

- aparência de bet
- ruído visual
- estímulo emocional excessivo
- invenção de padrão sem necessidade

---

## 2. Regras gerais de implementação

- usar sempre componentes reutilizáveis quando existirem
- não recriar padrões já aprovados
- não hardcodar estilos sem necessidade
- não criar variações visuais arbitrárias
- seguir tokens de cor, espaçamento e tipografia do sistema

---

## 3. Estrutura de componentes

A interface deve ser construída com uma base consistente de componentes.

### Componentes base esperados

- Button
- Card
- Input
- Modal
- Badge
- ScreenLayout

### Componentes específicos esperados

- EventCard
- OddsSelector
- ReturnEstimate
- EventMetaBlock
- ConfirmationSummary

---

## 4. Cores

### Regras

- usar roxo como cor principal de ação
- usar neutros para estrutura
- usar verde e vermelho de forma funcional e discreta
- evitar cores agressivas como CTA dominante
- nunca usar laranja como ação principal da plataforma

### Interpretação

- verde não significa "ganho"
- vermelho não significa "perda"
- essas cores indicam apenas direção de cenário

---

## 5. Botões

### Obrigatório

- padrão visual consistente
- hierarquia clara entre primário e secundário
- aparência sólida
- baixo ruído visual

### Proibido

- brilho exagerado
- glow intenso
- aparência de cassino
- CTA com urgência artificial

---

## 6. Cards

Cards devem priorizar:

- legibilidade
- espaçamento
- leitura rápida
- hierarquia clara

Evitar:

- poluição visual
- excesso de efeitos
- excesso de bordas chamativas

---

## 7. Layout

### Regras

- usar grid consistente
- respeitar espaçamento previsível
- manter densidade controlada
- permitir escaneabilidade rápida

### Princípio

A interface deve ser lida com facilidade, não decifrada.

---

## 8. Tipografia em UI

- textos funcionais devem ser simples
- números devem ser altamente legíveis
- títulos devem ter presença, mas não podem sacrificar clareza
- evitar excesso de peso tipográfico em blocos longos

---

## 9. Motion

Motion só pode existir para melhorar compreensão.

### Permitido

- transições suaves
- feedback discreto
- loading limpo

### Proibido

- bounce exagerado
- efeitos que celebrem ação
- animação que simule adrenalina
- comportamento visual de game

---

## 10. Feedback

Feedbacks devem ser:

- informativos
- claros
- objetivos

Evitar:

- celebração exagerada
- mensagens eufóricas
- linguagem de vitória ou derrota

---

## 11. Regras de consistência

Antes de criar qualquer nova tela:

- verificar componentes existentes
- reutilizar layout base
- manter mesma lógica de espaçamento
- manter padrão de botão
- manter padrão de blocos informativos

A consistência visual é obrigatória.