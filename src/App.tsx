import "@mantine/core/styles.css";
import { MantineProvider, AppShell, AppShellMain } from "@mantine/core";
import { theme } from "./theme";
import { useDisclosure } from '@mantine/hooks';
import Navbar from './components/Navbar'
import Header from './components/Header';
import RouterSwitcher from './components/RouterSwitcher'

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 100, md: 250, lg: 185 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Header toggle={toggle} />
        <Navbar />
        <AppShellMain>
          <RouterSwitcher />
        </AppShellMain>
      </AppShell>
    </MantineProvider>
  )
}
