import { firebase } from "../firebase/config";

test("firebase test ", () => {
  var storageRef = firebase.storage().ref();
  storageRef
    .child("plats")
    .listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log(folderRef);
      });
    });
});
