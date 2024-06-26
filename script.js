window.onload = () => {
  setTimeout(() => {
    const loading_screen = document.querySelector(".loading_screen");

    loading_screen.style.display = "none";
  }, 4000);

  const vapidKey = "BAx2i-UR2QEvszFCym3wunBtYeuYVcpxNCJgyJHAcwASuBBFZkiy0_GvlA9Op6z8HklO5HeWJyg-60D-W17haSA";
  const firebaseConfig = {
    apiKey: "AIzaSyDnrXP5cUHqh1VM03zM-_C_el3MRwl2H5M",
    authDomain: "sajsvaranasi-c7c1c.firebaseapp.com",
    projectId: "sajsvaranasi-c7c1c",
    storageBucket: "sajsvaranasi-c7c1c.appspot.com",
    messagingSenderId: "117530374983",
    appId: "1:117530374983:web:726046c24e317107391262",
    measurementId: "G-L9TP1G4MTS"
  };
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User signed in.")
      // var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("User is hecker.");
    }
  });

  // coding started

  const help_button = document.querySelector(".help");
  const submit_button = document.querySelector(".submit");
  const namee = document.querySelector(".name");
  const classs = document.querySelector(".class");
  const section = document.querySelector(".section");
  const email = document.querySelector(".email");
  const statuss = document.querySelector(".progress");
  const file = document.querySelector(".masterpiece");
  const phone = document.querySelector(".phone");
  var fileName;
  var token;
  var progress;
  var uploadedFileName;
  var fileSize;
  var defaultPass = "student123";

  // checks if local storage has values

  function checkLocalStorage() {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      swal({
        title: "Sign In Successful",
        text: "You have successfully signed in.",
        icon: "success",
      });

      window.location.replace("https://sajsvaranasi.repl.co/profile/");
    } else {
      console.log("NEW STUDENT");
    }
  }

  checkLocalStorage();

  // loads a help alert

  help_button.addEventListener("click", () => {
    swal(
      "Choose File Help",
      "You can only upload file upto 50mb\nUpload files to Google Drive, copy the shareable link, paste it in a text file, and upload the text file for streamlined submission.\nUpload your masterpiece here.\nFor gaming, submit your best gameplay.\nFor programming, upload your top code in ZIP format.\nIf you opt for photo/video editing or Blender, upload your finest work. \nRemember, plagiarism results in immediate rejection. Files must be in ZIP format. For robotics, upload your tinkercad screenshots."
    );
  });

  // checks if value is null

  function valueCheck() {
    if (
      namee.value == "" ||
      classs.value == "" ||
      section.value == "" ||
      email.value == "" ||
      phone.value == "" ||
      !file.value
    ) {
      return swal("Please fill all the fields.");
    } else {
      console.log("Filled all fields");
    }
  }

  const messaging = firebase.messaging();
  messaging.getToken({
    vapidKey: vapidKey
  })

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    }).catch((error) => {
      fetch(
        'https://discord.com/api/webhooks/1169855210567516281/BXAUuK_tMQ7QZoHuL46htJw7aIKgtqmUa5LR6T1ovt8OKT8ciGGbvPLuwuKyzfodtzUD',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // the username to be displayed
            username: 'Error Logger',
            // the avatar to be displayed
            avatar_url:
              'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1698985954~exp=1698986554~hmac=b4d3886d95c9c39d5448ee8873094f9d3e73f1206c33391b35a1ca6e99e55c6a',
            // contents of the message to be sent
            content:
              '<@1169853514592301076>, <@&1169854908653109289>',
            // enable mentioning of individual users or roles, but not @everyone/@here
            allowed_mentions: {
              parse: ['users', 'roles'],
            },
            // embeds to be sent
            embeds: [
              {
                // decimal number colour of the side of the embed
                color: 11730954,
                // author
                // - icon next to text at top (text is a link)
                author: {
                  name: 'Error',
                  url: 'https://sajsvaranasi.repl.co/',
                  icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                },
                // embed title
                // - link on 2nd row
                title: 'New Error Catched',
                url:
                  'https://sajsvaranasi.repl.co/',
                // thumbnail
                // - small image in top right corner.
                // embed description
                // - text on 3rd row
                description: `${error.message}`,
                // custom embed fields: bold title/name, normal content/value below title
                // - located below description, above image.
                // image
                // - picture below description(and fields)
                // footer
                // - icon next to text at bottom
              },
            ],
          }),
        }
      );
    })
  }

  requestPermission();

  function getTokenn() {
    messaging.getToken({ vapidKey: vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          token = currentToken;
          console.log(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);

        fetch(
          'https://discord.com/api/webhooks/1169855210567516281/BXAUuK_tMQ7QZoHuL46htJw7aIKgtqmUa5LR6T1ovt8OKT8ciGGbvPLuwuKyzfodtzUD',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // the username to be displayed
              username: 'Error Logger',
              // the avatar to be displayed
              avatar_url:
                'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1698985954~exp=1698986554~hmac=b4d3886d95c9c39d5448ee8873094f9d3e73f1206c33391b35a1ca6e99e55c6a',
              // contents of the message to be sent
              content:
                '<@1169853514592301076>, <@&1169854908653109289>',
              // enable mentioning of individual users or roles, but not @everyone/@here
              allowed_mentions: {
                parse: ['users', 'roles'],
              },
              // embeds to be sent
              embeds: [
                {
                  // decimal number colour of the side of the embed
                  color: 11730954,
                  // author
                  // - icon next to text at top (text is a link)
                  author: {
                    name: 'Error',
                    url: 'https://sajsvaranasi.repl.co/',
                    icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                  },
                  // embed title
                  // - link on 2nd row
                  title: 'New Error Catched',
                  url:
                    'https://sajsvaranasi.repl.co/',
                  // thumbnail
                  // - small image in top right corner.
                  // embed description
                  // - text on 3rd row
                  description: `${err.message}`,
                  // custom embed fields: bold title/name, normal content/value below title
                  // - located below description, above image.
                  // image
                  // - picture below description(and fields)
                  // footer
                  // - icon next to text at bottom
                },
              ],
            }),
          }
        );
        // ...
      });

    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  }

  // gets file and uploads it to the storage

  async function getFile() {
    const uploaded_file = file.files[0];

    fileName = uploaded_file.name;
    fileSize = uploaded_file.size / 1024 / 1024;

    if (fileSize > 50) {
      return swal("The file you uploaded is too large to upload. Please upload your large files on your Google Drive, paste the link in a text file then upload the text file here.");
    } else {
      const storageRef = firebase.storage().ref(
        `${document.querySelector(".sec_inp").value}/` +
        namee.value +
        classs.value
      );
      var sec_inp_value = document.querySelector(".sec_inp");
      localStorage.setItem("storage_ref", sec_inp_value.value + "/" + namee.value + classs.value);
      localStorage.setItem("file_name", fileName);
      const uploadTask = storageRef.child(`${namee.value +
        classs.value +
        fileName}`).put(uploaded_file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = Math.round(progress);
          statuss.innerHTML = "Uploading " + progress + "%";
          uploadedFileName = snapshot.ref.name;
        },
        (error) => {
          console.log(error);

          fetch(
            'https://discord.com/api/webhooks/1169855210567516281/BXAUuK_tMQ7QZoHuL46htJw7aIKgtqmUa5LR6T1ovt8OKT8ciGGbvPLuwuKyzfodtzUD',
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                // the username to be displayed
                username: 'Error Logger',
                // the avatar to be displayed
                avatar_url:
                  'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1698985954~exp=1698986554~hmac=b4d3886d95c9c39d5448ee8873094f9d3e73f1206c33391b35a1ca6e99e55c6a',
                // contents of the message to be sent
                content:
                  '<@1169853514592301076>, <@&1169854908653109289>',
                // enable mentioning of individual users or roles, but not @everyone/@here
                allowed_mentions: {
                  parse: ['users', 'roles'],
                },
                // embeds to be sent
                embeds: [
                  {
                    // decimal number colour of the side of the embed
                    color: 11730954,
                    // author
                    // - icon next to text at top (text is a link)
                    author: {
                      name: 'Error',
                      url: 'https://sajsvaranasi.repl.co/',
                      icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                    },
                    // embed title
                    // - link on 2nd row
                    title: 'New Error Catched',
                    url:
                      'https://sajsvaranasi.repl.co/',
                    // thumbnail
                    // - small image in top right corner.
                    // embed description
                    // - text on 3rd row
                    description: `${error.message}`,
                    // custom embed fields: bold title/name, normal content/value below title
                    // - located below description, above image.
                    // image
                    // - picture below description(and fields)
                    // footer
                    // - icon next to text at bottom
                  },
                ],
              }),
            }
          );
        },
        () => {
          statuss.innerHTML = "✅ Successfully uploaded";

          firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, defaultPass)
            .then((userCredentials) => {
              localStorage.setItem("email", email.value);
              localStorage.setItem("password", defaultPass);
              console.log(userCredentials);
            })
            .catch((error) => {
              const errorCode = error.message;
              console.log(errorCode);

              fetch(
                'https://discord.com/api/webhooks/1169855210567516281/BXAUuK_tMQ7QZoHuL46htJw7aIKgtqmUa5LR6T1ovt8OKT8ciGGbvPLuwuKyzfodtzUD',
                {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // the username to be displayed
                    username: 'Error Logger',
                    // the avatar to be displayed
                    avatar_url:
                      'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1698985954~exp=1698986554~hmac=b4d3886d95c9c39d5448ee8873094f9d3e73f1206c33391b35a1ca6e99e55c6a',
                    // contents of the message to be sent
                    content:
                      '<@1169853514592301076>, <@&1169854908653109289>',
                    // enable mentioning of individual users or roles, but not @everyone/@here
                    allowed_mentions: {
                      parse: ['users', 'roles'],
                    },
                    // embeds to be sent
                    embeds: [
                      {
                        // decimal number colour of the side of the embed
                        color: 11730954,
                        // author
                        // - icon next to text at top (text is a link)
                        author: {
                          name: 'Error',
                          url: 'https://sajsvaranasi.repl.co/',
                          icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                        },
                        // embed title
                        // - link on 2nd row
                        title: 'New Error Catched',
                        url:
                          'https://sajsvaranasi.repl.co/',
                        // thumbnail
                        // - small image in top right corner.
                        // embed description
                        // - text on 3rd row
                        description: `${error.message}`,
                        // custom embed fields: bold title/name, normal content/value below title
                        // - located below description, above image.
                        // image
                        // - picture below description(and fields)
                        // footer
                        // - icon next to text at bottom
                      },
                    ],
                  }),
                }
              );
            });

          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            // uploads all data to firestore
            messaging.getToken({ vapidKey: vapidKey })
              .then((currentToken) => {
                if (currentToken) {
                  localStorage.setItem("fcm_token", currentToken);
                } else {
                  console.log(
                    "No registration token available. Request permission to generate one."
                  );
                }
              })
              .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);

                fetch(
                  'https://discord.com/api/webhooks/1169855210567516281/BXAUuK_tMQ7QZoHuL46htJw7aIKgtqmUa5LR6T1ovt8OKT8ciGGbvPLuwuKyzfodtzUD',
                  {
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      // the username to be displayed
                      username: 'Error Logger',
                      // the avatar to be displayed
                      avatar_url:
                        'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1698985954~exp=1698986554~hmac=b4d3886d95c9c39d5448ee8873094f9d3e73f1206c33391b35a1ca6e99e55c6a',
                      // contents of the message to be sent
                      content:
                        '<@1169853514592301076>, <@&1169854908653109289>',
                      // enable mentioning of individual users or roles, but not @everyone/@here
                      allowed_mentions: {
                        parse: ['users', 'roles'],
                      },
                      // embeds to be sent
                      embeds: [
                        {
                          // decimal number colour of the side of the embed
                          color: 11730954,
                          // author
                          // - icon next to text at top (text is a link)
                          author: {
                            name: 'Error',
                            url: 'https://sajsvaranasi.repl.co/',
                            icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                          },
                          // embed title
                          // - link on 2nd row
                          title: 'New Error Catched',
                          url:
                            'https://sajsvaranasi.repl.co/',
                          // thumbnail
                          // - small image in top right corner.
                          // embed description
                          // - text on 3rd row
                          description: `${err.message}`,
                          // custom embed fields: bold title/name, normal content/value below title
                          // - located below description, above image.
                          // image
                          // - picture below description(and fields)
                          // footer
                          // - icon next to text at bottom
                        },
                      ],
                    }),
                  }
                );
                // ...
              });
            const db = firebase.firestore();
            const sector = document.querySelector(".sec_inp");
            console.log("Second Token: " + token);
            setTimeout(async () => {
              var tok = localStorage.getItem("fcm_token");
              console.log("Second Token: " + tok);

              db.collection(`${sector.value}`).doc(namee.value + classs.value + section.value)
                .set({
                  name: namee.value,
                  class: classs.value,
                  section: section.value,
                  email: email.value,
                  password: defaultPass,
                  asset: downloadURL,
                  fcm_token: tok,
                  sector: sector.value,
                  phone: phone.value,
                  selection_status: "pending",
                })
                .then(() => {
                  localStorage.setItem("collection_reference", sector.value);
                  localStorage.setItem("document_id", namee.value + classs.value + section.value);

                  Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                      new Notification("Welcome 🛬", {
                        body: "You have successfully logged in to your account.",
                        image: "https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1698759738~exp=1698760338~hmac=b86559cd79e0ebca79b061c76ac9c9c21c30674379b27e4587a95e67dfe7dbeb"
                      });
                    }
                  }).catch((error) => {
                    fetch(
                      'https://discord.com/api/webhooks/1169855210567516281/BXAUuK_tMQ7QZoHuL46htJw7aIKgtqmUa5LR6T1ovt8OKT8ciGGbvPLuwuKyzfodtzUD',
                      {
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          // the username to be displayed
                          username: 'Error Logger',
                          // the avatar to be displayed
                          avatar_url:
                            'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1698985954~exp=1698986554~hmac=b4d3886d95c9c39d5448ee8873094f9d3e73f1206c33391b35a1ca6e99e55c6a',
                          // contents of the message to be sent
                          content:
                            '<@1169853514592301076>, <@&1169854908653109289>',
                          // enable mentioning of individual users or roles, but not @everyone/@here
                          allowed_mentions: {
                            parse: ['users', 'roles'],
                          },
                          // embeds to be sent
                          embeds: [
                            {
                              // decimal number colour of the side of the embed
                              color: 11730954,
                              // author
                              // - icon next to text at top (text is a link)
                              author: {
                                name: 'Error',
                                url: 'https://sajsvaranasi.repl.co/',
                                icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                              },
                              // embed title
                              // - link on 2nd row
                              title: 'New Error Catched',
                              url:
                                'https://sajsvaranasi.repl.co/',
                              // thumbnail
                              // - small image in top right corner.
                              // embed description
                              // - text on 3rd row
                              description: `${error.message}`,
                              // custom embed fields: bold title/name, normal content/value below title
                              // - located below description, above image.
                              // image
                              // - picture below description(and fields)
                              // footer
                              // - icon next to text at bottom
                            },
                          ],
                        }),
                      }
                    );
                  })

                  window.location.replace(
                    "https://sajsvaranasi.repl.co/"
                  );
                });
            }, 2000);
          });
          swal("Your submission has been received.");
        }
      );
    }
  }

  // final function run after the participate button is clicked

  submit_button.addEventListener("click", () => {
    valueCheck();
    getFile();
  });

}