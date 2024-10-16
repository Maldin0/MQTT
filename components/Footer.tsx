export const Footer = () => {
    return (
        <>
            <div className="w-full h-32"></div>
            <footer className="bg-blue-600 text-white px-4 py-6 sm:p-4 flex w-full">
                <div className="container mx-auto flex flex-col gap-4 justify-start ">
                    <a href="/" className="text-2xl font-bold">
                        &lt;i&gt;Broker
                    </a>
                    <p>
                        ITKMITL MQTT Broker by Physical Computing TAs
                        <br />
                        Part of Physical Computing Final Examination
                    </p>
                </div>
            </footer>
        </>
    );
};
