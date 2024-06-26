const updateButtt = document.querySelector(".update_buttt");
const new_file = document.querySelector(".new_file");
const statuss = document.querySelector(".update_progress");
var progress;

updateButtt.addEventListener("click", async () => {
  if (!new_file.files[0]) {
    return swal({
      text: "No file selected"
    });
  } else {
    const file_size = new_file.files[0].size / 1024 / 1024;
    if (file_size > 50) {
      console.log(file_size);
      swal("The file you uploaded is too large to upload. Please upload your large files on your Google Drive, paste the link in a text file then upload the text file here.")
    } else {
      const strRef = localStorage.getItem("storage_ref");
      const storageRef = firebase.storage().ref(strRef);
      const fileName = new_file.files[0].name;
      const deleteRef = storageRef.child(fileName);

      console.log(storageRef);

      const storageReff = firebase.storage().ref(strRef);
      const uploadTask = storageReff.child(fileName).put(new_file.files[0]);

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = Math.round(progress);
          statuss.innerHTML = "Uploading " + progress + "%";
        },
        (error) => {
          console.log(error);
        },
        () => {
          statuss.innerHTML = "✅ Successfully uploaded";

          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            // uploads all data to firestore
            localStorage.setItem("new_file", downloadURL);
          });
        });
    }
  }
});