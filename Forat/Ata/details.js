import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, child, remove, update, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "https://tv-shows-a6dfc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tv-shows-a6dfc",
    storageBucket: "tv-shows-a6dfc.appspot.com",
    messagingSenderId: "950780821633",
    appId: "1:950780821633:web:6614119aa73d65008f8d80",
    measurementId: "G-BLCV05YBNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = sessionStorage.getItem('id');
const movieId = JSON.parse(sessionStorage.getItem('movie')).id;

document.addEventListener('DOMContentLoaded', async function() {
    const submitButton = document.getElementById("submit-comment");
    const commentInput = document.getElementById("comment-input");
            const commentsContainer = document.getElementById('cont');
        commentsContainer.innerHTML = ""; // Clear previous comments
        
let globalData;
        get(child(ref(db), comments/${movieId} )).then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                globalData = data;
                const keys = Object.keys(data);
                console.log(data)
                keys.forEach(key => {
                                        const item = data[key];
                                        const commentElement = document.createElement('div');
                                        commentElement.className = 'r';
                                        commentElement.id = key;
                                        commentElement.style.width = '100%';
                                        commentElement.style.height = 'auto'; // Adjust as needed
                                        console.log(data)
                                        commentElement.innerHTML = `
                                            <div class="userinf" id=${key}>
                                                <div>
                                                    <img class="userimg" src="" alt="User Image">
                                                    <p class="user-name1">${data[userId].userId}</p>
                                                    <p class="commentslorem2">${data[userId].comment}</p>
                                                </div>
                                                
                                                
                                            </div>`;
                                        //console.log(data[key][userId].comment) // استدعاء فيريابيل عن طريق []
                    
                    
                                        commentsContainer.appendChild(commentElement);
                                    });
            }



        })        
    submitButton.addEventListener("click", async function (e) {
        e.preventDefault();

        const comment = commentInput.value;
        
        if (!userId || !movieId) {
            console.error("User ID or Movie ID not found in sessionStorage");
            return;
        }
        console.log(globalData)
        const keys = Object.keys(globalData);
        console.log(keys)

        // for(let i = 0 ; i <= keys.lenth ; i++ ){

        //     if(keys == userId){

        //     }
        // }

        try {
            // Save comment to Firebase
            await set(ref(db, 'comments/' + movieId + "/" + userId), {
                comment: comment,
                userId: userId,
                movieId: movieId
            });
            
            alert("Comment added successfully");
            // fetchAndDisplayComments(); // Update UI after adding comment
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    });
})

//     function fetchAndDisplayComments() {
    
//         const commentsContainer = document.getElementById('cont');
//         commentsContainer.innerHTML = ""; // Clear previous comments

//         get(child(ref(db), "comments/" )).then(snapshot => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 const keys = Object.keys(data);
//                 // console.log(data)
                
//                 keys.forEach(key => {
//                     const item = data[key];
//                     const commentElement = document.createElement('div');
//                     commentElement.className = 'r';
//                     commentElement.id = key;
//                     commentElement.style.width = '100%';
//                     commentElement.style.height = 'auto'; // Adjust as needed
//                     console.log(data)
//                     commentElement.innerHTML = `
//                         <div class="userinf" id=${key}>
//                             <div>
//                                 <img class="userimg" src="" alt="User Image">
//                                 <p class="user-name1">${data[key][userId].userId}</p>
//                                 <p class="commentslorem2">${data[key][userId].comment}</p>
//                             </div>
                            
//                             <div class="EditDel">
//                                 <button class="edit-comment1" id="${key}">Edit</button>
//                                 <button class="delete-comment1" id="${key}">Delete</button>
//                             </div>
//                         </div>`;
//                     //console.log(data[key][userId].comment) // استدعاء فيريابيل عن طريق []


//                     commentsContainer.appendChild(commentElement);
//                 });

//                 // Handle delete buttons
//                 const deleteButtons = document.querySelectorAll(".delete-comment1");
//                 deleteButtons.forEach(button => {
//                     button.addEventListener("click", e => {
//                         remove(ref(db, "comments/" + e.target.id));
//                         const commentElement = document.getElementById(e.target.id);
//                         commentElement.remove();
//                     });
//                 });

//                 // Handle edit buttons
//                 const editButtons = document.querySelectorAll(".edit-comment1");
//                 editButtons.forEach(button => {
//                     button.addEventListener("click", async e => {
//                         const newComment = prompt("Enter new comment");
//                         if (!newComment) return; // Cancelled or empty

//                         try {
//                             const dbRef = ref(db, "comments/" + e.target.id);
//                             await update(dbRef, { comment: newComment });

//                             // Update the UI
//                             const commentElement = document.getElementById(e.target.id);
//                             if (commentElement) {
//                                 commentElement.querySelector(".commentslorem2").textContent = newComment;
//                                 console.log("Comment updated successfully");
//                             } else {
//                                 console.error("Comment element not found");
//                             }
//                         } catch (error) {
//                             console.error("Error updating comment:", error);
//                         }
//                     });
//                 });
//             } else {
//                 console.log("No comments found");
//             }
//         }).catch(error => {
//             console.error("Error getting comments:", error);
//         });
//     }

//     // Initial fetch and display of comments
//     fetchAndDisplayComments();
// });



// // movieId 


//  for other comments 