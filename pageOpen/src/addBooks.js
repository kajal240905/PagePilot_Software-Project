// import { db, auth } from "./firebaseConfig.js"; // Import auth for login
// import { collection, getDocs } from "firebase/firestore";
// import { signInWithEmailAndPassword } from "firebase/auth";

// // Test user credentials (must exist in Firebase Authentication)
// const email = "vidya@gmail.com";  // Use your test email
// const password = "327327";        // Use your test password

// const fetchBooksFromFirestore = async () => {
//   try {
//     // ✅ Sign in before fetching books
//     await signInWithEmailAndPassword(auth, email, password);
//     console.log("✅ Signed in successfully!");

//     const booksCollection = collection(db, "books");
//     const bookSnapshot = await getDocs(booksCollection);

//     if (bookSnapshot.empty) {
//       console.log("❌ No books found in Firestore.");
//       return [];
//     }

//     const books = bookSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return books;
//   } catch (error) {
//     console.error("❌ Error fetching books:", error);
//     return [];
//   }
// };

// // ✅ Run the fetch function
// fetchBooksFromFirestore().then(books => {
//  // console.log("📚 Books from Firestore:", books);
// });