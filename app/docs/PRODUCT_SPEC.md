
---

## docs/PRODUCT_SPEC.md

```md
# ORAKLO — Product Specification

## 1. Visão do produto

ORAKLO é uma plataforma digital onde usuários registram previsões sobre eventos reais, objetivos e verificáveis.

Cada previsão representa uma posição tomada com base em informação pública, leitura de cenário e regras claras de validação.

O produto deve comunicar racionalidade, clareza e confiança em todas as etapas da experiência.

---

## 2. Objetivo do MVP

Construir uma versão funcional da plataforma com os seguintes fluxos centrais:

- listagem de eventos
- visualização detalhada de evento
- registro de posição
- cálculo de retorno estimado
- fechamento de evento
- validação de resultado
- histórico do usuário
- ranking simples

---

## 3. Entidades principais

### 3.1 Event

Representa um evento previsível e verificável.

Campos mínimos:

- id
- title
- slug
- category
- description
- status
- prediction_deadline
- observation_start
- observation_end
- resolution_date
- validation_source
- validation_rule
- outcome
- created_at
- updated_at

### 3.2 Participation

Representa o registro de uma posição do usuário em um evento.

Campos mínimos:

- id
- user_id
- event_id
- side (YES | NO)
- amount
- fee_amount
- odds_at_entry
- estimated_return_at_entry
- created_at

### 3.3 User

Campos mínimos:

- id
- name
- email
- created_at

### 3.4 Event Result

Campos mínimos:

- event_id
- resolved_outcome
- resolved_at
- resolution_notes

---

## 4. Estados do evento

Os eventos devem seguir estes estados:

- draft
- open
- closed
- resolved
- canceled

### Definições

#### draft
Evento em preparação. Não visível para participação pública.

#### open
Evento aberto para novas participações até o prazo definido.

#### closed
Evento encerrado para novas participações. Aguarda observação e validação.

#### resolved
Evento já validado com resultado oficial definido.

#### canceled
Evento cancelado por falha estrutural, erro de criação ou impossibilidade de validação.

---

## 5. Fluxo principal do usuário

### 5.1 Explorar eventos
O usuário acessa a home e vê eventos disponíveis.

Cada card de evento deve mostrar, no mínimo:

- título
- categoria
- prazo
- status
- cotação atual de SIM e NÃO
- sinalização de disponibilidade

### 5.2 Entrar em um evento
Ao abrir um evento, o usuário deve visualizar:

- pergunta principal
- descrição
- prazo de previsão
- período de observação
- critério de validação
- fonte oficial
- cotação atual
- interface para escolha de lado

### 5.3 Escolher posição
O usuário escolhe:

- SIM ou NÃO
- valor da participação

A interface deve atualizar:

- cotação correspondente
- taxa aplicada
- retorno estimado

### 5.4 Confirmar posição
Antes da confirmação final, o usuário deve visualizar:

- evento
- lado escolhido
- valor informado
- taxa
- retorno estimado
- observações legais

### 5.5 Aguardar validação
Após o fechamento do evento, o usuário acompanha o status até a resolução oficial.

### 5.6 Ver resultado
Com o evento resolvido, o sistema exibe:

- resultado oficial
- confirmação ou não da previsão do usuário
- retorno efetivo
- atualização no histórico

---

## 6. Tela de decisão

A tela de decisão é a parte mais sensível do produto e deve obedecer rigorosamente aos princípios abaixo.

### 6.1 Objetivo
Permitir uma decisão consciente, informada e neutra.

### 6.2 Ordem obrigatória da informação

1. Evento
2. Dados do evento
3. Escolha de lado
4. Valor da participação
5. Retorno estimado
6. Confirmação
7. Termos e observações

### 6.3 Regras de UX

- nenhuma opção pode parecer mais vantajosa antes da seleção
- SIM e NÃO devem ter peso visual equivalente
- o sistema não pode induzir urgência emocional
- a interface deve priorizar legibilidade e compreensão

### 6.4 Microcopy obrigatório

Usar preferencialmente:

- "Valor da participação"
- "Retorno estimado"
- "Confirmar posição"
- "Registrar previsão"

Evitar qualquer linguagem associada a aposta, sorte ou ganho impulsivo.

---

## 7. Perfil do usuário

O perfil deve mostrar:

- histórico de participações
- quantidade de previsões registradas
- taxa de acerto
- retorno acumulado
- eventos resolvidos
- eventos em andamento

---

## 8. Ranking

No MVP, o ranking pode ser simples.

Campos sugeridos:

- nome do usuário
- total de previsões resolvidas
- taxa de acerto
- retorno acumulado

O ranking não deve ser tratado como gamificação exagerada.
Deve ser apresentado como métrica de performance.

---

## 9. Categorias iniciais do MVP

Sugestões de categorias:

- clima
- economia
- esportes
- cultura

---

## 10. Requisitos de produto

- toda previsão deve estar ligada a um evento verificável
- todo evento deve possuir regra clara e fonte oficial
- toda confirmação deve ocorrer em duas etapas
- toda informação crítica deve estar visível antes da ação final
- a UI não pode parecer bet, cassino ou game