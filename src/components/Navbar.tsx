import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLayoutDashboard, IconSearch } from '@tabler/icons-react'


export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')


  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label='Dashboard'
        leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard')}
        style={{ margin: '5px', borderRadius: '5px' }}
        variant="subtle"
        {...(token ? { active: true } : { disabled: true })}
      />
      <NavLink
        label="Search Songs"
        leftSection={<IconSearch size="1rem" stroke={1.5} />}
        onClick={() => navigate('/search')}
        style={{ margin: '5px', borderRadius: '5px' }}
        variant="subtle"
        {...(token ? { active: true } : { disabled: true })}
      />
    </AppShell.Navbar>
  );
};
