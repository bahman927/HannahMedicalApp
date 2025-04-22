import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios           from "axios";
import { useNavigate } from "react-router-dom";

const myAppointment = () => {
  const { name } = useContext(AuthContext);
  const [posts, setPosts] = useState( [
    { name: "Ali", speciality: "Doctor" },
    { name: "Sara", speciality: "Nurse" },
    { name: "John", speciality: "Surgeon" }
  ]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!name) {
      alert("Please Login or Sign Up first");
      navigate("/");
      return;
    }

    // Fetch user's posts
    axios
    .get(`https://hannahmedicalapi.onrender.com/api/user/posts`, { withCredentials: true})
    .then((res) => setPosts(res.data.posts))
    .catch((error) => console.error("Error fetching posts:", error.response?.data || error.message));
}, [name, navigate]);

const handleDeletePost = (postId) => {
  axios
    .delete(`https://hannahmedicalapi.onrender.com/api/user/posts/${postId}`, { withCredentials: true })
    .then(() => {
      alert("Appointment deleted successfully");
      setPosts(posts.filter((post) => post._id !== postId)); // Update UI
    })
    .catch((err) => console.error("Error deleting appointment:", err));
};

  return (
    <div className="flex flex-row p-5 flegap-4 sm:flex-row">
       <div>
        <img src={posts.image} alt="" />
       </div>
     
      <h3 className="mt-4 text-xl font-semibold">Appointments</h3>
      {posts.length === 0 ? (
        <p>No appointments available at the moment.</p>
      ) : (
        <ul className="ml-5 list-disc ">
          {posts.map((post) => (
            <li key={post._id} className="flex gap-5 mt-2">
              <h4 className="font-bold">name: {post.name}</h4>
              <p className=''>speciality: {post.speciality}</p>
               {/* Show delete button only if the user is the owner or a superuser */}
              {/* {(user.id === post.author._id || user.role === "superuser") && ( */}
                <button onClick={() => handleDeletePost(post._id)}>Delete</button>
              
                
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default myAppointment;
