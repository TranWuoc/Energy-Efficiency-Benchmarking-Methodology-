import {
    Avatar,
    Box,
    Chip,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StatCard = ({
    title,
    value,
    delta,
    hint,
    barColor = '#2e5f3a',
}: {
    title: string;
    value: string;
    delta: string;
    hint: string;
    barColor?: string;
}) => (
    <Paper
        elevation={0}
        sx={{
            p: 2.25,
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.06)',
            bgcolor: 'white',
            minHeight: 140,
        }}
    >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.04)' }} />
                <Typography fontWeight={800} fontSize={14}>
                    {title}
                </Typography>
            </Stack>
            <IconButton size="small">
                <MoreHorizIcon fontSize="small" />
            </IconButton>
        </Stack>

        <Stack direction="row" alignItems="baseline" spacing={1.2} sx={{ mt: 1.5 }}>
            <Typography fontWeight={900} fontSize={28} letterSpacing={-0.6}>
                {value}
            </Typography>
            <Chip
                size="small"
                label={delta}
                sx={{
                    bgcolor: 'rgba(0,0,0,0.05)',
                    fontWeight: 900,
                    fontSize: 12,
                }}
            />
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
            {hint}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.5 }}>
            <Box
                sx={{
                    height: 6,
                    width: '70%',
                    borderRadius: 999,
                    bgcolor: 'rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ height: '100%', width: '55%', bgcolor: barColor, borderRadius: 999 }} />
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>
                Today
            </Typography>
        </Stack>
    </Paper>
);

const MiniDonut = ({ percent, color }: { percent: number; color: string }) => (
    <Box
        sx={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: `conic-gradient(${color} ${percent}%, rgba(0,0,0,0.06) 0)`,
            display: 'grid',
            placeItems: 'center',
        }}
    >
        <Box
            sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                bgcolor: 'white',
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
                fontWeight: 900,
                color: 'text.secondary',
            }}
        >
            {percent}%
        </Box>
    </Box>
);

const DashboardPage = () => {
    return (
        <Box>
            {/* KPI ROW */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                    gap: 2,
                    mb: 2,
                }}
            >
                <StatCard
                    title="Appointments"
                    value="10,525"
                    delta="+15.2%"
                    hint="An appointment data range of 5,567 to 7,525 for the last 7 days."
                    barColor="#2e5f3a"
                />
                <StatCard
                    title="New Patients"
                    value="512"
                    delta="+10.25%"
                    hint="A new patients data range of 5,567 to 7,525 for the last 7 days."
                    barColor="#e07a1f"
                />
                <StatCard
                    title="Operations"
                    value="320"
                    delta="+27.2%"
                    hint="A new operation data range of 5,567 to 7,525 for the last 7 days."
                    barColor="#2b7a78"
                />
            </Box>

            {/* MID GRID */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                    gap: 2,
                    mb: 2,
                }}
            >
                {/* Patients chart mock */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.25,
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.06)',
                        bgcolor: 'white',
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography fontWeight={900}>Patients by age</Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ width: 10, height: 10, borderRadius: 999, bgcolor: '#2e5f3a' }} />
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900 }}>
                                        Male
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ width: 10, height: 10, borderRadius: 999, bgcolor: '#e07a1f' }} />
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900 }}>
                                        Female
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>

                        <Chip size="small" label="Months" sx={{ bgcolor: 'rgba(0,0,0,0.05)', fontWeight: 900 }} />
                    </Stack>

                    {/* fake bars */}
                    <Box
                        sx={{
                            mt: 3,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(8, 1fr)',
                            gap: 2,
                            alignItems: 'end',
                            height: 170,
                        }}
                    >
                        {[40, 55, 85, 120, 70, 95, 60, 80].map((h, idx) => (
                            <Box key={idx} sx={{ display: 'grid', gap: 1 }}>
                                <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'end', height: 150 }}>
                                    <Box
                                        sx={{
                                            width: '50%',
                                            height: h,
                                            borderRadius: 2,
                                            bgcolor: 'rgba(46,95,58,0.25)',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: '50%',
                                            height: Math.max(20, h - 25),
                                            borderRadius: 2,
                                            bgcolor: 'rgba(224,122,31,0.25)',
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'text.secondary', fontWeight: 900, textAlign: 'center' }}
                                >
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][idx]}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>

                {/* Financial history */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.25,
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.06)',
                        bgcolor: 'white',
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight={900}>Financial History</Typography>
                        <IconButton size="small">
                            <MoreHorizIcon fontSize="small" />
                        </IconButton>
                    </Stack>

                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: 'rgba(46,95,58,0.08)',
                                border: '1px solid rgba(0,0,0,0.04)',
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <MiniDonut percent={75} color="#2e5f3a" />
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900 }}>
                                        New Income
                                    </Typography>
                                    <Typography fontWeight={900} fontSize={22}>
                                        $26,100.00
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: 'rgba(224,122,31,0.08)',
                                border: '1px solid rgba(0,0,0,0.04)',
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <MiniDonut percent={35} color="#e07a1f" />
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900 }}>
                                        Average Spend
                                    </Typography>
                                    <Typography fontWeight={900} fontSize={22}>
                                        $8,076.00
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Stack>
                </Paper>
            </Box>

            {/* BOTTOM GRID */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                    gap: 2,
                }}
            >
                {/* Appointment Table */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.25,
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.06)',
                        bgcolor: 'white',
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography fontWeight={900}>Appointment</Typography>
                        <Chip
                            size="small"
                            label="Latest Appoint"
                            sx={{ bgcolor: 'rgba(0,0,0,0.05)', fontWeight: 900 }}
                        />
                    </Stack>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 900 }}>Patient</TableCell>
                                <TableCell sx={{ fontWeight: 900 }}>Gender</TableCell>
                                <TableCell sx={{ fontWeight: 900 }}>Appoint for</TableCell>
                                <TableCell sx={{ fontWeight: 900 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 900 }}>Time</TableCell>
                                <TableCell sx={{ fontWeight: 900 }} align="right">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {[
                                ['Esther Howard', 'Male', 'Dr. Jerome Bell', '20 Nov 2023', '10:00 AM'],
                                ['Kristin Watson', 'Male', 'Dr. Robert Fox', '23 Nov 2023', '11:00 AM'],
                                ['Jacob Jones', 'Male', 'Dr. Eleanor Pena', '27 Nov 2023', '12:00 PM'],
                                ['Floyd Miles', 'Male', 'Dr. Floyd Miles', '30 Nov 2023', '1:00 PM'],
                            ].map((row, idx) => (
                                <TableRow key={idx} hover>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.2} alignItems="center">
                                            <Avatar sx={{ width: 28, height: 28 }} />
                                            <Box>
                                                <Typography fontWeight={900} fontSize={13}>
                                                    {row[0]}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: 'text.secondary', fontWeight: 800 }}
                                                >
                                                    40 Year's Old
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{row[1]}</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{row[2]}</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{row[3]}</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{row[4]}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <MoreHorizIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                {/* Calendar */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.25,
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.06)',
                        bgcolor: 'white',
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight={900}>November 2023</Typography>
                        <IconButton size="small">
                            <CalendarMonthOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
                        <Chip
                            size="small"
                            label="Appointment"
                            sx={{ bgcolor: 'rgba(46,95,58,0.10)', fontWeight: 900 }}
                        />
                        <Chip size="small" label="Meeting" sx={{ bgcolor: 'rgba(224,122,31,0.10)', fontWeight: 900 }} />
                        <Chip
                            size="small"
                            label="Operations"
                            sx={{ bgcolor: 'rgba(43,122,120,0.10)', fontWeight: 900 }}
                        />
                    </Stack>

                    <Divider />

                    <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1.2 }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                            <Typography
                                key={d}
                                variant="caption"
                                sx={{ color: 'text.secondary', fontWeight: 900, textAlign: 'center' }}
                            >
                                {d}
                            </Typography>
                        ))}

                        {Array.from({ length: 35 }).map((_, i) => {
                            const day = i - 1; // mock
                            const isActive = day === 2;
                            const isMuted = day < 1 || day > 30;

                            return (
                                <Paper
                                    key={i}
                                    elevation={0}
                                    sx={{
                                        height: 38,
                                        borderRadius: 2,
                                        display: 'grid',
                                        placeItems: 'center',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        bgcolor: isActive ? 'rgba(224,122,31,0.16)' : 'transparent',
                                        opacity: isMuted ? 0.35 : 1,
                                    }}
                                >
                                    <Typography fontWeight={900} fontSize={13}>
                                        {isMuted ? '' : day}
                                    </Typography>
                                </Paper>
                            );
                        })}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default DashboardPage;
