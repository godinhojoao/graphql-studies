import { server } from '../../../src/app';

describe('Books queries', () => {
  it('Should return all unarchived books', async () => {
    const response = await server.executeOperation({
      query: `
        query getBooks {
          getBooks {
            id,
            author,
            title,
            archived
          }
        }`
    });

    expect(response.errors).toBeUndefined()
    expect(response.data).toEqual({
      getBooks: [
        {
          id: 1,
          author: 'João dale',
          title: 'Livro muito brabo',
          archived: false
        },
        {
          id: 3,
          author: 'Cleber da silva',
          title: 'Drácula',
          archived: false
        }
      ]
    })
  })

  it('Should return an archived book searching by id', async () => {
    const response = await server.executeOperation({
      query: `
        query getBook ($getBookId: Int!) {
          getBook (id: $getBookId) {
            id,
            author,
            title,
            archived
          }
        }`,
      variables: {
        getBookId: 2
      }
    });

    expect(response.errors).toBeUndefined()
    expect(response.data).toEqual({
      getBook: {
        id: 2,
        author: 'Joãozao',
        title: 'Livro arquivado',
        archived: true
      }
    })
  })
})

describe('Books mutations', () => {

  describe('Success calls', () => {
    it('Should create a book as expected', async () => {
      const response = await server.executeOperation({
        query: `
        mutation createBook ($createBookInput: CreateBookInput!) {
          createBook (input: $createBookInput) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          createBookInput: {
            title: 'Livro do joão, dale',
            author: 'Claúdinho',
            archived: false
          }
        }
      });

      expect(response.errors).toBeUndefined()
      expect(response.data).toEqual({
        createBook: {
          id: 4,
          title: 'Livro do joão, dale',
          author: 'Claúdinho',
          archived: false
        }
      })
    })

    it('Should delete a book as expected', async () => {
      const response = await server.executeOperation({
        query: `
        mutation deleteBook ($id: Int!) {
          deleteBook (id: $id) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          id: 4
        }
      });

      expect(response.errors).toBeUndefined()
      expect(response.data).toEqual({
        deleteBook: {
          id: 4,
          title: 'Livro do joão, dale',
          author: 'Claúdinho',
          archived: true
        }
      })
    })

    it('Should update a book as expected', async () => {
      const response = await server.executeOperation({
        query: `
        mutation updateBook ($id: Int!, $updateBookInput: UpdateBookInput!) {
          updateBook (id: $id, input: $updateBookInput) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          id: 1,
          updateBookInput: {
            author: 'Testador brabo',
            title: 'Livro legalzao',
          }
        }
      });

      expect(response.errors).toBeUndefined()
      expect(response.data).toEqual({
        updateBook: {
          id: 1,
          author: 'Testador brabo',
          title: 'Livro legalzao',
          archived: false
        }
      })
    })
  })

  describe('Error calls', () => {
    it('Should not update a book sending an inexistent id', async () => {
      const response = await server.executeOperation({
        query: `
        mutation updateBook ($id: Int!, $updateBookInput: UpdateBookInput!) {
          updateBook (id: $id, input: $updateBookInput) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          id: 199,
          updateBookInput: {
            author: 'Testador brabo',
            title: 'Livro legalzao',
          }
        }
      });

      expect(response.errors).toEqual([
        {
          extensions: { code: 'not found' },
          locations: [{
            column: 11,
            line: 3
          }],
          message: 'book not found',
          path: ['updateBook']
        }
      ])
    })

    it('Should not delete a book sending an inexistent id', async () => {
      const response = await server.executeOperation({
        query: `
        mutation deleteBook ($id: Int!) {
          deleteBook (id: $id) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          id: 999
        }
      });

      expect(response.errors).toEqual([
        {
          extensions: { code: 'not found' },
          locations: [{
            column: 11,
            line: 3
          }],
          message: 'book not found',
          path: ['deleteBook']
        }
      ])
    })

    it('Should not create a book sending a title with more than 80 characters', async () => {
      const response = await server.executeOperation({
        query: `
        mutation createBook ($createBookInput: CreateBookInput!) {
          createBook (input: $createBookInput) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          createBookInput: {
            title: 'Livro do joãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
            author: 'Claúdinho',
            archived: false
          }
        }
      });

      expect(response.errors).toEqual([
        {
          extensions: { code: 'BAD_USER_INPUT', },
          locations: [{
            column: 30,
            line: 2
          }],
          message: 'Variable "$createBookInput" got invalid value "Livro do joãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo" at "createBookInput.title"; Expected type "title_String_maxLength_80". Must be no more than 80 characters in length'
        }
      ])
    })

    it('Should not update a book sending a title with more than 80 characters', async () => {
      const response = await server.executeOperation({
        query: `
        mutation updateBook ($id: Int!, $updateBookInput: UpdateBookInput!) {
          updateBook (id: $id, input: $updateBookInput) {
            id,
            author,
            title,
            archived
          }
        }`,
        variables: {
          id: 1,
          updateBookInput: {
            author: 'Testador brabo',
            title: 'Livro do joãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
          }
        }
      });

      expect(response.errors).toEqual([
        {
          extensions: { code: 'BAD_USER_INPUT', },
          locations: [{
            column: 41,
            line: 2
          }],
          message: 'Variable "$updateBookInput" got invalid value "Livro do joãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo" at "updateBookInput.title"; Expected type "title_String_maxLength_80". Must be no more than 80 characters in length'
        }
      ])
    })
  })
})
