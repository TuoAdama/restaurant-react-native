import '../data/data'

const appurl = "http://mon-restaurant.vzn.ovh/api";


const getAllPlats = async () => {
    let url = appurl + "/plats";
    var data = await fetch(url).then(response => {
        console.log(response.status)
        return response.json();
    })
    return data.map(item => platFormat(item));
}

const getAllCategories = async () => {
    let url = appurl + "/categories";
    var data = await fetch(url).then(response => response.json())
    data.unshift({ id: 0, libelle: 'Tout' });
    return data.map(item => ({ id: item.id, libelle: item.libelle }));
}


const platFormat = (item) => ({
    id: item.id,
    libelle: item.libelle,
    categorie: item.categorie.libelle,
    prix: item.prix,
    images: item.images.map(item => item.chemin),
});


const sendTokenToServer = async (token) => {

    fetch(appurl + "/notification/token/saveOrUpdate", {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify({
            id: global.personnel.id,
            token,
        })
    }).then(response => response.json())
        .then(response => console.log(response));
}

const getPersonnelCommands = async () => {

    console.log(global.personnel.id);
    var res = await fetch(appurl + "/commandes/" + (global.personnel.id ?? 1))
        .then(response => response.json())
    return res.map(item => formatCommande(item));
}

const storeCommande = (commandes) => {
    var data = {
        personnel_id: global.personnel.id,
        table: commandes.table,
        plats: commandes.items
    };

    fetch(appurl + "/commande/save", {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

const formatCommande = (commande) => ({
    id: commande.commande_id,
    table: commande.commande.table_client.numero_table,
    status: commande.commande.etat.libelle,
    total: commande.quantite * commande.plat.prix,
    createdAt: commande.created_at,
});

const login = async (email, password) => {
    console.log(email, password)
    var result = await fetch(appurl + "/login", {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(response => response.json());

    return result;
};


const getHeader = () => {
    var header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if(global.personnel != null){
        if(global.personnel.token){
            header['Authorization'] =  global.personnel.token;
        }
    }

    return header;
}

const registerPersonnel = (name, email, password) => {
    var result = fetch(appurl + "/user/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({name, email, password})
    }).then(response => response.json());

    return result;
};


export {registerPersonnel, getAllPlats, getAllCategories, sendTokenToServer, getPersonnelCommands, storeCommande, login };