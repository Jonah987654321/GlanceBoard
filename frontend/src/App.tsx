import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppShell,
  MantineProvider,
  Button,
  ScrollArea,
  Space,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IoHomeOutline } from "react-icons/io5";
import { FiCpu } from "react-icons/fi";
import { PiMemoryLight, PiNetwork, PiPlugChargingBold } from "react-icons/pi";
import { GrStorage, GrDocumentConfig } from "react-icons/gr";
import { VscServerProcess } from "react-icons/vsc";
import { RiSensorLine } from "react-icons/ri";
import { LuLogs } from "react-icons/lu";
import { GoHistory } from "react-icons/go";

import { SidebarLink } from "./components/SidebarLink";
import { Overview } from "./pages/overview";

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <MantineProvider>
      <Router>
        <AppShell
          padding="md"
          navbar={{
            width: 200,
            breakpoint: "sm",
            collapsed: { mobile: !mobileOpened, desktop: false },
          }}
        >
          <AppShell.Navbar>
            <AppShell.Section>
              <Space h="md" />
              <Center>Navbar header</Center>
              <Space h="xl" />
            </AppShell.Section>
            <AppShell.Section grow component={ScrollArea}>
              <SidebarLink to="/" label="Overview" Icon={IoHomeOutline} />
              <SidebarLink to="/cpu" label="CPU & Load" Icon={FiCpu} />
              <SidebarLink to="/memory" label="Memory" Icon={PiMemoryLight} />
              <SidebarLink to="/storage" label="Storage" Icon={GrStorage} />
              <SidebarLink to="/network" label="Network" Icon={PiNetwork} />
              <SidebarLink
                to="/processes"
                label="Processes"
                Icon={VscServerProcess}
              />
              <SidebarLink to="/sensors" label="Sensors" Icon={RiSensorLine} />
              <SidebarLink to="/logs" label="Logs & Events" Icon={LuLogs} />
              <SidebarLink
                to="/power"
                label="Power"
                Icon={PiPlugChargingBold}
              />
              <SidebarLink
                to="/config"
                label="Config"
                Icon={GrDocumentConfig}
              />
              <SidebarLink to="/history" label="History" Icon={GoHistory} />
            </AppShell.Section>
            <AppShell.Section>Footer</AppShell.Section>
          </AppShell.Navbar>

          <AppShell.Main>
            {/* Button nur für mobile Navbar toggle */}
            <Button onClick={toggleMobile} hiddenFrom="sm">
              Toggle navbar
            </Button>

            {/* Main Content */}
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="*" element={<Overview />} /> {/* Default */}
            </Routes>
          </AppShell.Main>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}
