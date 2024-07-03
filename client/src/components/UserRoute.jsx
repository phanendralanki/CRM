import { useSelector } from "react-redux";
import { Outlet ,Navigate} from "react-router-dom";

function UserRoute() {
    const {currentUser} = useSelector(state => state.user)
  return (
   currentUser && currentUser?.role === "user" ? <Outlet />: <Navigate to='/' /> 
  )
}

export default UserRoute

