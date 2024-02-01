
describe('Testes da Funcionalidade Usuários', () => {

     let nome = `Fulano ${Math.floor(Math.random() * 100000)}`
     let email = `fulano${Math.floor(Math.random() * 100000)}@gmail.com`

     it.only('Deve validar contrato de usuários', () => {
          //TODO: 
          cy.request('usuarios')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');

     });

     it('Deve listar usuários cadastrados', () => {
          //TODO: 
          cy.request({
               method: "GET",
               url: 'usuarios'
          }).then(response => {
               // TOOD: CRIAR VARIAVEL PRA NOME E EMAIL
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          //TODO: 
          cy.cadastrarUsuario(nome, email, '123456789', 'false').then(response => {
               expect(response.status).to.eq(201)
               expect(response.body.message).to.equal("Cadastro realizado com sucesso")
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          //TODO: 
          cy.cadastrarUsuario(nome, 'fulano', '123456789', 'false').then(response => {
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal("email deve ser um email válido")
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          //TODO:
          cy.request('usuarios').then(response => {
               let id = response.body.produtos[0]._id
               cy.request({
                    //TODO: PAREI AQUI
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                    body:
                    {
                         "nome": "Produto Editado 45642083",
                         "preco": 100,
                         "descricao": "Produto editado",
                         "quantidade": 100
                    }

               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          //TODO: 
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id;
   
               // Continuar com a implementação...
               cy.request({
                   method: 'DELETE',
                   url: `usuarios/${id}`,
                   headers: { authorization: 'seu-token-aqui' },
               }).then(response => {
                   // Verificar a resposta da API após a exclusão
                   expect(response.status).to.eq(200);
                   expect(response.body.message).to.equal("Registro excluído com sucesso");
               });
           })
     });


});
