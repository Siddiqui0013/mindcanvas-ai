import fetch from 'node-fetch'
import fs from 'node:fs'

const engineId = 'stable-diffusion-v1-6'
const apiHost = 'https://api.stability.ai'
const apiKey = "sk-CyyJjNbQMPLxrXyF46lPqTPUtTjOT9s7TSpgXgr86a1Rs0iC"

if (!apiKey) throw new Error('Missing Stability API key.')

const response = await fetch(
  `${apiHost}/v1/generation/${engineId}/text-to-image`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: 'A lighthouse on a cliff',
        },
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      steps: 30,
      samples: 1,
    }),
  }
)

if (!response.ok) {
  throw new Error(`Non-200 response: ${await response.text()}`)
}

interface GenerationResponse {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: string
  }>
}

const responseJSON = (await response.json()) as GenerationResponse

responseJSON.artifacts.forEach((image, index) => {
  fs.writeFileSync(
    `./out/v1_txt2img_${index}.png`,
    Buffer.from(image.base64, 'base64')
  )
})










// class StableDiffusionAPI {
//     constructor(apiKey) {
//         this.apiKey = "apiKey";
//         this.baseUrl = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
//     }

//     /**
//      * Generate an image from a text prompt
//      * @param {Object} params - Generation parameters
//      * @param {string} params.prompt - Main prompt describing the desired image
//      * @param {string} [params.negativePrompt] - Things to avoid in the image
//      * @param {number} [params.width=512] - Image width in pixels
//      * @param {number} [params.height=512] - Image height in pixels
//      * @param {number} [params.steps=50] - Number of inference steps
//      * @param {number} [params.guidanceScale=7.5] - How closely to follow the prompt
//      * @param {number} [params.samples=1] - Number of images to generate
//      * @returns {Promise<Blob[]>} Array of image blobs
//      */
//     async generateImage({
//         prompt,
//         negativePrompt = null,
//         width = 512,
//         height = 512,
//         steps = 50,
//         guidanceScale = 7.5,
//         samples = 1
//     }) {
//         const textPrompts = [
//             {
//                 text: prompt,
//                 weight: 1.0
//             }
//         ];

//         if (negativePrompt) {
//             textPrompts.push({
//                 text: negativePrompt,
//                 weight: -1.0
//             });
//         }

//         const requestBody = {
//             text_prompts: textPrompts,
//             cfg_scale: guidanceScale,
//             height,
//             width,
//             samples,
//             steps
//         };

//         try {
//             const response = await fetch(this.baseUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': `Bearer ${this.apiKey}`
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
            
//             // Convert base64 images to Blobs
//             const images = await Promise.all(
//                 data.artifacts.map(async (artifact) => {
//                     const base64Data = artifact.base64;
//                     const binaryString = atob(base64Data);
//                     const bytes = new Uint8Array(binaryString.length);
                    
//                     for (let i = 0; i < binaryString.length; i++) {
//                         bytes[i] = binaryString.charCodeAt(i);
//                     }
                    
//                     return new Blob([bytes], { type: 'image/png' });
//                 })
//             );

//             return images;
//         } catch (error) {
//             console.error('Error generating image:', error);
//             throw error;
//         }
//     }

//     /**
//      * Save a generated image blob to file (Browser environment)
//      * @param {Blob} imageBlob - The image blob to save
//      * @param {string} fileName - Name for the saved file
//      */
//     saveImage(imageBlob, fileName) {
//         const url = window.URL.createObjectURL(imageBlob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = fileName || 'generated-image.png';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//     }
// }

// // Usage example
// async function generateAndSaveImage() {
//     const generator = new StableDiffusionAPI("sk-CyyJjNbQMPLxrXyF46lPqTPUtTjOT9s7TSpgXgr86a1Rs0iC");
    
//     try {
//         const images = await generator.generateImage({
//             prompt: 'A serene lake surrounded by mountains at sunset, photorealistic style',
//             negativePrompt: 'blurry, low quality, distorted',
//             width: 1024,
//             height: 1024,
//             samples: 1
//         });
        
//         // Save the first generated image
//         generator.saveImage(images[0], 'generated-image.png');
//     } catch (error) {
//         console.error('Failed to generate image:', error);
//     }
// }

// generateAndSaveImage();







// import axios from "axios";
// const API_KEY = "sk-CyyJjNbQMPLxrXyF46lPqTPUtTjOT9s7TSpgXgr86a1Rs0iC";
// const API_URL = "https://api.provider.com/v1/generate"; // Replace with your provider's URL

// const data = {
//   prompt: "A fantasy landscape with floating islands and waterfalls",
//   width: 512,
//   height: 512,
//   num_inference_steps: 50,
//   guidance_scale: 7.5,
// };

// async function generateImage() {
//   try {
//     const response = await axios.post(API_URL, data, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     });

//     const imageUrl = response.data.output[0];
//     console.log("Image URL:", imageUrl);

//     // Optionally display the image in a browser console
//     console.log(`View the image here: ${imageUrl}`);
//   } catch (error) {
//     console.error("Error generating image:", error.message);
//   }
// }

// console.clear()
// generateImage()
