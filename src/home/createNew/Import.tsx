import { IoMdClose } from 'react-icons/io';
import { TbCloudUpload } from "react-icons/tb";

type Props = {
    setModal: (state: 'none' | 'create' | 'paste' | 'generate' | 'import') => void;
  };

  const ImportFileModal = ({ setModal }: Props) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="w-full max-w-2xl bg-white rounded-lg p-8 relative">
          <button 
            onClick={() => setModal('none')}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
   
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Import with AI</h2>
            <p className="text-sm text-gray-600 mt-1">
              Select the file you'd like to transform
            </p>
          </div>
   
          <div className="flex justify-center items-center">
            <button className="p-6 border border-orange-200 rounded-lg hover:border-orange-500 flex flex-col items-center">
              <div className="text-orange-500 mb-4">
              </div>
              <TbCloudUpload className="w-16 h-16 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Upload a file</span>
              <span className="text-xs text-gray-500 text-center">
                1. Drag and drop file<br/>
                2. Browse your files
              </span>
            </button>
          </div>
        </div>
      </div>
    );
   };

   export default ImportFileModal;