import { firebase } from "./config";
import { currentDate, currentDateTime, currentTime } from "../src/utils/date";

const firestore = firebase.firestore();

const getUserUID = () => {
  return firebase.auth().currentUser.uid;
};

export const getPlats = async () => {
  const platsCollection = await firestore.collection("plats").get();
  return platsCollection.docs.map((doc) => platFormat(doc));
};

export const platFormat = (doc) => ({
  id: doc.id,
  libelle: doc.data().libelle,
  categorie: doc.data().categorie,
  prix: doc.data().prix,
  images: doc.data().images,
});

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
    .doc(currentDate())
    .collection(commandes.personnel.uid)
    .add({ commandes })
    .then(() => console.log("commandes enregistrées"))
    .catch((error) => console.log(error));
};

export const getAllCommandes = async () => {
  const commandesCollection = await firestore.collection("commandes").get();

  return commandesCollection.docs.map((doc) => ({
    table: doc.data().table,
    date: doc.data().date,
    commandes: doc.data().commandes,
  }));
};

export const getPersonnelByUserId = async () => {
  const personnelDoc = await firestore
    .collection("personnels")
    .doc(firebase.auth().currentUser.uid)
    .get();

  return personnelDoc.data();
};

export const getCommandes = async () => {
  const personnelCmdRef = await firestore
    .collection("commandes")
    .doc(currentDate())
    .collection(getUserUID())
    .get();

  if (personnelCmdRef.empty) {
    console.log("Aucune commande trouvée");
    return [];
  }
  return personnelCmdRef.docs.map((item) => ({
    id: item.id,
    ...item.data().commandes,
  }));
};

export const getPlatByCategorieLibelle = (item) => {
  const platsCollection = firestore
    .collection("plats")
    .where("categorie", "==", item.categorie)
    .get();

  const promise = new Promise((resolve, reject) => {
    platsCollection.then((querySnapshot) => {
      const docs = querySnapshot.docs;
      const size = docs.length;

      var plats = []

      if (size > 1) {
        plats = docs.map(document => platFormat(document))
      }
      resolve(plats)
    });
  })

  return promise;
};



/**
 * 
 * [] Définir la fonction permettant de gerer les plat de manière aléatoire.
 * [] Passer cette fonction à un Promise
 * [] Retourner le Promise
 */