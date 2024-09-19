
import { Navbar } from "@/components/Navbar"
import { Connection } from "@/components/Connection"
import { Publish } from "@/components/Publish"
import { Subscriptions } from "@/components/Subscriptions"

export default function Home() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="sm:w-screen md:w-2/3 self-center">
				<Connection />
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2">
						<Publish />
					</div>
					<div className="col-span-1">
						<Subscriptions />
					</div>
				</div>
			</div>
		</div>
	)
}
