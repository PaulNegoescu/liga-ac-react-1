import { useComunicationContext } from './Parent';

export function Child({ value, onNotifyParent, onNotifySibling }) {
  const { state, setState } = useComunicationContext();
  return (
    <>
      <h1>Child</h1>
      From parent: {value}
      <br />
      From Context: {state}
      <button
        onClick={() => {
          onNotifyParent(42);
          setState('From child');
        }}
      >
        Send 42 to parent
      </button>
      <button onClick={() => onNotifySibling('Mike')}>
        Send Mike to sibling
      </button>
    </>
  );
}
