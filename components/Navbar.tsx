export const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 sm:p-6 md:flex md:justify-between md:items-center">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-2xl font-bold">
                    IBroker
                </a>
                <div className="hidden md:flex">
                    <a>MQTT Websocket Client</a>
                </div>
            </div>
        </nav>
    )
}