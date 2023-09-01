import { useState } from 'react';
import '../css/navbar.css';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

  return (

    <div className="navbar-container">
      <div className="desktop-main">
        <ul>
          <li>Home</li>
          <li>Il mio profilo</li>
          <li>La mia ROBA</li>
          <li>I miei scambi</li>
          <li>Il mio punteggio</li>
          <li>Assistenza</li>
        </ul>
      </div>

      <div className="mobile-main">

        <div className={menuOpen ? 'closed-menu hidden' : 'closed-menu'} onClick={handleOpenMenu}>
          <div className="line-icon"></div>
          <div className="line-icon"></div>
          <div className="line-icon"></div>
        </div>

        <div className={menuOpen ? 'opened-menu' : 'opened-menu hidden'} onClick={handleOpenMenu}>
          <div className="close-up">
            <div className="angled-line-icon-1"></div>
            <div className="angled-line-icon-2"></div>
          </div>
          <ul>
            <li>Home</li>
            <li>Il mio profilo?</li>
            <li>La mia ROBA</li>
            <li>I miei scambi</li>
            <li>Il mio punteggio</li>
            <li>Assistenza</li>
          </ul>
        </div>

      </div>
    </div>
    )
}

export default Navbar;