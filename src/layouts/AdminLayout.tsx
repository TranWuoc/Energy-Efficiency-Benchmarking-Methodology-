import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const SidebarItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const active = pathname === to || pathname.startsWith(to + '/');

    return (
        <ListItemButton
            onClick={() => navigate(to)}
            sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.78)',
                bgcolor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.10)' },
                px: 1.5,
                py: 1.1,
            }}
        >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} sx={{ fontSize: 14, fontWeight: active ? 800 : 700 }} />
        </ListItemButton>
    );
};

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                bgcolor: '#f2f0ea',
                overflow: 'hidden',
            }}
        >
            {/* SIDEBAR */}
            <Box
                sx={{
                    width: 260,
                    bgcolor: '#1f2f1f',
                    color: 'white',
                    p: 2,

                    position: 'sticky',
                    top: 0,
                    height: '100vh',

                    overflowY: 'auto',
                    flexShrink: 0,

                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1 }}>
                    <LocalHospitalOutlinedIcon />
                    <Typography fontWeight={900}>Healthcare</Typography>
                </Stack>

                <List sx={{ px: 0 }}>
                    <SidebarItem icon={<DashboardIcon />} label="Dashboard" to="/admin/dashboard" />
                    <SidebarItem icon={<PeopleAltOutlinedIcon />} label="Patients" to="/admin/patients" />
                    <SidebarItem icon={<EventOutlinedIcon />} label="Appointment" to="/admin/appointments" />
                    <SidebarItem icon={<AssessmentOutlinedIcon />} label="Report" to="/admin/reports" />
                    <SidebarItem icon={<SettingsOutlinedIcon />} label="Setting" to="/admin/settings" />
                </List>

                <Box sx={{ flex: 1 }} />

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        p: 2,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        border: '1px dashed rgba(255,255,255,0.18)',
                    }}
                >
                    <Typography fontWeight={900} sx={{ mb: 0.5 }}>
                        Upgrade to Pro 🔥
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        Unlock all the Pro features for free for 1 month
                    </Typography>
                    <Button
                        fullWidth
                        sx={{
                            mt: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 900,
                            bgcolor: 'rgba(255,255,255,0.12)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' },
                        }}
                    >
                        Upgrade
                    </Button>
                </Paper>

                <Stack spacing={0.75} sx={{ px: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.9 }}>
                        <HelpOutlineIcon fontSize="small" />
                        <Typography fontWeight={800} fontSize={14}>
                            Help & Centre
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ opacity: 0.9, cursor: 'pointer' }}
                        onClick={handleLogout}
                    >
                        <LogoutOutlinedIcon fontSize="small" />
                        <Typography fontWeight={800} fontSize={14}>
                            Logout
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            {/* MAIN */}
            <Box
                sx={{
                    flex: 1,
                    height: '100vh',
                    overflowY: 'auto',
                    p: { xs: 2, md: 3 },
                }}
            >
                {/* TOPBAR */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            px: 1.5,
                            py: 1,
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            width: { xs: '100%', md: 520 },
                            border: '1px solid rgba(0,0,0,0.06)',
                            bgcolor: 'rgba(255,255,255,0.8)',
                        }}
                    >
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                        <InputBase placeholder="Search" sx={{ flex: 1, fontWeight: 700 }} />
                        <Chip size="small" label="⌘ F" sx={{ bgcolor: 'rgba(0,0,0,0.05)', fontWeight: 900 }} />
                    </Paper>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.25}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <IconButton>
                            <NotificationsNoneOutlinedIcon />
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                        <Stack direction="row" alignItems="center" spacing={1.2}>
                            <Avatar sx={{ width: 34, height: 34 }} />
                            <Box>
                                <Typography fontWeight={900} fontSize={13}>
                                    Cameron Williamson
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>
                                    UI Designer
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>

                {/* Page content */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
