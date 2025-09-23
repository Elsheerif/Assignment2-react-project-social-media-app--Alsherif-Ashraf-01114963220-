import React, { useContext } from 'react'
import { Navbar as HeroUiNavbar, NavbarBrand , NavbarItem, Link, Button } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { CounterContext } from '../contexts/CounterContext';
import { authContext } from '../contexts/AuthContext';
import logo from '../assets/logo.png'

export default function Navbar() {
  const navigate = useNavigate();
  const { counter } = useContext(CounterContext)
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext)

  function handleSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <HeroUiNavbar>
      <NavbarBrand className='gap-1'>
        <img src={logo} className='w-10' alt="logo" />
        <p className="font-bold  text-[#BC62C2] text-2xl" >Echo{counter}</p>
      </NavbarBrand>

      {

        isLoggedIn ?

          <NavbarItem>
            <Button onPress={handleSignOut} as={Link} color="danger" href="#" variant="flat">
              Sign Out
            </Button>
          </NavbarItem>
          :
          <>

            <NavbarItem className="hidden lg:flex">
              <Button onPress={() => navigate('/login')} as={Link} color="default"  variant="flat">
                login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button onPress={() => navigate('/register')} as={Link} color="primary"  variant="flat">
                Sign Up
              </Button>
            </NavbarItem>



          </>

      }


    </HeroUiNavbar>
  )
}
