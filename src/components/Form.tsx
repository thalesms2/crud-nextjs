import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import Client from '../core/Client'

interface FormProps {
    client: Client
    clientHasChanged?: (client: Client) => void
    canceled?: () => void
}

export default function Form(props: FormProps) {
    const id = props.client?.id
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)
    return (
        <div>
            {id ? (
                <Input 
                    text="Código" 
                    value={id}
                    readOnly
                    className='mb-4'
                />
            ) : false }
            <Input 
                text="Nome" 
                value={name}
                onChange={setName}
                className='mb-4'
            />
            <Input 
                text="Idade" 
                type="number" 
                value={age}
                onChange={setAge}
            />
            <div className='flex justify-end mt-7'>
                <Button color="blue" className='mr-2'
                    onClick={() => props.clientHasChanged?.(new Client(name, +age, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Button>
                <Button onClick={props.canceled}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}