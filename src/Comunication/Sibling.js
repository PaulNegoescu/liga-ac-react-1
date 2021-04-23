import { useComunicationContext } from './Parent';

export function Sibling({ info }) {
  const { state } = useComunicationContext();
  return (
    <h1>
      Sibling: {info}; From Context: {state}
    </h1>
  );
}
