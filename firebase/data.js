import { firebase } from "./config";

const firestore = firebase.firestore();

export const getPlats = async () => {
  const platsCollection = await firestore.collection("plats").get();
  return platsCollection.docs.map((doc) => ({
    id: doc.id,
    libelle: doc.data().libelle,
    categorie: doc.data().categorie,
    prix: doc.data().prix,
    images: doc.data().images,
  }));
};

export const getCategories = async () => {
  const categoriesCollection = await firestore.collection("categories").get();
  return categoriesCollection.docs.map((doc) => ({
    id: doc.id,
    libelle: doc.data().libelle,
  }));
};

export const storeCommande = async (commandes) => {
  await firestore
    .collection("commandes")
    .doc(commandes.table)
    .set(commandes)
    .then(() => console.log("commandes enregistrées"));
};

export const getAllCommandes = async (commandes) => {
  const commandesCollection = await firestore.collection("commandes").get();

  return commandesCollection.docs.map((doc) => ({
    table: doc.data().table,
    date: doc.data().date,
    commandes: doc.data().commandes,
  }));
};