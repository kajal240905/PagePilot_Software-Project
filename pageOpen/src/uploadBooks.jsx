// import { db, auth } from "./firebaseConfig.js"; // Import auth
// import { collection, addDoc } from "firebase/firestore";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import fs from "fs";

// // Import books dataset
// const booksData = JSON.parse(fs.readFileSync("./src/books_dataset.json", "utf8"));

// // Your Firebase test user credentials (use an existing account)
// const email = "your-email@example.com";  // Replace with your test user email
// const password = "your-password";        // Replace with your test user password

// const uploadBooks = async () => {
//     try {
//         // Sign in before writing to Firestore
//         await signInWithEmailAndPassword(auth, email, password);
//         console.log("✅ Signed in successfully!");

//         const booksCollection = collection(db, "books");
//         for (const book of booksData) {
//             await addDoc(booksCollection, book);
//         }

//         console.log("📚 Books uploaded successfully!");
//     } catch (error) {
//         console.error("❌ Error uploading books:", error);
//     }
// };

// uploadBooks();