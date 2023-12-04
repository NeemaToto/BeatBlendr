import { Flex, Burger, Button, useMantineColorScheme, useComputedColorScheme, AppShell, Title, NavLink } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IconVinyl, IconLogout2 } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';

export default function Header({ toggle, opened }: any) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    };

    const navigate = useNavigate();

    function handleLogout() {
        window.localStorage.removeItem('token')
        navigate('/')
    }

    const token = localStorage.getItem('token')

    return (
        <AppShell.Header>
            <Flex justify="space-between" align="center" style={{ padding: '10px 20px' }}>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconVinyl />
                    <Title order={1}>BeatBlendr</Title>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button size="sm" variant="link" onClick={toggleColorScheme}>
                        {computedColorScheme === 'dark' ? <FaSun /> : <FaMoon />}
                    </Button>
                    {token &&
                        <NavLink
                            label='Logout'
                            leftSection={<IconLogout2 size="1rem" stroke={1.5} />}
                            onClick={() => handleLogout()}
                            style={{ margin: '5px' }}
                        />
                    }
                </div>
            </Flex>
        </AppShell.Header>
    );
};