import '../styles/Header.css'

const Header = () => {
    return(
        <>
            <div className="Header">
                <p>Chat App by <a href={"https://github.com/BerthetQuentin"} target="_blank" rel="noopener noreferrer">Quentin Berthet</a> using : </p>
                <ul>
                    <li>
                        <a href={"https://fr.react.dev/"} target="_blank" rel="noopener noreferrer">REACT</a>
                    </li>
                    <li>
                        <a href={"https://nodejs.org/fr"} target="_blank" rel="noopener noreferrer">NodeJS</a>
                    </li>
                    <li>
                        <a href={"https://socket.io/"} target="_blank" rel="noopener noreferrer">Socket.IO</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header;