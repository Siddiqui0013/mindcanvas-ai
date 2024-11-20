import { useState } from "react";
import OpenAI from "openai";

export default function Test() {
	interface SlideData {
		slide1: { title: string; subtitle: string };
		slide2: {
            title: string;
			data: Array<{ number: number; title: string; description: string }>;
		};
		slide3: {
            title: string;
            subtitle: string;
			data: Array<{ title: string; value: string; description: string }>;
		};
		slide4: {
            title: string;
            subtitle: string;
			data: Array<{
				icon: string;
				iconClass: string;
				title: string;
				description: string;
			}>;
		};
		slide5: {
            title: string;
			data: Array<{ category: string; practice: string; study: string }>;
		};
	}

	const apiKey = "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";
	const [prompt, setPrompt] = useState("");
	const [responseData, setresponseData] = useState<SlideData | null>(null);

	const systemPrompt = `Generate presentation data with specific length constraints:
{
  "slide1": {
    "title": "string (4-8 words)",
    "subtitle": "string (20-40 words, describing main points)"
  },
  "slide2": {
    "title": "string (2-3 words)",
    "data": [
      // 3 entries
      {
        "number": "1-3",
        "title": "string (2-4 words)",
        "description": "string (15-25 words)"
      }
    ]
  },
  "slide3": {
    "title": "string (2-3 words)",
    "subtitle": "string (6-10 words, describing main points)",
    "data": [
      // 4 entries
      {
        "title": "string (1-2 words)",
        "value": "string (percentage between 80-99%)",
        "description": "string (2-4 words)"
      }
    ]
  },
  "slide4": {
    "title": "string (2-3 words)",
    "subtitle": "string (6-10 words, describing main points)",
    "data": [
      // 4 entries
      {
        "icon": "font-awesome-cdn-link",
        "iconClass": "choose from: shield-alt, chart-line, exclamation-triangle, coins",
        "title": "string (2-3 words)",
        "description": "string (5-10 words)"
      }
    ]
  },
  "slide5": {
    "title": "string (2-3 words)",
    "data": [
      // 3 entries
      {
        "category": "string (2-3 words)",
        "practice": "string (10-15 words)",
        "study": "string (company name)"
      }
    ]
  },
}`;

	const sendPrompt = async () => {
		console.log(prompt);

		try {
			const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
			const completion = await openai.chat.completions.create({
				model: "gpt-4",
				messages: [
					{
						role: "system",
						content: systemPrompt,
					},
					{
						role: "system",
						content: 'Whatever the prompt, you will generate presentation data with specific length constraints',
					},
					{ role: "user", content: prompt },
				],
			});

			if (completion.choices[0].message.content) {
                const parsedData = JSON.parse(completion.choices[0].message.content);
                console.log(parsedData);
                
                setresponseData(parsedData);
              }
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className=" flex flex-col">
			<div className="p-4 bg-gray-100">
				<div className="flex gap-4 max-w-xl mx-auto">
					<input
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						className="flex-1 p-2 border rounded"
						placeholder="Enter presentation topic..."
					/>
					<button
						onClick={sendPrompt}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Generate
					</button>
				</div>
			</div>

			{responseData && (
				<>
					<Card1
					title={responseData.slide1.title}
					description={responseData.slide1.subtitle}/>

					<Card2 
                    title = {responseData.slide2.title}
                    data={responseData.slide2.data} />

					<Card3 
                    title = {responseData.slide3.title}
                    subtitle = {responseData.slide3.subtitle}
                    data={responseData.slide3.data}/>

					<Card4 
                    title = {responseData.slide4.title}
                    subtitle = {responseData.slide4.subtitle}
                    data={responseData.slide4.data} />

					<Card5 
                    title= {responseData.slide5.title}
                    data={responseData.slide5.data} />
					{/* <Card6 data={responseData.slide6.data} /> */}
				</>
			)}
		</div>
	);
}
interface card1props {
	title: string;
	description: string;
}
const Card1 = ({ title, description }: card1props) => {
	return (
		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between">
				<div className="max-w-2xl">
					<h1 className="text-4xl md:text-5xl font-serif text-zinc-800 mb-6">
						{title}
					</h1>
					<p className="text-lg text-zinc-700">{description}</p>
				</div>

				<div className="mt-8 md:mt-0 md:ml-8">
					<img
						src="/api/placeholder/600/800"
						alt="Woman smiling while using mobile phone"
						className="rounded-lg w-full max-w-md"
					/>
				</div>
			</div>
		</div>
	);
};

interface Card2n5Dataprops {
    title: string;
	data: any[];
}

interface Card3n4Dataprops {
    title: string;
    subtitle: string;
	data: any[];
}


const Card2 = ({ data, title }: Card2n5Dataprops) => {
	return (
		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="mb-12">
					<img
						src="/api/placeholder/1200/400"
						alt="People using mobile devices"
						className="w-full rounded-lg object-cover mb-8"
					/>
					<h2 className="text-3xl font-serif text-zinc-800">
						{title}
					</h2>
				</div>
				<div className="grid md:grid-cols-3 gap-6">
					{data.map((feature) => (
						<div className="" key={feature.number}>
							<div className="pb-2">
								<div className="flex items-center gap-4">
									<span className="bg-neutral-200 w-8 h-8 rounded flex items-center justify-center font-medium">
										{feature.number}
									</span>
									<h3 className="text-xl font-serif text-zinc-800">
										{feature.title}
									</h3>
								</div>
							</div>
							<div className="text-zinc-600">{feature.description}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const Card3 = ({ data, title, subtitle }: Card3n4Dataprops) => {
	return (
		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
			<div className="max-w-7xl mx-auto p-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-serif text-zinc-800 mb-4">
                        {title}
					</h2>
					<p className="text-gray-600">
                        {subtitle}
					</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{data.map((feature, index) => (
						<div
							key={index}
							className="text-center p-6 rounded-lg bg-white shadow-sm"
						>
							<div className="text-4xl font-bold text-yellow-600 mb-2">
								{feature.value}
							</div>
							<h3 className="text-lg font-medium text-zinc-800 mb-1">
								{feature.title}
							</h3>
							<p className="text-sm text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const Card4 = ({ data, title, subtitle }: Card3n4Dataprops) => {
	return (
		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
			<div className="max-w-7xl mx-auto p-6 rounded-lg shadow-sm">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="md:w-1/2">
						<img
							src="/api/placeholder/600/400"
							alt="Financial charts"
							className="w-full rounded-lg object-cover"
						/>
					</div>

					<div className="md:w-1/2">
						<h2 className="text-3xl font-serif text-zinc-800 mb-4">
							{title}
						</h2>
						<p className="text-gray-600 mb-8">
							{subtitle}
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{data.map((feature, index) => (
								<div key={index} className="flex flex-col gap-2">
									<i className={feature.iconClass} />
									<h3 className="text-lg font-medium text-zinc-800">
										{feature.title}
									</h3>
									<p className="text-gray-600 text-sm">{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Card5 = ({ data, title }: Card2n5Dataprops) => {
	return (
		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
			<div className="max-w-7xl mx-auto p-6">
				<h2 className="text-3xl font-serif text-zinc-800 mb-6">
					{title}
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse  rounded-lg shadow-sm">
						<thead className="">
							<tr>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
									Category
								</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
									Best Practice
								</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
									Case Study
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{data.map((row, index) => (
								<tr key={index} className="">
									<td className="px-6 py-4 text-sm text-gray-700">
										{row.category}
									</td>
									<td className="px-6 py-4 text-sm text-gray-700">
										{row.practice}
									</td>
									<td className="px-6 py-4 text-sm text-gray-700">
										{row.study}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

// const Card6 = ( {data} : CardDataprops ) => {
//     return (
//       <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
//         <div className="max-w-7xl mx-auto p-6">
//           <h2 className="text-3xl font-serif text-zinc-800 mb-8">Project Timeline</h2>
//           <div className="space-y-6">
//             {data.map((item, index) => (
//               <div key={index} className="flex gap-6 items-start bg-white p-6 rounded-lg shadow-sm">
//                 <div className="w-24 shrink-0">
//                   <div className="text-yellow-600 font-medium">{item.phase}</div>
//                   <div className="text-sm text-gray-500">{item.duration}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
// };

// import { useState } from "react";
// import OpenAI from "openai";

// export default function Test() {
//     const apiKey = "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";
// const [prompt, setPrompt] = useState("");
//   const [slides, setSlides] = useState<string[]>([]);

//   const sendPrompt = async () => {
//     try {
//       const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

//       const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content: `You are a presentation generator. Create exactly 5 slides for the given topic. Return a JSON array of strings containing slide HTML. Each slide should have a different layout and content type (title+text, bullet points, table, image placeholders, etc). Use Tailwind CSS for styling.

// Format your response as a JSON array like this:
// [
//   "<div class=\"p-8 bg-gradient-to-r from-blue-500 to-purple-600\"><h1 class=\"text-4xl font-bold text-white mb-4\">Title</h1>...</div>",
//   "<div class=\"p-8\"><h2 class=\"text-2xl font-semibold mb-4\">Second Slide</h2><ul class=\"list-disc pl-6\">...</ul></div>"
// ]

// For images, use: <img src="/api/placeholder/600/400" alt="detailed description of what this image would show" class="...">
// For tables, use proper HTML table elements with Tailwind styling.
// Ensure all HTML attributes use double quotes, not single quotes.`
//           },
//           { role: "user", content: prompt }
//         ],
//       });

//       const response = completion.choices[0].message.content;

//       if (response) {
//         const parsedResponse = JSON.parse(response);
//         setSlides(parsedResponse);
//       }
//     } catch (error) {
//       console.error("Error processing response:", error);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="w-full py-3 flex items-center justify-center flex-col gap-4">
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="p-2 bg-black text-white w-full max-w-xl rounded"
//           placeholder="Enter your presentation topic..."
//         />
//         <button
//           onClick={sendPrompt}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Generate Presentation
//         </button>
//       </div>

//       <div className="mt-8 grid gap-8">
//         {slides.map((item, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: item }}
//             className="border rounded-xl shadow-lg overflow-hidden"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import OpenAI from "openai";

// export default function Test() {
//     const apiKey = "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";
// const [prompt, setPrompt] = useState("");
//   const [slides, setSlides] = useState<string[]>([]);

//   const sendPrompt = async () => {
//     try {
//       const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

//       const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//                           { role: "system", content: "You are a helpful assistant." },
//                           { role: "system", content: "You will generate visually appealing and structured presentations or outlines from input ideas." },
//                           { role: "system", content: `You are a presentation generator. Return only a JSON array of strings. Each string should be valid HTML with double quotes for attributes. Format: ["<div class=\"slide\">content</div>", "<div class=\"slide\">content</div>"]`},
//                           { role: "system", content: "Each array entry should be a string representing the JSX code for the slide content. Avoid including the full component wrapper." },
//                           { role: "user", content: prompt }
//                         ],
//       });

//       const response = completion.choices[0].message.content;

//       if (response) {
//         const parsedResponse = JSON.parse(response);
//         setSlides(parsedResponse);
//         console.log(parsedResponse);

//       }
//     } catch (error) {
//       console.error("Error processing response:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="w-full py-3 flex items-center justify-center flex-col gap-4">
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="p-2 bg-black text-white w-full max-w-xl rounded"
//           placeholder="Describe your presentation..."
//         />
//         <button
//           onClick={sendPrompt}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Generate
//         </button>
//       </div>

//       <div className="mt-8">
//         {slides.map((item, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: item }}
//             className="mb-8 border rounded-lg shadow-lg"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
