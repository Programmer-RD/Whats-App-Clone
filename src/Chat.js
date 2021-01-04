import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
function Chat() {
  // State (Start)
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [roomImage, setRoomImage] = useState("");
  // State (End)
  /* */
  // Effect (Start)
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomImage(snapshot.data().image));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          //setMessages()
          console.log(snapshot.docs[0].data())//snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  // Effect (End)
  /*  */
  // Functions (Start)
  const sendMessage = (event) => {
    event.preventDefault();
    const info = {
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log(info);
    db.collection("rooms").doc(roomId).collection("messages").add(info);
    setInput("");
  };
  // Functions (End)
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={roomImage} />
        <div className="chat__headerInfo">
          <h2>
            <b>{roomName}</b>
          </h2>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <div>
            <br />
            <p
              className={`chat__message ${
                message.name === user.displayName && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder="Please enter a Message"
          />
          <button type="submit" onClick={sendMessage} disabled={!input}>
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
