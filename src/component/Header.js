import { Link } from "react-router-dom";

export default function Header(){
    return(
        <div className="Header">
            <h1>
                <Link to="/">English Dictionary</Link>
            </h1>
            <div className="menu">
                <Link to="/create_word" className="link">
                    Add a word
                </Link>
                <Link to="/create_day" className="link">
                    Add a Day
                </Link>
            </div>
        </div>
    );
}