import Button from "./Button";
import { render, screen, fireEvent } from "@testing-library/react"

describe("Button Component", () => {
    it("should render with red background if disabled", () => {
        render(<Button disabled onClick={() => {}}>Click me</Button>);

        const button = screen.getByRole("button", { name: "Click me" }); // Usamos para pegar elementos
        
        // Faça testes de estilo, somente quando ele interferir no funcionamento, na percepção do componente.
        expect(button).toHaveStyle({ backgroundColor: "red"}); // É o testing library que nos fornece isso, e não o Jest
    });

    it("should call onClick prop on click", () => {
        const onClick = jest.fn(); // retorna uma função, mas monitoravel pelo Jest

        render(<Button disabled onClick={onClick}>Click me</Button>);

        const button = screen.getByText(/click me/i); // Selecionar pelo texto

        fireEvent.click(button); // Executou o botão

        // expect(onClick).toHaveBeenCalled(); // Verificar se a função foi chamada

        expect(onClick).toHaveBeenCalledWith(10); // Verificar se a função foi chamada com parâmetro
    });
});