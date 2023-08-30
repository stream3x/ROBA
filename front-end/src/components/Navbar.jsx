import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav id='menu'>
      <input type='checkbox' id='responsive-menu' onclick='updatemenu()' /><label></label>
      <ul>
        <li><a href='http://'>Home</a></li>
        <li><a href='http://'>Il mio profilo</a></li>
        <li><a href='http://'>La mia ROBA</a></li>
        <li><a href='http://'>I miei scambi</a></li>
        <li><a href='http://'>Il mio punteggio</a></li>
        <li><a href='http://'>Assistenza</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;
