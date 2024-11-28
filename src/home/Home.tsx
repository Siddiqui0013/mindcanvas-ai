import { useState } from 'react';

import Navbar from './Navbar';
import ProjectDashboard from './Dashboard';

export default function Home() {

  type ModalType = 'none' |'create' | 'paste' | 'generate' | 'import';
  const [currentModal, setcurrentModal] = useState< ModalType> ('none');

  return (
    <>
          <Navbar setModal={setcurrentModal}/>
          <div className="section flex w-full">
          <ProjectDashboard modal={currentModal} setModal={setcurrentModal}  />
          </div>    </>
  )
}
