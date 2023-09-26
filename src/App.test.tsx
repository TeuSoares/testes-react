import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const sum = (x: number, y: number) => {
    return x + y;
}

describe("App Component", () => {
    it("should sum correctly", () => {
        expect(sum(4, 4)).toBe(8);
    });

    it("should render App with hello message", () => {
        render(<App />);

        screen.getByText("Hello world!"); // Vai testar se existe esse texto em algum elemento no DOM.
    });

    // Teste de integração, pois estamos testando dois componentes em conjunto
    it("should change message on button click", () => {
        // Renderiza o componente
        render(<App />);

        // Verifica se existe essa mensagem inicial
        screen.getByText("Let's learn more about testing in React");

        const button = screen.getByText("Change message");

        // Executa a ação de click
        fireEvent.click(button); // Vai executar ações, eventos.

        // Verifica se a mensagem mudou
        screen.getByText(/new message/i); // Regex para escrevermos em minusculo

        // Verificar se um elemento não existe no DOM
        const oldMessage = screen.queryByText("Let's learn more about testing in React"); // Diferente de getByText, o queryByText não da erro se ele não encontra o elemento
        expect(oldMessage).toBeNull();

        expect(oldMessage).not.toBeInTheDocument(); // Outra forma de verficar
    });
});

export default {};