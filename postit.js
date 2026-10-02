// Variables for the user information
let userName = "";
let birthDate = "";
let yearLevel = "";
let gender = "";
let username = "";
let password = "";

// Secret key for the encryption
const secretKey = "postitStudentKey";

// This function gets the information from the user form
function saveUser() {

    // Get the value from the forms
    userName = document.getElementById("userName").value;
    birthDate = document.getElementById("bdate").value;
    yearLevel = document.getElementById("yearLevel").value;
    gender = document.getElementById("gender").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    // Check if all information is filled up
    if (userName == "" || birthDate == "" || yearLevel == "" ||
        gender == "" || username == "" || password == "") {

        document.getElementById("userMessage").textContent =
            "Please complete all the information.";

        return;
    }

    // Show the post box after the user information is completed
    document.getElementById("userSection").classList.add("hidden");
    document.getElementById("postSection").classList.remove("hidden");

    document.getElementById("userMessage").textContent = "";
}

// This function adds the caption to the thread
function addPost() {

    // Get the caption from the textarea
    const post = document.getElementById("postText").value;

    // Check if the post is empty
    if (post.trim() == "") {

        document.getElementById("postMessage").textContent =
            "Please write a caption.";

        return;
    }

    // Get the date and time of the post
    const date = new Date().toLocaleString();

    // Combine the user name, post and date
    const information = userName + " + " + post + " + " + date;

    // Encrypt the information using CryptoJS
    const encrypted = CryptoJS.AES.encrypt(
        information,
        secretKey
    ).toString();

    // Create the post container
    const postDiv = document.createElement("div");
    postDiv.className = "thread-post";

    // Show ORIGINAL POST
    const original = document.createElement("b");
    original.textContent = "ORIGINAL POST";

    // Show the original caption
    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = post;

    // Show ENCRYPTED
    const encryptedTitle = document.createElement("b");
    encryptedTitle.textContent = "ENCRYPTED";

    // Show the encrypted information
    const encryptedText = document.createElement("pre");
    encryptedText.className = "encrypted";
    encryptedText.textContent = encrypted;

    // Put the parts together
    postDiv.appendChild(original);
    postDiv.appendChild(caption);
    postDiv.appendChild(encryptedTitle);
    postDiv.appendChild(encryptedText);

    // Add the post below the post box
    document.getElementById("thread").appendChild(postDiv);

    // Clear the textarea after posting
    document.getElementById("postText").value = "";
    document.getElementById("postMessage").textContent = "";
}
