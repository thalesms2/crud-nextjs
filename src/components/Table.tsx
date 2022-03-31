import Client from '../core/Client'

interface TableProps {
    clients: Client[]
}

export default function Table(props: TableProps) {

    function renderHeader() {
        return (
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Idade</th>
            </tr>
        )
    }

    return (
        <table>
            { renderHeader() }
        </table>
    )
}