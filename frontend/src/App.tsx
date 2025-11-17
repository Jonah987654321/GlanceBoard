import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

import { MantineProvider } from '@mantine/core';

export default function App() {
  return <MantineProvider>{
    <h1>Dashboard</h1>
  }</MantineProvider>;
}
