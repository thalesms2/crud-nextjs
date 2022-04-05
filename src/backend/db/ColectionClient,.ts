import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";
import firebase from "../config";

export default class ColectionClient implements ClientRepository {

    #converter = {
        toFirestore(client: Client) {
            return {
                name: client.name,
                age: client.age,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) {
            const data = snapshot.data(options)
            return new Client(data.name, data.age, snapshot?.id)
        }
    }

    async put(client: Client): Promise<Client> {
        if(client?.id) {
            await this.colection().doc(client.id).set(client)
            return client
        } else {
            const docRef = await this.colection().add(client)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async delete(client: Client): Promise<void> {
        return this.colection().doc(client.id).delete()
    }

    async getAll(): Promise<Client[]> {
        const query = await this.colection().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colection() {
        return firebase
            .firestore().collection('clients')
            .withConverter(this.#converter)
    }
}