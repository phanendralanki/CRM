import { useSelector } from "react-redux";
import { Outlet ,Navigate} from "react-router-dom";

function AdminRoute() {
    const {currentUser} = useSelector(state => state.user)
  return (
    currentUser.role === "admin" ? <Outlet />: <Navigate to='/' /> 
  )
}

export default AdminRoute