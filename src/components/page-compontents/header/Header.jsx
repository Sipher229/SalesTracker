/* eslint-disable react/prop-types */
import Logo from "./Logo.jsx"

function UserProfile({name='Full Name', picture}){
  return (
    <>
      <div className="w-52 h-12 border rounded-xl flex justify-center items-center gap-2">
        <span className="text-white roboto-light">{name}</span>
        <img alt="profile picture" src="" />
        <ul className="w-24 h-16 bg-white ">
          <li className="hover:brightness-50 roboto-medium">Log Out</li>
          <li className="hover:brightness-50 roboto-medium">View Profile</li>
        </ul>
      </div>
    </>
  )
}

function Header() {
  return (
    <header className="w-screen h-14 bg-gradient-to-tr from-mygreen-750 via-mygreen-500 to-mygreen-300">
      <nav className="w-full h-full flex justify-between items-center px-7">
        <Logo />
        <UserProfile />
      </nav>
    </header>
  )
}

export default Header

//TODO: create header, add background
//TODO: create  profile and logo  component