import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='flex align-center justify-start bg-slate-800 text-white py-[15px] px-[10px]  top-0'>
        <Link to="/" className=''>ExerTracker</Link>
        
        <div className='flex-1 flex justify-around list-none '>
            <li className=''>
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