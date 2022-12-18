import Postview from "./components/postview/postView";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Landing from "./components/landing_page/landing";
import CreatePost from "./components/createPost/createPost";
import Signup from "./components/signUp/signup";
import SignIn from "./components/signIn/signIn";
import MyPosts from "./components/myPosts/myPosts";
import Header from "./components/header/header";
import { createContext, useEffect, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext()


const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      navigate("/postview")
    }
    else {
      navigate("/signin")
    }
  }, [])

  return (

    <Routes>

      <Route exact path='/postview' element={< Postview />}></Route>
      <Route exact path='/createPost' element={< CreatePost />}></Route>
      <Route exact path='/signUp' element={< Signup />}></Route>
      <Route exact path='/signIn' element={< SignIn />}></Route>
      <Route exact path='/myposts' element={< MyPosts />}></Route>
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
    
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          {/* <Routes> */}
          <Routing />

          {/* </Routes> */}
        </Router>

      </UserContext.Provider>
    </div>
  );
}

export default App;
