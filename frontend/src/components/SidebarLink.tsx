import { NavLink as MantineNavLink } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  label: string;
  Icon: any;
}

export function SidebarLink({ to, label, Icon }: SidebarLinkProps) {
  return (
    <MantineNavLink
      component={RouterNavLink}
      to={to}
      label={label}
      leftSection={<Icon size={24} />}
      styles={(theme) => ({
        label: { fontSize: theme.fontSizes.md },
      })}
    />
  );
}
