import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Button, Typography } from "@mui/material";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid display="flex" item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="body2">{user.company.name}</Typography>
                <Button component={Link} to={`/user/${user.id}`} variant="contained">
                  View Posts
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;