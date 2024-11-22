import { useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
	setModal: (
		state: "none" | "create" | "paste" | "generate" | "import"
	) => void;
};

const prompts: string[] = [
    "Content creator collaboration strategies and workflows",
    "Modern web development best practices and architecture",
    "Data science productivity tools and techniques",
    "Evolution of digital art: From MS Paint to AI generation",
    "Building engaging social media presence for brands",
    "Mobile app development patterns and anti-patterns",
    "React ecosystem: From basics to advanced patterns",
    "Mindfulness and meditation for better sleep",
    "Pet care guide: Understanding different animals",
    "Sustainable design principles for digital products",
    "Machine learning fundamentals for beginners",
    "Remote team management and communication",
    "Cryptocurrency and blockchain explained simply",
    "User experience design principles and methods",
    "Personal finance management for freelancers"
];

const GenerateModal = ({ setModal }: Props) => {
	const [selectedMod, setSelectedMod] = useState<string | null>(null);
	const [prompt, setPrompt] = useState("");
    const [cards, setCards] = useState(4)

    // const randomPrompts = () => {
    //     const randomPrompts = [...prompts].sort(() => Math.random() - 0.5 ).slice(0, 6);
    //     return randomPrompts;
    // }

    // const promptsArray = randomPrompts()

    const randomPrompts = useMemo(()=>{
        return [...prompts].sort(() => Math.random() - 0.5 ).slice(0, 6)
    },[])

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
			<div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
				<button
					onClick={() => setModal("none")}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
				>
					<IoMdClose className="w-6 h-6" />
				</button>

				<div className="text-center mb-4">
					<h2 className="text-xl font-semibold text-gray-800">Generate</h2>
					<p className="text-sm text-gray-600 mt-1">
						What would you like to create today?
					</p>
				</div>

				<div className="flex gap-4 justify-center mb-6">
					<button
						className={`px-6 py-2 ${
							selectedMod === "presentation" &&
							"bg-primary text-white rounded-full"
						} border-gray-200 border rounded-full`}
						onClick={() => setSelectedMod("presentation")}
					>
						Presentation
					</button>
					<button
						className={`px-6 py-2 ${
							selectedMod === "document" && "bg-primary text-white rounded-full"
						} border border-gray-200 rounded-full`}
						onClick={() => setSelectedMod("document")}
					>
						Document
					</button>
				</div>

				<div className="flex gap-4 mb-4">
					<select className="px-4 py-2 border rounded"
                    value={cards}
                    onChange={(e) => setCards(parseInt(e.target.value))}
                    >
						<option value={4}>4 cards</option>
                        <option value={5}>5 cards</option>
                        <option value={6}>6 cards</option>
                        <option value={7}>7 cards</option>
                        <option value={8}>8 cards</option>
					</select>
				</div>

				<input
                    type="text"
					onChange={(e) => setPrompt(e.target.value)}
					value={prompt}
					className="w-full h-12 p-4 border rounded-lg mb-4"
					placeholder="Describe what you'd like to make"
				/>

                <button className="w-full h-12 mb-2 bg-primary text-white rounded-lg">Generate</button>

				<div className="text-md text-gray-500">Example prompts</div>

				<div className="grid grid-cols-3 mt-4 gap-4">

                    {randomPrompts.map((prompt, index) => (
                        <div key={index} className="border cursor-grab border-primary/50 rounded p-2 flex gap-4 items-center justify-center"
                        onClick={() => setPrompt(prompt)}
                        >
                        <p className="text-sm">
                            {prompt}
                        </p>
                    </div>
                    ))}

				</div>
			</div>
		</div>
	);
};

export default GenerateModal;
