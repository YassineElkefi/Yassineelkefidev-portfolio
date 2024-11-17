import logo from '../assets/YassineELkefiLogo.png'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa6'
const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <img className='mx-2 w-16' src={logo} alt="logo"/>
        </div>
        <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
            <a href='https://www.linkedin.com/in/yassine-elkefi/' target='_blank'><FaLinkedin className='hover:text-blue-800'/></a>
            <a href='https://github.com/YassineElkefi' target='_blank'><FaGithub className='hover:text-gray-400'/></a>
            <a href='https://x.com/YassineElkefi' target='_blank'><FaSquareXTwitter className='hover:text-black'/></a>
            <a href="https://www.instagram.com/yassine_elkefi/" target='_blank'>
            <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href='http://discord.com/users/189012634056654849' target='_blank'><FaDiscord className='hover:text-gray-500'/></a>
        </div>
    </nav>
  )
}

export default Navbar
