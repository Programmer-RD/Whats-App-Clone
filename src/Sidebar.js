import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLarge,
  MoreVert,
  SearchOutlined
} from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import SidebarChat from "./SidebarChat";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar_search_Container">
          <SearchOutlined />
          <input placeholder="Search or Start new chat" type="text" />
        </div>
        {/* Where I left */}
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} image={room.data.image} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
