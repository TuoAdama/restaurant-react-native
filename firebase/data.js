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
  return categoriesCollection.docs.map(doc => ({
    id:doc.id,
    libelle:doc.data().libelle
  }));
};
