import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import HomePageBanner from "./HomePageBanner";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";

function App() {
  //const [user, setUser] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          {/* Content (Start) */}
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <HomePageBanner />
              </Route>
            </Switch>
          </Router>
          {/* Content (End) */}
        </div>
      )}
      <div className="footer">
        {/* Footer (Start) */}
        <h3>
          <b>
            <i>Copyright © 2020 RanugaD</i>
          </b>
        </h3>
        {/* Footer (End) */}
      </div>
    </div>
  );
}

export default App;
// RanugaD
