import Layout from '../components/Layout'
import Table from '../components/Table'
import Form from '../components/Form'
import Button from '../components/Button'
import useClient from '../hooks/useClient'

export default function Home() {
  
  const { 
    clientSaved,
    clientExcluded,
    newClient,
    clientSelected,
    tableIsVisible,
    showTable,
    client,
    clients,
  } = useClient()
  
  return (
    <div className={
      `flex justify-center items-center h-screen 
      bg-gradient-to-r from-blue-500 to-purple-500 
      text-white`
      }>
      <Layout title="Cadastro Simples">
        {tableIsVisible ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4" 
                onClick={newClient}>
                Novo Cliente
              </Button>
            </div>
            <Table clients={ clients } clientSelected={ clientSelected } clientExcluded={ clientExcluded }></Table>
          </>
        ): (
          <Form 
            client={client}
            clientHasChanged={clientSaved}
            canceled={showTable}
          />
        )}
      </Layout>
    </div>
  )
}
