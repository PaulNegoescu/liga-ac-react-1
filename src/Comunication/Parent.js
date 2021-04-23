import React, { useContext, useState } from 'react';
import { Child } from './Child';
import { Sibling } from './Sibling';

export function Parent() {
  const [parentState, setParentState] = useState(2);
  const [siblingState, setSiblingState] = useState('Paul');

  function onChildCom(info) {
    setParentState(info);
  }

  return (
    <>
      <h1>Parent</h1>
      <ComunicationContextProvider>
        <Child
          value={parentState}
          onNotifyParent={onChildCom}
          onNotifySibling={setSiblingState}
        />
        <Sibling info={siblingState} />
      </ComunicationContextProvider>
    </>
  );
}

const ComunicationContext = React.createContext();

export function ComunicationContextProvider({ children }) {
  const [state, setState] = useState('whatever');
  return (
    <ComunicationContext.Provider value={{ state, setState }}>
      {children}
    </ComunicationContext.Provider>
  );
}

export function useComunicationContext() {
  return useContext(ComunicationContext);
}
