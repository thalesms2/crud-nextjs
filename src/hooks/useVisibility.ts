import { useState } from "react"

export default function useVisibility() {
    const [visible, setVisible] = useState<'table' | 'form'>('table')

    const showTable = () => setVisible('table')
    const showForm = () => setVisible('form')

    return {
        formIsVisible: visible === 'form',
        tableIsVisible: visible === 'table',
        showTable,
        showForm,
    }
}