import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import "./SidebarChat.css";
function SidebarChat({ addNewChat, id, name, image }) {
  // State (Start)
  const [messages, setMessages] = useState("");
  // State (End)
  /*  */
  // Effect (Start)
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  // Effect (End)
  /*  */
  // Functions (Start)
  const createChat = () => {
    const roomName = prompt("Please enter the name of the group.");
    const roomImage = prompt(
      "Please enter a valid url with the profile picture of the group."
    );

    if (roomName && roomImage) {
      db.collection("rooms").add({
        name: roomName,
        image: roomImage,
      });
    }
  };
  // Functions (End)
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={image} />
        <div className="sidebarChat__info">
          <h2>
            {" "}
            <b> {name} </b>{" "}
          </h2>
          <p>
            <b>
              {messages[0]?.name} : {messages[0]?.message}
            </b>
          </p>
        </div>
        <br />
      </div>
    </Link>
  ) : (
    <div>
      <br />
      <Button onClick={createChat} className="new">
        <h3>
          <b>Create New Chat</b>
        </h3>
      </Button>
      <br />
      <br />
      <Link to="/">
        <Button className="new">
          <h3>
            <b>Home Page</b>
          </h3>
        </Button>
      </Link>
      <br />
    </div>
  );
}

export default SidebarChat;
