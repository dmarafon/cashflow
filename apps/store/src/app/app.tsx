// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommonUi } from '@cashflowweb/common-ui';
import NxWelcome from './nx-welcome';

export const App = () => {
  return (
    <>
      <NxWelcome title="store" />
      <CommonUi></CommonUi>
      <div />
    </>
  );
}

export default App;
