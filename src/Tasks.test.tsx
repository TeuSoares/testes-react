import { fireEvent, render, screen } from "@testing-library/react";
import Tasks from "./Tasks";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("Tasks Components", () => {
    const worker = setupServer(
        rest.get('https://jsonplaceholder.typicode.com/todos', 
        async (req, res, ctx) => {
          return res(
            // Simulando uma resposta
            ctx.json([
                {
                    userId: 1,
                    id: 1,
                    title: "delectus aut autem",
                    completed: false
                }
            ])
          )
        }),
    )

    // Um código que será executado antes dos testes começarem a rodar.
    beforeAll(() => {
        worker.listen();
    });

    // Vai executar antes de cada teste
    beforeEach(() => {
        // Vai resetar handlers que são executados após o nosso setup inicial.
        // Como por exemplo a requisição para a "API" que estamos fazendo no error.
        // Se não fizermos isso, o próximo teste após o teste de error, iria dar conflito.
        worker.resetHandlers();
    });

    // Aqui inicia os testes
    it("should fetch and show tasks on button click", async () => {
        render(<Tasks />);

        const button = screen.getByText(/get tasks from api/i);

        fireEvent.click(button);

        // Fazemos a requisição assíncrona e aguardamos para ver se existe esse texto ou não.
        await screen.findByText("delectus aut autem");
    });

    it("should show error message on fetch error", async () => {
        // Vai simular que a requisição falhe
        worker.use(
            rest.get('https://jsonplaceholder.typicode.com/todos', 
            async (req, res, ctx) => {
              return res(
                ctx.status(500), 
                ctx.json({
                    message: "error happened"
                })
              )
            }),
        );

        render(<Tasks />);

        const button = screen.getByText(/get tasks from api/i);

        fireEvent.click(button);

        await screen.findByText("Request failed with status code 500");
    });
});