import { useEffect, useState } from "react"
import ColectionClient from "../backend/db/ColectionClient,"
import Client from "../core/Client"
import ClientRepository from "../core/ClientRepository"
import useVisibility from "./useVisibility"


export default function useClient() {
    const repo: ClientRepository = new ColectionClient()

    const { tableIsVisible, formIsVisible, showTable, showForm} = useVisibility()

    const [client, setClient] = useState<Client>(Client.empty())
    const [clients, setClients] = useState<Client[]>([])

    useEffect(getAll, [])

    function clientSelected(client: Client) {
        setClient(client)
        showForm()
    }

    function getAll() {
        repo.getAll().then(clients => {
        setClients(clients)
        showTable()
        })
    }

    async function clientExcluded(client: Client) {
        await repo.delete(client)
        getAll()
    }

    async function clientSaved(client: Client) {
        await repo.put(client)
        getAll()
    }

    function newClient() {
        setClient(Client.empty())
        showForm()
  }

  return {
    clientSaved,
    clientExcluded,
    newClient,
    clientSelected,
    getAll,
    tableIsVisible,
    showTable,
    client,
    clients,
    }
}