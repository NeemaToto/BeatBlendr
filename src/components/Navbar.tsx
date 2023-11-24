import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLayoutDashboard, IconSearch } from '@tabler/icons-react'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label='Dashboard'
        leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
        onClick={() => navigate('/text-component')}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Search Songs"
        leftSection={<IconSearch size="1rem" stroke={1.5} />}
        onClick={() => navigate('/button-component')}
        style={{ margin: '5px' }}
      />
    </AppShell.Navbar>
  );
};

export default Navbar;