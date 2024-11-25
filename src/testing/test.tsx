import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

	const location = useLocation();
	const [prompt, setPrompt] = useState(location.state?.prompt || "");
	const [cards, setCards] = useState(location.state?.cards || 5);

	const [responseData, setresponseData] = useState<SlideData | null>(null);

	const [loading, setLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
  
	const loadingTexts = [
		"Analyzing your prompt...",
		"Understanding key themes...",
		"Extracting main concepts...",
		"Crafting slide content...",
		"Organizing information...",
		"Structuring presentation flow...",
		"Generating compelling headlines...",
		"Creating data visualizations...",
		"Optimizing slide layouts...",
		"Refining content hierarchy...",
		"Adding visual elements...",
		"Polishing presentation style...",
		"Ensuring data accuracy...",
		"Finalizing transitions...",
		"Almost ready..."
	  ];

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (loading) {
		  let index = 0;
		  interval = setInterval(() => {
			setLoadingText(loadingTexts[index % loadingTexts.length]);
			index++;
		  }, 2500);
		}
		return () => clearInterval(interval);
	  }, [loading]);

	  useEffect(() => {
		if (prompt) {
		  sendPrompt();
		}
	  }, [location.state?.prompt]);
	
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
  // Add more slides as needed with any format
}`;


	const sendPrompt = async () => {
		setLoading(true);
		console.log(prompt);
	
		const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
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
						content: 'Whatever the prompt, you will generate presentation data with specific length constraints. if any offensive word like "po*n", "ni*ga" is used as prompt, give response with the alternative of that word in positivity with specified format',
					},
					{ role: "user", content: prompt },
				],
			});

			if (completion.choices[0].message.content) {
				console.log(completion.choices[0].message.content);
                const parsedData = JSON.parse(completion.choices[0].message.content);
                console.log(parsedData);
                
                setresponseData(parsedData);
              }
		} catch (error) {
			console.error("Error:", error);
			alert("Error processing response. Please try again Or use Another prompt.");
		}
		finally{
			setLoading(false);
		}
	};

	return (
		<div className=" flex flex-col">



{loading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-zinc-700 animate-pulse">{loadingText}</p>
        </div>
      ) : (
        responseData && (
          <>
            <Card1 title={responseData.slide1.title} description={responseData.slide1.subtitle}/>
            <Card2 title={responseData.slide2.title} data={responseData.slide2.data} />
            <Card3 title={responseData.slide3.title} subtitle={responseData.slide3.subtitle} data={responseData.slide3.data}/>
            <Card4 title={responseData.slide4.title} subtitle={responseData.slide4.subtitle} data={responseData.slide4.data} />
            <Card5 title={responseData.slide5.title} data={responseData.slide5.data} />
          </>
        )
      )}





			{/* {responseData && (
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
				//	<Card6 data={responseData.slide6.data} /> 
				</>
			)}
 */}

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