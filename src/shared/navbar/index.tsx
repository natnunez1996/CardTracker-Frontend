import "./navbar.css"


const Navbar = () => {

    return (
        <div className="navbar">
            <ul>
                <li><a href={"/home"}>Home</a></li>
                <li><a href="/newRecord">New Record</a></li>
                <li><a href="/newRecordItem">New Record Item</a></li>
            </ul>

        </div>
    )
}

export default Navbar