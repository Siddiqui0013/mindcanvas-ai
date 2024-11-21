import { TbFileText, TbPencil, TbDownload } from 'react-icons/tb';


export default function CreateNew() {

  return (
    <div>
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
          <div className="box flex-col py-6 flex items-center justify-center">
          <h2 className="text-2xl font-semibold mb-2">Create With AI</h2>
          <p className="text-gray-600 mb-8">How would you like to get started?</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center">
              <TbFileText className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Past in text</span>
              <span className="text-sm text-gray-500">Submit blog post, an outline or anything else</span>
            </button>
            
            <button className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center">
              <TbPencil className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Generate</span>
              <span className="text-sm text-gray-500">Create from a one-line prompt or an idea</span>
            </button>
            
            <button className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center">
              <TbDownload className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Import file </span>
              <span className="text-sm text-gray-500">Enhance existing docs, import article </span>
            </button>
          </div>
          
        </div>
    </div>
  )
}
