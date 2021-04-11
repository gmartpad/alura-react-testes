import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App, {calcularNovoSaldo} from './App';
import { act } from 'react-dom/test-utils';

describe('Componente principal', () => {
    describe('Quando eu abro o app do banco...', () => {
        it('o nome é exibido', () => {
            render(<App/>);
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
        it('o saldo é exibido', () => {
            render(<App/>);
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
        it('o botão de realizar operação é exibido', () => {
            render(<App/>);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })
    describe('Quando eu realizo uma transação', () => {
        it('que é um saque, o valor vai diminuir', () => {

            const valores = {
                transacao: 'saque',
                valor: 50
            }

            const novoSaldo = calcularNovoSaldo(valores, 150);
            
            expect(novoSaldo).toBe(100);
        })
        it('que é um saque, a transação será realizada', () => {
            const { 
                getByText, 
                getByTestId, 
                getByLabelText 
            } = render(<App/>);

            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque');
            const valor = getByTestId('valor');
            const botao = getByText('Realizar operação');
            
            expect(saldo.textContent).toBe('R$ 1000');
            
            fireEvent.click(transacao, {target: {value: "saque"}});
            fireEvent.change(valor, {target: {value: "10"}});

            act(() => {
                fireEvent.click(botao);
            });
                    
            expect(saldo.textContent).toBe('R$ 990');
                
        })
        it('que é um depósito, o valor vai aumentar', () => {
            
            const valores = {
                transacao: 'deposito',
                valor: 60
            }

            const novoSaldo = calcularNovoSaldo(valores, 160);

            expect(novoSaldo).toBe(220);
        })
    })
})
