import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav>
        <Link to="/" className=''>ExerTracker</Link>
        
        <div>
            <li>
                <Link to="/" className=''>Exersices</Link>
            </li>

            <li>
                <Link to="/create" className=''>Create Exersices Log</Link>
            </li>

            <li>
                <Link to="/user" className=''>Create User</Link>
            </li>
        </div>
    </nav>
  )
}

export default Navbar 