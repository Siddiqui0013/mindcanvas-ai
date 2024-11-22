
import { TbFileText, TbPencil, TbDownload } from 'react-icons/tb';

type Props = {
  setModal: (state: 'none' | 'create' | 'paste' | 'generate' | 'import') => void;
};

export default function CreateNew( {setModal} : Props) {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="relative overlay">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
          <div className="box flex-col py-6 flex items-center justify-center">
          <h2 className="text-2xl font-semibold mb-2">Create With AI</h2>
          <p className="text-gray-600 mb-8">How would you like to get started?</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={
                () => {
                  setModal('paste')
                }
              }
            className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center">
              <TbFileText className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Past in text</span>
              <span className="text-sm text-gray-500">Submit blog post, an outline or anything else</span>
            </button>
            
            <button 
              onClick={() => {
                // setModal(false)
                setModal('generate')
              }
              }
            className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center">
              <TbPencil className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Generate</span>
              <span className="text-sm text-gray-500">Create from a one-line prompt or an idea</span>
            </button>
            
            <button
              onClick={() => {
                // setModal(false)
                setModal('import')
              }
              }
            className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center">
              <TbDownload className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Import file </span>
              <span className="text-sm text-gray-500">Enhance existing docs, import article </span>
            </button>
          </div>
          
        </div>
        <button 
            onClick={() => setModal("none")}
            className="absolute top-4 right-4 text-lg  hover:text-gray-700"
          >
            ✕
          </button>
    </div>
    </div>
  )
}
