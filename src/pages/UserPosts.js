import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(response => {
        setPosts(response.data);
        toast.success("Posts Loaded Successfully!");
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts.");
      });
  }, [id]);

  return (
    <Container>
      <TextField label="Search Posts" fullWidth onChange={e => setSearch(e.target.value)} />
      {posts.filter(post => post.title.includes(search) || post.body.includes(search)).map(post => (
        <Card key={post.id} size={4}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
    
  );
};

export default UserPosts;