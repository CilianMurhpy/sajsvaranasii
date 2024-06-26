window.onload = () => {
  // console.log("Loaded");

  const namee = document.querySelector(".name");
  const classs = document.querySelector(".cl");
  const email = document.querySelector(".em");
  const phone = document.querySelector(".phonee");
  const section = document.querySelector(".sec");
  const sector = document.querySelector(".set");
  const statuss = document.querySelector(".sp");
  const message = document.querySelector(".message");
  const assets = document.querySelector(".assets");

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
  const db = firebase.firestore();

  function checkUser() {
    if (!localStorage.getItem("hasCheckedUser")) {
      if (localStorage.getItem("email") && localStorage.getItem("password")) {
        window.location.replace("https://sajsvaranasi.repl.co/profile/");

      } else {
        window.location.replace("https://sajsvaranasi.repl.co/");
      }

      // Set the flag to indicate that the function has been executed
      localStorage.setItem("hasCheckedUser", true);
    }
    const emailuser = firebase.auth().currentUser;
    if (emailuser) {
      console.log("User is signed in.");
    } else {
      console.log("No user is signed in.");
    }
  }

  checkUser();

  // initializing messaging

  const messaging = firebase.messaging();

  messaging.getToken({
    vapidKey: vapidKey,
  });


  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission == "granted") {

        console.log("Notification permission granted.");
      } else {
        swal("Notification not enabled.", "Please enable notifications or you will not be able to get updates.")
      }
    });
  }

  requestPermission();

  function getTokenn() {
    messaging
      .getToken({ vapidKey: vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          localStorage.setItem("fcm_token", currentToken);
          console.log("Updated token...", currentToken);
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

  getTokenn();


  // updates fcm token

  function updateFCMtoken() {
    if (!localStorage.getItem("updatedFCMTokenn")) {
      const colRef = localStorage.getItem("collection_reference");
      const docRef = localStorage.getItem("document_id");
      const updatedToken = localStorage.getItem("fcm_token");
      const userRef = db.collection(colRef).doc(docRef);

      userRef.set({
        fcm_token: updatedToken,
      }, { merge: true });

      localStorage.setItem("updatedFCMTokenn", true);

      console.log("Updated token: ", updatedToken);
    }
  }

  updateFCMtoken();

  function updateFCMtokenn() {
    const colRef = localStorage.getItem("collection_reference");
    const docRef = localStorage.getItem("document_id");
    const updatedToken = localStorage.getItem("fcm_token");
    const userRef = db.collection(colRef).doc(docRef);

    userRef.set({
      fcm_token: updatedToken,
    }, { merge: true });

    localStorage.setItem("updatedFCMTokenn", true);

    console.log("Updated token.(2sec)", updatedToken);
  }

  setTimeout(() => {
    updateFCMtokenn();
  }, 2000)

  async function getDataFromFirestore() {
    let collectionReference = localStorage.getItem("collection_reference");
    let documentID = localStorage.getItem("document_id");

    const docRef = db.collection(collectionReference).doc(documentID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const nm = doc.data().name;
        const st = doc.data().selection_status;

        let pre_sectorr = localStorage.getItem("pre_sectorr");

        fetch(
          'https://discord.com/api/webhooks/1170270362794197032/TF_-zHkB0HeH0L4f9zkeW-nDo1Exu0GZoLtb_ZaziwUIFn-7dMynid48-HZ8HdYzbBIE',

          // https://discord.com/api/webhooks/1170270362794197032/TF_-zHkB0HeH0L4f9zkeW-nDo1Exu0GZoLtb_ZaziwUIFn-7dMynid48-HZ8HdYzbBIE
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // the username to be displayed
              username: 'Visit Loggers',
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
                    name: 'Visit',
                    url: 'https://sajsvaranasi.repl.co/',
                    icon_url: 'https://i.ibb.co/FwkfVqS/JDD.png',
                  },
                  // embed title
                  // - link on 2nd row
                  title: 'New Visit Detected',
                  url:
                    'https://sajsvaranasi.repl.co/',
                  // thumbnail
                  // - small image in top right corner.
                  // embed description
                  // - text on 3rd row
                  description: `**${nm}** visited the portal.`,
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

        namee.innerHTML = nm.split(" ")[0];
        classs.innerHTML = `
      <i class="fa-solid fa-circle-check "></i> ${doc.data().class}
      `;
        email.innerHTML = `<i class="fa-solid fa-circle-check "></i> ${doc.data().email
          }`;
        phone.innerHTML = `
      <i class="fa-solid fa-circle-check "></i> ${doc.data().phone}
      `;
        section.innerHTML = `
      <i class="fa-solid fa-circle-check "></i> ${doc.data().section}
      `;
        sector.innerHTML = `
      <i class="fa-solid fa-circle-check "></i> ${doc.data().sector}
      `;
        if (!localStorage.getItem("pre_sector", doc.data().sector)) {
          localStorage.setItem("pre_sector", doc.data().sector);
        } else {
          localStorage.setItem("pre_sector", doc.data().sector);
        }
        statuss.innerHTML = `<i class="fa-solid fa-circle fa-beat-fade sta"></i> <span class="txt">${st.toUpperCase()}</span> 
      `;
        if (localStorage.getItem("new_file")) {
          var new_file = localStorage.getItem("new_file");
          document.querySelector(".asset_link").setAttribute("href", new_file);
        } else {

          document.querySelector(".asset_link").setAttribute("href", doc.data().asset);
        }

        const tx = document.querySelector(".txt");
        let sta = document.querySelector(".sta");
        console.log(tx.innerHTML);
        if (tx.innerHTML.toLowerCase() == "selected") {
          sta.style.color = "#ffc55a";
          sta.setAttribute("class", "fa-solid fa-champagne-glasses fa-bounce");
          statuss.style.color = "#ffc55a";
          console.log(tx, statuss);
          message.innerHTML =
            "Congratulations on your selection. Your achievement is well-deserved, and we're excited to see what you'll bring to the event.";
        }
        if (tx.innerHTML.toLowerCase() == "not selected") {
          sta.style.color = "white";
          sta.setAttribute("class", "fa-solid fa-clover fa-spin");
          statuss.style.color = "";
          console.log(tx, statuss);
          message.innerHTML =
            "Thank you for your application. While you were not selected for this event, please don't be disheartened. We appreciate your interest, and there will be more opportunities in the future. Keep striving for your goals, and we hope to see you succeed in other endeavors.";
        }
      } else {

        console.log("No such document!");



        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("fcm_token");
        localStorage.removeItem("file_name");
        localStorage.removeItem("pre_sector");
        localStorage.removeItem("storage_ref");
        localStorage.removeItem("new_file");
        localStorage.removeItem("hasCheckedUser");
        localStorage.removeItem("updatedFCMTokenn");

        window.location.replace("https://sajsvaranasi.repl.co/");
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





  getDataFromFirestore();
};
