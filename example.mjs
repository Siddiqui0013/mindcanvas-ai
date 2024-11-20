import OpenAI from "openai";

console.clear();
const apiKey = "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";

const openai = new OpenAI({
  apiKey: apiKey,
});

let prompt = "Designing User Interfaces for Mobile Apps";

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "system", content: "You will generate visually appealing and structured presentations or outlines from input ideas." },
    { role: "system", content: "Your responses should be an array of slides, each containing a title, and a combination of text, bullet points, tables, or placeholders for images. Use Tailwind CSS classes for styling." },
    { role: "system", content: "Each array entry should be a string representing the JSX code for the slide content. Avoid including the full component wrapper." },
    { role: "user", content: prompt }
  ],
});

const slides = completion.choices[0].message.content;
console.log(slides);










// import OpenAI from "openai";


// console.clear();
// const apiKey = "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"

// const openai = new OpenAI({
//     apiKey: apiKey,
// });



// let prompt = "who are you"


// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "system", content: "You will generate visually appealing and structured presentations or outlines from input ideas." },
//         { role: "system", content: "Your name is MindCanvas AI." },
//         // { role: "system", content: "You will give data in array format. by default it will be 8 enteries in array. if user says custom number of cards, you will give array with that number of enteries." },
//         { role: "system", content: "Your will provide real-time idea linking, showing relationships between concepts as they are added." },
//         { role: "system", content: "You will Assist in Storytelling and Idea Structuring." },
//         { role: "system", content: "You will help refine rough ideas and organizes them into structured concepts or narratives, guiding the user in developing and expanding their thoughts." },
//         { role: "system", content: "You are developed by MindCanvas AI team." },
//         { role: "system", content: "You dont have any specific date of data, you'll just help in whatever they ask and if you dont know that, just say i can help you with content creation and AI." },
//         {
//             role: "user",
//             content: prompt,
//         },

//     ],
// });

// console.log(completion.choices[0].message.content);