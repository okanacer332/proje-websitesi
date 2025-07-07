import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
    CssBaseline,
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    AppBar,
    Toolbar,
    Paper,
    Chip,
    Avatar,
    Step,
    StepLabel,
    StepContent,
    Stepper
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot
} from '@mui/lab';

// MUI Icons
import ApartmentIcon from '@mui/icons-material/Apartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SavingsIcon from '@mui/icons-material/Savings';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RouteIcon from '@mui/icons-material/Route';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoodIcon from '@mui/icons-material/Mood';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PolicyIcon from '@mui/icons-material/Policy';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HandymanIcon from '@mui/icons-material/Handyman';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// --- Canlı Renk Paleti ---
const colors = {
    primary: '#1976D2',
    primaryLight: '#64B5F6',
    primaryDark: '#0D47A1',
    secondary: '#FFA726',
    accent: '#4CAF50',
    background: '#F5F7FA',
    textDark: '#263238',
    textLight: '#546E7A',
    white: '#FFFFFF',
    danger: '#D32F2F',
    warning: '#ED6C02'
};

const theme = createTheme({
    palette: {
        primary: { main: colors.primary },
        secondary: { main: colors.secondary },
        success: { main: colors.accent },
        warning: { main: colors.warning },
        background: { default: colors.background, paper: colors.white },
        text: { primary: colors.textDark, secondary: colors.textLight },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800, color: colors.primaryDark },
        h2: { fontWeight: 700, color: colors.primaryDark, letterSpacing: '-1px' },
        h3: { fontWeight: 700, color: colors.primaryDark },
        h4: { fontWeight: 600, color: colors.primary },
        h5: { fontWeight: 600, color: colors.primaryDark },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
                    },
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }
            }
        }
    }
});

const StyledSection = styled('section')(({ theme, odd }) => ({
    padding: theme.spacing(10, 2),
    backgroundColor: odd ? colors.white : 'transparent',
}));

// --- GRAFİK BİLEŞENLERİ (ANA BİLEŞEN DIŞINA TAŞINDI) ---

const ChartCard = ({ title, children }) => (
    <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" align="center" sx={{ color: colors.primaryDark, mb: 2 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: { xs: '200px', sm: '250px' } }}>
            {children}
        </Box>
    </Card>
);

const FuelChart = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = new Chart(chartRef.current.getContext('2d'), {
            type: 'pie', data: { labels: ['Gereksiz Tüketim', 'Tasarruf Potansiyeli'], datasets: [{ data: [60, 40], backgroundColor: [colors.warning, colors.accent], hoverOffset: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
        return () => chartInstance.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
};

const EmissionChart = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = new Chart(chartRef.current.getContext('2d'), {
            type: 'bar', data: { labels: ['Mevcut Sistem', 'Akıllı Sistem'], datasets: [{ label: 'Göreceli Karbon Salınımı', data: [100, 70], backgroundColor: [colors.primary, colors.primaryLight] }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
        return () => chartInstance.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
};

const ComplaintChart = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = new Chart(chartRef.current.getContext('2d'), {
            type: 'line', data: { labels: ['Önce', 'Sonra'], datasets: [{ label: 'Şikayet Oranı', data: [100, 15], borderColor: colors.secondary, tension: 0.4, fill: true, backgroundColor: 'rgba(255, 167, 38, 0.2)' }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        return () => chartInstance.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
};

const MaintenanceChart = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = new Chart(chartRef.current.getContext('2d'), {
            type: 'doughnut',
            data: { labels: ['Mevcut Yıpranma', 'Azalan Yıpranma'], datasets: [{ data: [50, 50], backgroundColor: [colors.primary, colors.accent] }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, cutout: '60%'}
        });
        return () => chartInstance.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
};

// --- SAYFA BÖLÜM BİLEŞENLERİ ---

const Header = () => (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Container maxWidth="xl">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ApartmentIcon sx={{ color: colors.primary }} fontSize="large" />
                    <Typography variant="h6" sx={{ color: colors.primaryDark, fontWeight: 'bold' }}>
                        Geleceğin Mezitli'si
                    </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ color: colors.primary, fontWeight: 500, display: { xs: 'none', md: 'block' } }}>
                    Akıllı Atık Yönetim Sistemi
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
);

const HeroSection = () => (
     <Box sx={{ background: `linear-gradient(45deg, ${colors.primaryDark} 30%, ${colors.primaryLight} 90%)`, color: colors.white, py: { xs: 8, md: 14 }, textAlign: 'center', borderRadius: { xs: 0, md: '0 0 50px 50px' } }}>
        <Container maxWidth="md">
            <Chip icon={<AutoAwesomeIcon />} label="Yenilikçi Yönetim Anlayışı" sx={{ mb: 3, backgroundColor: colors.secondary, color: colors.textDark }} />
            <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem' }, mb: 2, color: colors.white }}>
                Temiz ve Verimli Adımlar
            </Typography>
            <Typography variant="h5" component="p" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, maxWidth: '800px', mx: 'auto' }}>
                Yapay zeka destekli akıllı atık yönetim sistemimizle Mezitli'nin kaynaklarını daha verimli kullanıyor, şehrimizi geleceğe taşıyoruz.
            </Typography>
        </Container>
    </Box>
);

const ProblemSection = () => (
    <StyledSection>
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Chip icon={<ErrorOutlineIcon />} label="Mevcut Durum Analizi" color="warning" variant="outlined" sx={{ mb: 2 }} />
                <Typography variant="h2" component="h2">Mevcut Sistem Neden Sürdürülebilir Değil?</Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}><Card sx={{ p: 2, textAlign: 'center', height: '100%' }}><MonetizationOnIcon sx={{ fontSize: 50, color: colors.warning }} /><Typography variant="h6" mt={1}>Verimsiz Kaynak Kullanımı</Typography></Card></Grid>
                <Grid item xs={12} sm={6} md={3}><Card sx={{ p: 2, textAlign: 'center', height: '100%' }}><PublicIcon sx={{ fontSize: 50, color: colors.warning }} /><Typography variant="h6" mt={1}>Çevresel Etkiler</Typography></Card></Grid>
                <Grid item xs={12} sm={6} md={3}><Card sx={{ p: 2, textAlign: 'center', height: '100%' }}><MoodIcon sx={{ fontSize: 50, color: colors.warning }} /><Typography variant="h6" mt={1}>Vatandaş Memnuniyetsizliği</Typography></Card></Grid>
                <Grid item xs={12} sm={6} md={3}><Card sx={{ p: 2, textAlign: 'center', height: '100%' }}><SavingsIcon sx={{ fontSize: 50, color: colors.warning }} /><Typography variant="h6" mt={1}>Yüksek Operasyonel Maliyetler</Typography></Card></Grid>
            </Grid>
        </Container>
    </StyledSection>
);

const SolutionSection = () => {
    const steps = [
        { icon: <SpeedIcon />, label: '1. Anlık Ölçüm', description: `Konteynerlere monte edilen ultrasonik sensörler, doluluk oranını anlık olarak ölçer ve merkezi platforma iletir.` },
        { icon: <CloudUploadIcon />, label: '2. Veri İletimi & Analiz', description: 'Veri, GSM ile anında merkezi platforma gönderilir. Harita üzerinden tüm konteynerlerin doluluk durumu anlık olarak renk kodlarıyla izlenir.' },
        { icon: <RouteIcon />, label: '3. Akıllı Rota Planlama', description: 'Yapay zeka, sadece dolu konteynerleri ve anlık trafik verilerini dikkate alarak her araç için o günün en verimli rotasını oluşturur.' },
        { icon: <AssessmentIcon />, label: '4. Raporlama ve Strateji', description: 'Toplanan tüm veriler, gelecekteki konteyner yerleşimi, araç ihtiyacı ve bütçeleme gibi stratejik kararlar için paha biçilmez bir kaynak sunar.' },
    ];

    return (
        <StyledSection odd>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip icon={<CheckCircleOutlineIcon />} label="Önerilen Çözüm" color="success" sx={{ mb: 2 }} />
                    <Typography variant="h2" component="h2">4 Adımda Akıllı Dönüşüm</Typography>
                </Box>
                <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                    <Stepper orientation="vertical">
                        {steps.map((step) => (
                            <Step key={step.label} active={true}>
                                <StepLabel icon={<Avatar sx={{ bgcolor: colors.secondary, color: colors.white }}>{step.icon}</Avatar>}>
                                    <Typography variant="h5">{step.label}</Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Container>
        </StyledSection>
    );
};

const ImpactDashboard = () => (
    <StyledSection>
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Chip icon={<ShowChartIcon />} label="Projenin Etkisi" color="primary" sx={{ mb: 2 }} />
                <Typography variant="h2" component="h2">Rakamlarla Kazanımlarımız</Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={6} lg={5}><ChartCard title="Yakıt Tasarrufu (%30-40)"><FuelChart /></ChartCard></Grid>
                <Grid item xs={12} sm={6} md={6} lg={5}><ChartCard title="Daha Az Karbon Salınımı"><EmissionChart /></ChartCard></Grid>
                <Grid item xs={12} sm={6} md={6} lg={5}><ChartCard title="Vatandaş Şikayetlerinde Azalma"><ComplaintChart/></ChartCard></Grid>
                <Grid item xs={12} sm={6} md={6} lg={5}><ChartCard title="Araç Yıpranmasında Azalma"><MaintenanceChart/></ChartCard></Grid>
            </Grid>
        </Container>
    </StyledSection>
);

const CtaSection = () => (
    <Box sx={{ textAlign: 'center', py: 10, backgroundColor: colors.primaryDark }}>
        <Container maxWidth="md">
            <Typography variant="h2" component="h2" sx={{ color: colors.white, mb: 2 }}>Mezitli İçin Stratejik Bir Yatırım</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', my: 3, fontSize: '1.2rem' }}>
                 Bu proje, bir harcama değil, geleceğimize yapılmış, kendi kendini finanse eden stratejik bir yatırımdır. Mezitli'yi Türkiye'nin en akıllı ve en temiz ilçelerinden biri yapma yolunda atılmış dev bir adım olacaktır.
            </Typography>
            <Button variant="contained" size="large" sx={{ backgroundColor: colors.secondary, color: colors.primaryDark, fontWeight: 'bold', fontSize: '1.1rem', py: 1.5, px: 6, '&:hover': { backgroundColor: '#FFB74D' }, borderRadius: '50px' }}>
                Projeye Destek Ol
            </Button>
        </Container>
    </Box>
);

// --- ANA UYGULAMA BİLEŞENİ ---
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main>
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <ImpactDashboard />
                <CtaSection />
            </main>
        </ThemeProvider>
    );
}