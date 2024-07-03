import { useSelector } from "react-redux";
import { Outlet ,Navigate} from "react-router-dom";

function DeveloperRoute() {
    const {currentUser} = useSelector(state => state.user)
  return (
   currentUser && currentUser?.role === "developer" ? <Outlet />: <Navigate to='/' /> 
  )
}

export default DeveloperRoute

