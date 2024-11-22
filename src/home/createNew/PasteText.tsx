import { IoMdClose } from 'react-icons/io';

type Props = {
    setModal: (state: 'none' | 'create' | 'paste' | 'generate' | 'import') => void;
  };

const PasteTextModal = ( {setModal}: Props) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="w-full max-w-2xl bg-white rounded-lg p-8 relative">
      <button 
        onClick={ ()=> setModal('none') }
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <IoMdClose className="w-6 h-6" />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Paste in text</h2>
        <p className="text-sm text-gray-600 mt-1">
          Add the notes, outline or content you'd like to use
        </p>
      </div>

      <div className="w-full">
        <textarea
          className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Type or Paste in content here..."
        />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <button 
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
          onClick={() => {
          }}
        >
          Continue
        </button>
      </div>
    </div>
    </div>
  );
};

export default PasteTextModal;