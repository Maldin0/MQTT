import { ThemeToggleButton } from "./ThemeToggleButton"

export const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 sm:p-6 md:flex md:justify-between md:items-center">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-white ">
                    IBroker
                </a>
                <div className="hidden md:flex ml-auto mr-10 text-white">
                    <a>MQTT Websocket Client</a>
                </div>
                <ThemeToggleButton />
            </div>
        </nav>
    )
}