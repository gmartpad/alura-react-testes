import React from 'react';
import { render } from '@testing-library/react';

import Transacao from './Transacao';

describe("Componente de transação do extrato", () => {
    it("O snapshot do componente deve permanecer sempre o mesmo", () => {
        const { container } = render(<Transacao
            data="09/08/2020"
            tipo="saque"
            valor="200"        
        />)

        expect(container.firstChild).toMatchSnapshot()
    })
})