import config from "./config";
import { useUserContext } from '../../context/AuthContext'

export async function getCurrentUser() {
    try {
        const currentAccount = await fetch(`${config.SERVERURL}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        console.log("currentAccount", currentAccount)

        if (!currentAccount.ok) {
            console.log("currentAccount", currentAccount)
            return false
        }

        const currentUser = await currentAccount.json();
        console.log("current User: ", currentUser)

        if (!currentAccount.ok) return false
        return currentUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function signInAccount({ email, password }) {
    try {
        const session = await fetch(`${config.SERVERURL}/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
            method: "POST",
            credentials: 'include'
        })
        console.log(session)
        const ans = await session.json();
        console.log(ans)
        if (session.ok) {
            localStorage.setItem("loggedIn", true)
        } else {
           return false
        }
        return session.ok;
    } catch (error) {
        console.log(error);
    }
}
export async function getContacts() {
    try {
        const contacts = await fetch(`${config.SERVERURL}/contacts`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            credentials: 'include'
        })

        if (!contacts.ok) return false;
        const data = await contacts.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export async function getPosts() {
    try {
        const res = await fetch(`${config.SERVERURL}/?page=1`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            credentials: 'include'
        })

        if (!res.ok) return false;
        const posts = await res.json();
        console.log(posts.posts)
        return posts.posts;
    } catch (error) {
        console.log(error);
    }
}

export function likePost(event, postID, authorID) {
    console.log(event, postID, authorID);
    // console.log(event.target.className)

    if (event.target.className == "bx bx-like") {
        event.target.className = "bx bxs-like";
        event.target.setAttribute("style", "color: #f54a6c");
    } else {
        event.target.className = "bx bx-like";
    }

    fetch(`${config.SERVERURL}/like/${postID}/${authorID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function deletePost(id,post) {
    fetch(`${config.SERVERURL}/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
        .then((response) => response.json())
        // .then(() => post.target.parentElement.parentElement.parentElement.parentElement.style.display="none")
        .catch((error) => {
            console.error("Error:", error);
        });
    return true;
}
export function savePost(event, postID, authorID) {
    console.log(event, postID, authorID);

    if (event.target.className == "bx bx-bookmark") {
        event.target.className = "bx bxs-bookmark";
        event.target.setAttribute("style", "color: #6a3bec");
    } else {
        event.target.className = "bx bx-bookmark";
    }
    console.log(event.target.className)
    fetch(`${config.SERVERURL}/save/${postID}/${authorID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        credentials: "include"

    })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}

export function sharePost(id, site) {
  var postId = id;
  var baseUrl = config.SERVERURL;
  var url;

  if (site == "linkedin") {
    url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      baseUrl + "/" + postId
    )}`;
  } else if (site == "pinterest") {
    url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      baseUrl + "/" + postId
    )}`;
  } else if (site == "twitter") {
    url = `https://twitter.com/share?url=${encodeURIComponent(
      baseUrl + "/" + postId
    )}`;
  } else if (site == "facebook") {
    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      baseUrl + "/" + postId
    )}`;
  } else if (site == "instagram") {
    url = `https://www.instagram.com/share?url=${encodeURIComponent(
      baseUrl + "/" + postId
    )}`;
  } else if (site == "whatsapp") {
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      baseUrl + "/" + postId
    )}`;
  }

  // Open the URL in a new window or tab
  window.open(url, "_blank");
}

export async function postText(text,file,UserID) {
  
    // Create a new FormData instance
    const formData = new FormData();
    // Append the text and UserDetails data to the form
    formData.append("text", text);
    formData.append("authorID", UserID);
    // Check if an image file is being uploaded
    // const file = document.querySelector("#fileinput").files[0];
    if (file) {
      // If a file is being uploaded, append it to the form data
      formData.append("file", file);
    }
  
    const fetched = await fetch(`${config.SERVERURL}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      credentials: "include",
      method: "POST",
      body: formData, // Send the form data
    });
    if (fetched.ok === true) {
        return true;
    } else {
      return false
    }
  }