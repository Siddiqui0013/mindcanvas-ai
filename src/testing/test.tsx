import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import OpenAI from "openai"

export default function Test() {
	
  type SlideData = {
    [key: `slide${number}`]: {
      title: string
      subtitle?: string
      data?: any[]
      quote?: string
      steps?: any[]
      closing?: string
    };
  };

  const SlideRenderer: React.FC<{ slideNumber: number; slideData: any }> = ({ slideNumber, slideData }) => {
    const slideComponents = {
      1: (data: any) => <Card1 title={data.title} subtitle={data.subtitle} />,
      2: (data: any) => <Card2 title={data.title} data={data.data} />,
      3: (data: any) => <Card3 title={data.title} subtitle={data.subtitle} data={data.data} />,
      4: (data: any) => <Card4 title={data.title} subtitle={data.subtitle} data={data.data} />,
      5: (data: any) => <Card5 title={data.title} data={data.data} />,
      6: (data: any) => <Card6 title={data.title} quote={data.quote} />,
      7: (data: any) => <Card7 title={data.title} data={data.data} />,
      8: (data: any) => <Card8 title={data.title} subtitle={data.subtitle} />,
      9: (data: any) => <Card9 title={data.title} data={data.data} />,
      10: (data: any) => <Card10 title={data.title} steps={data.steps} />,
      11: (data: any) => <Card11 title={data.title} data={data.data} />,
      12: (data: any) => <Card12 title={data.title} closing={data.closing} />
    };
  
    const Component = slideComponents[slideNumber as keyof typeof slideComponents]
    return Component ? Component(slideData) : null
  }

  const PresentationRenderer: React.FC<{loading: boolean; loadingText: string; responseData: SlideData | null;}> = ({ loading, loadingText, responseData }) => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-zinc-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-zinc-700 animate-pulse">
            {loadingText}
          </p>
        </div>
      )
    }
  
    if (!responseData) {
      return null
    }
 const slideNumbers = Object.keys(responseData)
 .filter(key => key.startsWith('slide'))
 .map(key => parseInt(key.replace('slide', '')))
 .sort((a, b) => a - b);

return (
 <>
   {slideNumbers.map((slideNumber) => (
     <SlideRenderer
       key={slideNumber}
       slideNumber={slideNumber}
       slideData={responseData[`slide${slideNumber}`]}
     />
   ))}
 </>
)
}

	const location = useLocation();
	const prompt = location.state?.prompt || ""
	const cards = location.state?.cards || 5

	const [responseData, setresponseData] = useState<SlideData | null>(null)

	const [loading, setLoading] = useState(false)
	const [loadingText, setLoadingText] = useState("")

  const loadingTexts = [
    "Initializing presentation process...",
    "Analyzing your prompt...",
    "Identifying key themes and ideas...",
    "Extracting main concepts...",
    "Organizing information...",
    "Crafting slide content...",
    "Designing slide layout...",
    "Creating slide titles...",
    "Selecting relevant images and visuals...",
    "Generating supporting data visualizations...",
    "Building presentation structure...",
    "Optimizing slide transitions...",
    "Refining content hierarchy...",
    "Polishing visual elements...",
    "Ensuring content consistency...",
    "Reviewing slide designs...",
    "Adjusting font styles and sizes...",
    "Finalizing color schemes...",
    "Aligning content for perfect spacing...",
    "Your presentation is almost ready!"
]

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (loading) {
			let index = 0
			interval = setInterval(() => {
				setLoadingText(loadingTexts[index % loadingTexts.length])
				index++
			}, 2500)
		}
		return () => {
			clearInterval(interval)
		};
	}, [loading])

	const sendPromptCalled = useRef(false)

	useEffect(() => {
		if (prompt && !sendPromptCalled.current) {
			sendPrompt()
			sendPromptCalled.current = true
		}
	}, [prompt])

const systemPrompt = `Generate a presentation with a total of ${cards} slides. Generate any slide from one of the twelves format making the 1st slide the same and last slide conclusion (slide 8) and pick others randomly according to the need (For example to generate 5 slides, pick 4 random slides not in a sequence). Use the following JSON format for each slide, ensuring the specified structure and content requirements are followed, whether the prompt is a single word or a paragraph, you will understand the idea or feelings and you will always give repsonse in specified JSON format:
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
  "slide6": {
    "title": "string (3-5 words)",
    "quote": "string (inspirational quote, 10-30 words)"
  },
  "slide7": {
    "title": "string (2-3 words)",
    "data": [
      // 5 entries
      {
        "metric": "string (2-4 words)",
        "score": "string (number between 50-100)"
      }
    ]
  },
  "slide8": {
    "title": "string (2-4 words)",
    "subtitle": "string (25-35 words, summary of points)"
  },
  "slide9": {
    "title": "string (2-3 words)",
    "data": [
      // 4 entries
      {
        "type": "string (1-2 words)",
        "impact": "string (10-15 words)"
      }
    ]
  },
  "slide10": {
    "title": "string (3-5 words)",
    "steps": [
      // 4 steps
      {
        "step": "string (Step 1, Step 2, etc.)",
        "action": "string (10-15 words, describing the action)"
      }
    ]
  },
  "slide11": {
    "title": "string (2-4 words)",
    "data": [
      // 3 entries
      {
        "feature": "string (2-3 words)",
        "benefit": "string (10-15 words)"
      }
    ]
  }
}

Make sure all slides include creative, well-formatted content, and the total number of slides matches {cards}. Add more slides in the above format if {cards} exceeds 12.
`

const sendPrompt = async () => {
		setLoading(true)

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
						content:
							'Whatever the prompt, you will generate presentation data with specific length constraints. if any offensive word like "po*n", "ni*ga" is used as prompt, give response with the alternative of that word in positivity with specified format. make sure to give proper json format that can be',
					},
					{ role: "user", content: prompt },
				],
			})

			if (completion.choices[0].message.content) {
				console.log(completion.choices[0].message.content)
				const parsedData = JSON.parse(completion.choices[0].message.content)
				if (parsedData && !loading) {
					setresponseData(parsedData)
				}
				console.log(responseData)
			}
		} catch (error) {
			console.error("Error:", error)
			alert(
				"Error processing response. Please try again Or use Another prompt."
			);
		} finally {
			setLoading(false)
		}
	};

	return (
		<div className=" flex flex-col">
          <PresentationRenderer
          loading={loading}
          loadingText={loadingText}
          responseData={responseData}
        />

		</div>
	);
}

interface BaseSlide {
	title: string;
  }
  
  interface Slide1 extends BaseSlide {
	subtitle: string;
  }
  
  interface Slide2Entry {
	number: string;
	title: string;
	description: string;
  }
  
  interface Slide2 extends BaseSlide {
	data: Slide2Entry[];
  }

  interface Slide3Entry {
	title: string;
	value: string;
	description: string;
  }
  
  interface Slide3 extends BaseSlide {
	subtitle: string;
	data: Slide3Entry[];
  }

  interface Slide4Entry {
	title: string;
	description: string;
  }
  
  interface Slide4 extends BaseSlide {
	subtitle: string;
	data: Slide4Entry[];
  }

  interface Slide5Entry {
	category: string;
	practice: string;
	study: string;
  }
  
  interface Slide5 extends BaseSlide {
	data: Slide5Entry[];
  }

  interface Slide6 extends BaseSlide {
	quote: string;
  }
  
  interface Slide7Entry {
	metric: string;
	score: string;
  }
  
  interface Slide7 extends BaseSlide {
	data: Slide7Entry[];
  }
  
  interface Slide8 extends BaseSlide {
	subtitle: string;
  }
  
  interface Slide9Entry {
	type: string;
	impact: string;
  }
  
  interface Slide9 extends BaseSlide {
	data: Slide9Entry[];
  }
  
  interface Slide10Entry {
	step: string;
	action: string;
  }
  
  interface Slide10 extends BaseSlide {
	steps: Slide10Entry[];
  }
  
  interface Slide11Entry {
	feature: string;
	benefit: string;
  }
  
  interface Slide11 extends BaseSlide {
	data: Slide11Entry[];
  }
  
  interface Slide12 extends BaseSlide {
	closing: string;
  }
  


const Card1: React.FC<Slide1> = ({ title, subtitle }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-800 mb-6">
            {title}
          </h1>
          <p className="text-lg text-zinc-700">{subtitle}</p>
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
}

const Card2: React.FC<Slide2> = ({ title, data }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <img
            src="/api/placeholder/1200/400"
            alt="People using mobile devices"
            className="w-full rounded-lg object-cover mb-8"
          />
          <h2 className="text-3xl font-serif text-zinc-800">{title}</h2>
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
}

const Card3: React.FC<Slide3> = ({ title, subtitle, data }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-zinc-800 mb-4">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
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
}

const Card4: React.FC<Slide4> = ({ title, subtitle, data }) => {
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
            <h2 className="text-3xl font-serif text-zinc-800 mb-4">{title}</h2>
            <p className="text-gray-600 mb-8">{subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.map((feature, index) => (
                <div key={index} className="flex flex-col gap-2">
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
}

const Card5: React.FC<Slide5> = ({ title, data }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-serif text-zinc-800 mb-6">{title}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-sm">
            <thead>
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
                <tr key={index}>
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
}

const Card6: React.FC<Slide6> = ({ title, quote }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-zinc-800 mb-8">{title}</h2>
          <blockquote className="text-2xl font-serif text-gray-700 italic mb-6">
            "{quote}"
          </blockquote>
        </div>
      </div>
    </div>
  );
}

const Card7: React.FC<Slide7> = ({ title, data }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-serif text-zinc-800 mb-12 text-center">{title}</h2>
        <div className="flex justify-around flex-wrap items-center gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white min-w-56 rounded-lg p-6 shadow-sm text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-3">
                {item.score}
              </div>
              <div className="text-sm font-medium text-zinc-800">
                {item.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card8: React.FC<Slide8> = ({ title, subtitle }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img
              src="/api/placeholder/600/400"
              alt="Summary illustration"
              className="rounded-lg w-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif text-zinc-800 mb-6">{title}</h2>
            <p className="text-lg text-zinc-700 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card9: React.FC<Slide9> = ({ title, data }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-serif text-zinc-800 mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 rounded-full p-3">
                  <div className="w-8 h-8 flex items-center justify-center text-yellow-600 font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-zinc-800 mb-2">
                    {item.type}
                  </h3>
                  <p className="text-zinc-600">
                    {item.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card10: React.FC<Slide10> = ({ title, steps }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-serif text-zinc-800 mb-12 text-center">{title}</h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">{index + 1}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm flex-grow">
                <h3 className="text-lg font-medium text-zinc-800 mb-2">
                  {item.step}
                </h3>
                <p className="text-zinc-600">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card11: React.FC<Slide11> = ({ title, data }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-serif text-zinc-800 mb-12 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-yellow-600 text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-medium text-zinc-800 mb-2">
                  {item.feature}
                </h3>
              </div>
              <p className="text-zinc-600">
                {item.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card12: React.FC<Slide12> = ({ title, closing }) => {
  return (
    <div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-zinc-800 mb-8">{title}</h2>
          <p className="text-xl text-zinc-700 leading-relaxed mb-8">
            {closing}
          </p>
          <div className="inline-flex gap-4">
            <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
              Get Started
            </button>
            <button className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-medium border-2 border-yellow-600 hover:bg-yellow-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// interface card1props {
// 	title: string;
// 	description: string;
// }

// interface Card2n5Dataprops {
// 	title: string;
// 	data: any[];
// }

// interface Card3n4Dataprops {
// 	title: string;
// 	subtitle: string;
// 	data: any[];
// }

// const Card1 = ({ title, description }: card1props) => {
// 	return (
// 		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
// 			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between">
// 				<div className="max-w-2xl">
// 					<h1 className="text-4xl md:text-5xl font-serif text-zinc-800 mb-6">
// 						{title}
// 					</h1>
// 					<p className="text-lg text-zinc-700">{description}</p>
// 				</div>

// 				<div className="mt-8 md:mt-0 md:ml-8">
// 					<img
// 						src="/api/placeholder/600/800"
// 						alt="Woman smiling while using mobile phone"
// 						className="rounded-lg w-full max-w-md"
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const Card2 = ({ data, title }: Card2n5Dataprops) => {
// 	return (
// 		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
// 			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// 				<div className="mb-12">
// 					<img
// 						src="/api/placeholder/1200/400"
// 						alt="People using mobile devices"
// 						className="w-full rounded-lg object-cover mb-8"
// 					/>
// 					<h2 className="text-3xl font-serif text-zinc-800">{title}</h2>
// 				</div>
// 				<div className="grid md:grid-cols-3 gap-6">
// 					{data.map((feature) => (
// 						<div className="" key={feature.number}>
// 							<div className="pb-2">
// 								<div className="flex items-center gap-4">
// 									<span className="bg-neutral-200 w-8 h-8 rounded flex items-center justify-center font-medium">
// 										{feature.number}
// 									</span>
// 									<h3 className="text-xl font-serif text-zinc-800">
// 										{feature.title}
// 									</h3>
// 								</div>
// 							</div>
// 							<div className="text-zinc-600">{feature.description}</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const Card3 = ({ data, title, subtitle }: Card3n4Dataprops) => {
// 	return (
// 		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
// 			<div className="max-w-7xl mx-auto p-6">
// 				<div className="text-center mb-12">
// 					<h2 className="text-3xl font-serif text-zinc-800 mb-4">{title}</h2>
// 					<p className="text-gray-600">{subtitle}</p>
// 				</div>
// 				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// 					{data.map((feature, index) => (
// 						<div
// 							key={index}
// 							className="text-center p-6 rounded-lg bg-white shadow-sm"
// 						>
// 							<div className="text-4xl font-bold text-yellow-600 mb-2">
// 								{feature.value}
// 							</div>
// 							<h3 className="text-lg font-medium text-zinc-800 mb-1">
// 								{feature.title}
// 							</h3>
// 							<p className="text-sm text-gray-600">{feature.description}</p>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const Card4 = ({ data, title, subtitle }: Card3n4Dataprops) => {
// 	return (
// 		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
// 			<div className="max-w-7xl mx-auto p-6 rounded-lg shadow-sm">
// 				<div className="flex flex-col md:flex-row gap-8">
// 					<div className="md:w-1/2">
// 						<img
// 							src="/api/placeholder/600/400"
// 							alt="Financial charts"
// 							className="w-full rounded-lg object-cover"
// 						/>
// 					</div>

// 					<div className="md:w-1/2">
// 						<h2 className="text-3xl font-serif text-zinc-800 mb-4">{title}</h2>
// 						<p className="text-gray-600 mb-8">{subtitle}</p>

// 						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// 							{data.map((feature, index) => (
// 								<div key={index} className="flex flex-col gap-2">
// 									<i className={feature.iconClass} />
// 									<h3 className="text-lg font-medium text-zinc-800">
// 										{feature.title}
// 									</h3>
// 									<p className="text-gray-600 text-sm">{feature.description}</p>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const Card5 = ({ data, title }: Card2n5Dataprops) => {
// 	return (
// 		<div className="bg-rose-50 m-4 rounded-2xl overflow-hidden">
// 			<div className="max-w-7xl mx-auto p-6">
// 				<h2 className="text-3xl font-serif text-zinc-800 mb-6">{title}</h2>
// 				<div className="overflow-x-auto">
// 					<table className="w-full border-collapse  rounded-lg shadow-sm">
// 						<thead className="">
// 							<tr>
// 								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
// 									Category
// 								</th>
// 								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
// 									Best Practice
// 								</th>
// 								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
// 									Case Study
// 								</th>
// 							</tr>
// 						</thead>
// 						<tbody className="divide-y divide-gray-200">
// 							{data.map((row, index) => (
// 								<tr key={index} className="">
// 									<td className="px-6 py-4 text-sm text-gray-700">
// 										{row.category}
// 									</td>
// 									<td className="px-6 py-4 text-sm text-gray-700">
// 										{row.practice}
// 									</td>
// 									<td className="px-6 py-4 text-sm text-gray-700">
// 										{row.study}
// 									</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

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
