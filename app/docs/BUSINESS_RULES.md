# ORAKLO — Business Rules

## 1. Princípio do sistema

ORAKLO é um sistema de previsões baseado em eventos reais e verificáveis.

O produto não deve ser modelado, descrito ou apresentado como aposta, jogo de sorte ou cassino.

Toda a lógica de negócio deve reforçar:

- objetividade
- verificabilidade
- transparência
- racionalidade

---

## 2. Estrutura obrigatória de um evento

Um evento só pode ser publicado se possuir:

- título objetivo
- descrição clara
- data limite para participação
- período de observação
- data de resolução
- fonte oficial de validação
- critério objetivo de validação

Se qualquer um desses campos estiver ausente, o evento deve permanecer em draft.

---

## 3. Natureza das respostas

No MVP, todos os eventos são binários.

Opções possíveis:

- YES
- NO

Não devem existir outros formatos de resposta nesta fase.

---

## 4. Publicação e imutabilidade

Após o evento ser publicado:

- não alterar título de forma material
- não alterar critério de validação
- não alterar fonte oficial
- não alterar prazo de participação
- não alterar período de observação

A imutabilidade é obrigatória para garantir confiança.

---

## 5. Participação do usuário

### Regras

- o usuário escolhe apenas um lado por participação
- o usuário informa um valor monetário
- existe valor mínimo de entrada
- a taxa é aplicada no momento da confirmação
- a participação só existe após confirmação final

### MVP

- valor mínimo sugerido: R$1,00
- sem limite máximo nesta fase, salvo necessidade operacional futura

---

## 6. Taxa da plataforma

A plataforma cobra uma taxa fixa percentual sobre cada participação registrada.

Regras:

- aplicada no momento da entrada
- independente do resultado
- deve ser visível antes da confirmação
- deve ser armazenada no registro da participação

---

## 7. Cotação dinâmica

A cotação varia conforme a distribuição das posições registradas.

Princípios:

- mais concentração em um lado tende a reduzir o retorno daquele lado
- menor concentração tende a aumentar o retorno daquele lado
- o sistema deve sempre exibir cotação atualizada antes da confirmação

O MVP pode usar uma modelagem simplificada, desde que consistente e transparente.

---

## 8. Fechamento do evento

Ao atingir o prazo de participação:

- o evento muda para `closed`
- novas participações são bloqueadas
- cotações deixam de aceitar novas alterações derivadas de entradas

---

## 9. Validação do resultado

Todo resultado deve ser definido com base em:

- fonte pública
- critério objetivo previamente declarado

Não é permitido resolver evento com interpretação subjetiva, conveniência interna ou linguagem ambígua.

---

## 10. Resolução

Quando o resultado oficial estiver disponível:

- o evento muda para `resolved`
- o outcome é registrado
- o sistema calcula o retorno final de cada participação elegível
- o histórico do usuário é atualizado

---

## 11. Cancelamento

Um evento só pode ser cancelado em caso de:

- erro estrutural grave na criação
- impossibilidade material de validação
- indisponibilidade irrecuperável da fonte oficial
- inconsistência objetiva que comprometa a legitimidade do evento

Em caso de cancelamento:

- status passa para `canceled`
- participações devem ser tratadas conforme a política de reembolso do produto

---

## 12. Regras obrigatórias de transparência

Antes da confirmação, o usuário deve visualizar:

- pergunta do evento
- lado escolhido
- valor da participação
- taxa aplicada
- cotação
- retorno estimado
- fonte de validação
- critério de resolução

Nenhuma regra essencial pode ficar implícita.

---

## 13. Integridade operacional

O sistema deve registrar logs para ações críticas, incluindo:

- criação de evento
- publicação
- edição em draft
- fechamento
- resolução
- cancelamento
- confirmação de participação

---

## 14. Restrições temáticas

Não permitir eventos relacionados a:

- morte de pessoas específicas
- tragédias e desastres com exploração sensível
- terrorismo
- religião
- menores de idade
- manipulação de resultado
- temas eticamente críticos definidos pela operação

---

## 15. Regras de UX com impacto de negócio

A lógica de negócio depende de uma interface correta.

Portanto, é obrigatório que:

- a escolha entre lados seja neutra
- o sistema não estimule impulso
- a linguagem de aposta seja evitada
- o retorno seja tratado de forma informativa, não celebratória

Se a interface parecer bet, a implementação está errada mesmo que o cálculo esteja correto.