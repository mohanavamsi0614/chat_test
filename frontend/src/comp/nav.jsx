import {Link} from "react-router-dom"
function Nav() {
    return (
        <div className=" w-screen border-b-2 border-white flex justify-between">
        <Link to="/">Home</Link>
        <div>
        <Link to="/sign"><button>Sigin</button></Link>
        <Link to="/login"><button>Login</button></Link>
        </div>
        </div>
    )
}
export default Nav;