import { Container, Table, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'

function AdminFuncionalidades() {
    const [funcionalidades, setFuncionalidades] = useState([])

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch('http://localhost:3001/funcionalidades');
            var body = await response.json();
            setFuncionalidades(body.funcionalidadeData);
            console.log(body);
        }
        fetchItems();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget
        const title = form.title.value
        const description = form.description.value

        const response = await fetch('http://localhost:3001/addfuncionalidades', {
            method: 'POST',
            body: JSON.stringify({
                name: title,
                comment: description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        if (!response.ok) {
            alert('Erro ao cadastrar funcionalidade')
            return
        }
        const funcionalidade = await response.json()
        alert('Funcionalidade cadastrada com sucesso')
        setFuncionalidades([...funcionalidades, funcionalidade.data])
        form.reset()
        console.log(funcionalidades);
    }


    async function excluirFuncionalidade(id) {
        console.log(id)

        fetch('http://localhost:3001/deletefuncionalidades/' + id, {
            method: 'DELETE',
            body: JSON.stringify({
                funcionalidadeId: id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        alert('Funcionalidade excluída com sucesso')
        const funcionalidadesAtualizadas = funcionalidades.filter((funcionalidade) => funcionalidade.id !== id)
        setFuncionalidades(funcionalidadesAtualizadas)
    }

    function habilitarEdicao(botao, id) {
        botao.innerText = 'Salvar'
        botao.classList.remove('btn-primary')
        botao.classList.add('btn-success')
        botao.onclick = (event) => { salvarEdicao(event.target, id) }

        const linha = botao.parentNode.parentNode
        const colunaTitulo = linha.children[1]

        const inputTitulo = document.createElement('input')
        inputTitulo.type = 'text'
        inputTitulo.value = colunaTitulo.innerText
        colunaTitulo.innerText = ''
        colunaTitulo.appendChild(inputTitulo)

        const colunaDescricao = linha.children[2]
        const inputDescricao = document.createElement('input')
        inputDescricao.type = 'text'
        inputDescricao.value = colunaDescricao.innerText
        colunaDescricao.innerText = ''
        colunaDescricao.appendChild(inputDescricao)
    }

    async function salvarEdicao(botao, id) {
        const linha = botao.parentNode.parentNode
        const colunaTitulo = linha.children[1]
        const inputTitulo = colunaTitulo.children[0]
        const colunaDescricao = linha.children[2]
        const inputDescricao = colunaDescricao.children[0]

        const response = fetch('http://localhost:3001/editfuncionalidades/:name', {
            method: 'PUT',
            body: JSON.stringify({
                funcionalidadeId: id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
        if (!response.ok) {
            alert('Erro ao editar funcionalidade')
            return
        }
        alert('Funcionalidade editada com sucesso')

        colunaTitulo.innerText = inputTitulo.value
        colunaDescricao.innerText = inputDescricao.value

        botao.innerText = 'Editar'
        botao.classList.remove('btn-success')
        botao.classList.add('btn-primary')
    }


    return (
        <Container className="conteudo-margin">
            <h1>Admin Funcionalidades</h1>
            <hr />
            <h2>Adicionar Funcionalidade</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" placeholder="Digite o título da funcionalidade" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" placeholder="Digite a descrição" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
            <hr />
            <p>Lista de Funcionalidades</p>
            <Table striped hover>
                <thead>
                    <tr className='text-light'>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionalidades.map((funcionalidade, index) => (
                        <tr key={index}>
                            <td className='text-light'>{funcionalidade.funcionalidadeId}</td>
                            <td className='text-light'>{funcionalidade.name}</td>
                            <td>
                                <Button variant="primary" onClick={(event) => {habilitarEdicao(event.target, funcionalidade.funcionalidadeId)}}>Editar</Button>

                                 <Button variant="danger" onClick={() => {excluirFuncionalidade(funcionalidade.funcionalidadeId)}}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default AdminFuncionalidades