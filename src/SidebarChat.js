import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import "./SidebarChat.css";
function SidebarChat({ addNewChat, id, name }) {
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
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  // Functions (End)
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${id.toString()}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>
          {messages[0]?.name} : {messages[0]?.message}
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
