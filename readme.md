# O que é GraphQL ?

- Uma linguagem de consulta, não é uma biblioteca, não é um framework nem nada do tipo.
- Não importa a linguagem: javascript, php, etc... GraphQL pode ser utilizado por qualquer linguagem, pois é apenas uma linguagem para consulta.

# Que problema o GraphQL resolve principalmente ?
- O que é `underfetching` ?
 - Quando a gente busca menos dados do que o necessário.

- O que é `overfetching` ?
 - Quando a gente busca mais dados do que o necessário.
 - Por exemplo: precisamos montar uma tela que só mostra o nome e o e-mail do usuário, mas pegamos tudo que tem no usuário, como: idade, altura, etc...

## Com rest não é possível escolher quais campos "pegar" exatamente, resultando muitas vezes em um overfetching.

# Principais conceitos

## Schemas and Types ( alguns )

```graphql
enum Cities { ## enum --> enumeration types: allows just set a particular set of values
  BRASIL
  PARAGUAI
  URUGUAI
}

type Character {
  id: ID! ## "ID" --> unique identifier | "!" --> obligatory
  name: String ## "String" --> utf-8 string
  age: Int ## "Int" --> an integer
  lenght: Float ## "Float" --> a float
  city: Cities
}
```

## Aliases and arguments

- Em APIs rest nós podemos enviar uma quantidade "limitada" de parâmetros. Pois muitos parâmetros tornam a legibilidade da busca complicada. No entanto, com GraphQl, podemos enviar argumentos a cada propriedade!!
- Além disso, para pegarmos o mesmo dado duas vezes, no entanto, "de formas diferentes". Podemos utilizar os `aliases`, estes são basicamente "apelidos" que damos a um campo.

```graphql
{
  firstFollowers: followers(first: 3) {
    # pega os primeiros 3 followers
    id
    name
  }
  lastFollowers: followers(last: 3) {
    # pega os últimos 3 followers
    id
    name
  }
}
```

## Fragments

- São utilizados para reutilizarmos trechos de nossas queries que se repetem, tornando as queries muito mais legiveis e curtas.

- Exemplo sem utilizar `fragments` em uma query

```graphql
{
  Person {
    nodes {
      id
      bio
      avatarUrl
    }
    children {
      nodes {
        id
        bio
        avatarUrl
      }
    }
    parents {
      nodes {
        id
        bio
        avatarUrl
      }
    }
  }
}
```

- Exemplo utilizando `fragments` em uma query

```graphql
{
  person {
    nodes {
      ...userInfo
    }
    children {
      nodes {
        ...userInfo
      }
    }
    parents {
      nodes {
        ...userInfo
      }
    }
  }

  fragment
  userInfo
  on
  Person {
    id
    bio
    avatarUrl
  }
}
```

## Operation name

- Dessa forma nos damos um nome para nossa operação ( seja ela uma query ou uma mutation )

```graphql
query queryPerson {
  person {
    id
    bio
    avatarUrl
  }
}
```

## Variables

- Podemos passar valores argumentos dinamicos para nossa query ou mutation:

```graphql
query HeroNameAndFriends($episode: Episode = JEDI) {
  ## dessa forma atribuimos um valor default
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

## Queries

- São usadas para buscar dados, podemos enviar inputs como se fossem o body de requisições rest.

```graphql
query getBooks {
  getBooks {
    id
    author
    title
    archived
  }
}
```

## Mutations

- São usadas para realizar mudanças em dados, seja criar, editar ou deletar.
- Enquanto queries rodam em paralelo, mutations são executadas uma após a outra em série.

```graphql
mutation CreatePerson($input: Input!) {
  createPerson(input: $input) {
    name
    age
  }
}
```

# Por que utilizar GraphQL ?

## Queries declarativas e Performance que as mesmas trazem

- Pegamos apenas os dados que necessitamos, melhorando a performance ao "montar" telas complexas.
- Problemas que o modelo REST não havia solucionado de forma apropriada.

## Schemas com tipagem forte

- Todos objetos e propriedades de objetos devem ter seus determinados tipos em GraphQL, o schema serve como um "contrato" entre o servidor e o front-end.
- Dessa forma facilita-se a manutenção e a integração com a API. Pois o schema tem um enorme papel no quesito "documentação".

## Flexibilidade e Agilidade

- Podemos adicionar campos novos e tipos na API sem quebrar a aplicação.
- Testes muito mais assertivos e facilitados, pois buscamos apenas os campos que queremos.
- Não é necessário versionamento, pois para cada entidade podemos criar uma query e utilizar em várias situações sem a necessidade de criar inúmeros endpoints como em REST.
- Horas de documentação do projeto salvos com a própria documentação do schema.

### Menos tempo de desenvolvedores gasto === muito dinheiro economizado

# GraphQL client ( algumas atribuições )

- Realizar queries ou mutations e receber JSON.
- Cachear as queries para ter melhor performance. GraphQL clients podem fazer isso por nós.
- Tratamento de erros e validação do schema.
- Gerenciamento de estado e de cache local.
- Alguns clientes providenciam opções de paginação para melhor performance.

## Um dos mais populares GraphQL clients é o `Apollo client`.

# GraphQL server ( algumas atribuições )

- Criar o schema graphql;
- Criar as resolvers functions: funções que retornam os valores para o GraphQL schema.
- Analisar a query do client, validar o schema e retornar respostas em JSON.
- Executar o resolver pra cada campo.

## Um dos mais populares GraphQL servers é o `Apollo server`.
