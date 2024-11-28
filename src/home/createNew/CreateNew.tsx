import { TbFileText, TbPencil, TbDownload } from 'react-icons/tb';

type Props = {
  setModal: (state: 'none' | 'create' | 'paste' | 'generate' | 'import') => void;
};

export default function CreateNew({ setModal }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-4 md:p-8">
          <div className="py-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Create With AI</h2>
            <p className="text-gray-600 mb-8">How would you like to get started?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setModal('paste')}
              className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center"
            >
              <TbFileText className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Paste in text</span>
              <span className="text-sm text-gray-500">Submit blog post, an outline or anything else</span>
            </button>

            <button
              onClick={() => setModal('generate')}
              className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center"
            >
              <TbPencil className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Generate</span>
              <span className="text-sm text-gray-500">Create from a one-line prompt or an idea</span>
            </button>

            <button
              onClick={() => setModal('import')}
              className="flex flex-col items-center p-6 border rounded-lg hover:border-orange-500 text-center"
            >
              <TbDownload className="w-12 h-12 text-orange-500 mb-4" />
              <span className="font-medium mb-2">Import file</span>
              <span className="text-sm text-gray-500">Enhance existing docs, import article</span>
            </button>
          </div>
        </div>

        <button
          onClick={() => setModal('none')}
          className="absolute top-4 right-4 text-lg hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}