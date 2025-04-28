// // export default function Others(){


   
// //     return(
// // <>
// // <h1>Others Component</h1>
// // </>
// //     )
    
// // }



// import { useState } from "react";

// export default function Others() {
//   const [suggestions, setSuggestions] = useState([]);
//   const [formData, setFormData] = useState({ bookName: "", author: "", genre: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSuggestions([...suggestions, formData]);
//     setFormData({ bookName: "", author: "", genre: "" }); // Reset form
//   };

//   return (
//     <div className="p-6">

//       {/* Online Resources */}
//       <section className="my-8">
//         <h2 className="text-3xl font-bold mb-4">🌐 Online Resources</h2>
//         <ul className="list-disc ml-6">
//           <li><a className="text-blue-500" href="https://www.gutenberg.org/" target="_blank">Project Gutenberg</a></li>
//           <li><a className="text-blue-500" href="https://openlibrary.org/" target="_blank">Open Library</a></li>
//           <li><a className="text-blue-500" href="https://books.google.com/" target="_blank">Google Books</a></li>
//         </ul>
//       </section>

//       {/* Study Resources */}
//       <section className="my-8">
//         <h2 className="text-3xl font-bold mb-4">🎓 Study Resources</h2>
//         <ul className="list-disc ml-6">
//           <li>Follow active reading strategies: highlight important points.</li>
//           <li>Use the Pomodoro technique: 25 mins study, 5 mins break.</li>
//           <li>Summarize every chapter in your own words.</li>
//         </ul>
//       </section>

//       {/* Suggest a Book */}
//       <section className="my-8">
//         <h2 className="text-3xl font-bold mb-4">📝 Suggest a Book</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Book Name"
//             className="border p-2 w-full rounded"
//             value={formData.bookName}
//             onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Author Name"
//             className="border p-2 w-full rounded"
//             value={formData.author}
//             onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Genre"
//             className="border p-2 w-full rounded"
//             value={formData.genre}
//             onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
//             required
//           />
//           <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//             Submit
//           </button>
//         </form>

//         {/* Show all suggestions */}
//         <div className="mt-6">
//           <h3 className="text-2xl font-semibold mb-2">📚 Books Suggested by Others</h3>
//           {suggestions.length === 0 ? (
//             <p>No suggestions yet!</p>
//           ) : (
//             <ul className="list-disc ml-6">
//               {suggestions.map((suggestion, index) => (
//                 <li key={index}>
//                   <strong>{suggestion.bookName}</strong> by {suggestion.author} ({suggestion.genre})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </section>

//       {/* Developed By */}
//       <section className="text-center my-12">
//         <h2 className="text-2xl font-bold mb-2">💻 Project Developed By</h2>
//         <p className="text-lg">Vidya | Kajal | Lisha</p>
//       </section>

//     </div>
//   );
// }

import { useState } from "react";
import Navbar from "../compo/Navbar";
import Footer from "../compo/Footer";

export default function Others() {
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({ bookName: "", author: "", genre: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([...suggestions, formData]);
    setFormData({ bookName: "", author: "", genre: "" }); // Reset form
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-8">
        {/* Online Resources */}
        <section className="my-12 p-6 border-2 border-green-500 rounded-lg bg-green-50" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6 border-b-4 border-green-300 inline-block text-shadow-md">🌐 Online Resources</h2>
          <ul className="list-disc ml-8 mt-4 space-y-2">
            <li><a className="hover:underline text-green-300 text-lg transition-all duration-300 hover:text-green-500" href="https://www.gutenberg.org/" target="_blank">Project Gutenberg</a></li>
            <li><a className="hover:underline text-green-300 text-lg transition-all duration-300 hover:text-green-500" href="https://openlibrary.org/" target="_blank">Open Library</a></li>
            <li><a className="hover:underline text-green-300 text-lg transition-all duration-300 hover:text-green-500" href="https://books.google.com/" target="_blank">Google Books</a></li>
            <li><a className="hover:underline text-green-300 text-lg transition-all duration-300 hover:text-green-500" href="https://www.pdfdrive.com/" target="_blank">PDF Drive</a></li>
            <li><a className="hover:underline text-green-300 text-lg transition-all duration-300 hover:text-green-500" href="https://scholar.google.com/" target="_blank">Google Scholar</a></li>
          </ul>
        </section>

        {/* Study Resources */}
        <section className="my-12 p-6 border-2 border-green-500 rounded-lg bg-green-50" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6 border-b-4 border-green-300 inline-block text-shadow-md">🎓 Study Resources</h2>
          <ul className="list-disc ml-8 mt-4 space-y-3 text-lg">
            <li>📖 Practice active reading — highlight important ideas and take quick notes.</li>
            <li>⏰ Use Pomodoro Technique — 25 mins focus + 5 mins short break = 1 cycle.</li>
            <li>🧠 Summarize each chapter in your own words after reading.</li>
            <li>📅 Plan a simple weekly reading schedule — consistency beats cramming.</li>
            <li>🎯 Set small achievable goals: "Finish 30 pages today" instead of "Read whole book."</li>
            <li>📝 Try making flashcards for important terms or facts.</li>
            <li>🤝 Discuss what you learned with friends to reinforce memory.</li>
            <li>📚 Read a mix of textbooks + real-world application books for deeper understanding.</li>
            <li>🎧 Try audiobooks for revision when you're on a walk or resting.</li>
          </ul>
        </section>

        {/* Suggest a Book */}
        <section className="my-12 p-6 border-2 border-green-500 rounded-lg bg-green-50" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6 border-b-4 border-green-300 inline-block text-shadow-md">📝 Suggest a Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Book Name"
              className="border border-green-400 bg-white text-green-800 p-4 w-full rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              value={formData.bookName}
              onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Author Name"
              className="border border-green-400 bg-white text-green-800 p-4 w-full rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Genre"
              className="border border-green-400 bg-white text-green-800 p-4 w-full rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-green-400 text-black px-8 py-3 rounded-full hover:bg-green-500 font-semibold transition duration-500 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </form>

          {/* Show all suggestions */}
          <div className="mt-8">
            <h3 className="text-3xl font-semibold mb-4 text-shadow-md">📚 Books Suggested by Others</h3>
            {suggestions.length === 0 ? (
              <p className="text-xl">No suggestions yet! Be the first to suggest 📖.</p>
            ) : (
              <ul className="list-disc ml-8 space-y-2 text-lg">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="hover:text-green-400 transition-all duration-300">
                    <strong>{suggestion.bookName}</strong> by {suggestion.author} <em>({suggestion.genre})</em>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Developed By */}
        <section className="text-center my-16 p-6 border-2 border-green-500 rounded-lg bg-green-50" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 border-b-4 border-green-300 inline-block text-shadow-md">💻 Project Developed By</h2>
          <p className="text-xl mt-2">Vidya | Kajal | Lisha</p>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
