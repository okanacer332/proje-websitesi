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
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Personel Verimliliği
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // Gürültü Kirliliği
import TrafficIcon from '@mui/icons-material/Traffic'; // Trafik Kirliliği
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'; // Görüntü ve Koku Kirliliği
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'; // Vatandaş Memnuniyeti
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Modern İmaj / İnovasyon
import StarsIcon from '@mui/icons-material/Stars'; // Modern İmaj / Liderlik

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
        h1: { fontWeight: 800, color: colors.primaryDark, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' } },
        h2: { fontWeight: 700, color: colors.primaryDark, letterSpacing: '-1px', fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' } },
        h3: { fontWeight: 700, color: colors.primaryDark, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } },
        h4: { fontWeight: 600, color: colors.primary, fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } },
        h5: { fontWeight: 600, color: colors.primaryDark, fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' } },
        h6: { fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } },
        body1: { fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } },
        subtitle1: { fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } },
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
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                },
            },
        },
    }
});

const StyledSection = styled('section')(({ theme, odd }) => ({
    padding: theme.spacing(10, 2),
    backgroundColor: odd ? colors.background : colors.white,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(6, 1),
    },
}));

// --- GRAFİK BİLEŞENLERİ (ANA BİLEŞEN DIŞINA TAŞINDI) ---

const ChartCard = ({ title, children }) => (
    <Card sx={{ p: { xs: 1.5, sm: 2 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" align="center" sx={{ color: colors.primaryDark, mb: 2 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: { xs: '180px', sm: '200px', md: '250px' } }}>
            {children}
        </Box>
    </Card>
);

const BenefitCard = ({ icon, title, description, color = 'primary' }) => (
    <Card sx={{ p: { xs: 1.5, sm: 2 }, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ bgcolor: theme.palette[color].main, width: { xs: 50, sm: 60 }, height: { xs: 50, sm: 60 }, mb: 2 }}>
            {React.cloneElement(icon, { sx: { fontSize: { xs: 30, sm: 35 } } })}
        </Avatar>
        <Typography variant="h6" sx={{ color: colors.primaryDark, mb: 1 }}>{title}</Typography>
        <Typography variant="body1" sx={{ color: colors.textLight }}>{description}</Typography>
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
    <AppBar position="sticky">
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
        { icon: <SpeedIcon />, label: '1. Akıllı Sensörler', description: `Konteynerlere monte edilen ultrasonik sensörler, doluluk oranını anlık olarak ölçer ve merkezi platforma iletir.` },
        { icon: <CloudUploadIcon />, label: '2. Merkezi Kontrol Platformu', description: 'Veri, GSM ile anında merkezi platforma gönderilir. Harita üzerinden tüm konteynerlerin doluluk durumu anlık olarak renk kodlarıyla izlenir.' },
        { icon: <RouteIcon />, label: '3. Yapay Zeka Destekli Rota Optimizasyonu', description: 'Yapay zeka, sadece dolu (%80 ve üzeri) veya dolmak üzere olan konteynerleri hedef alarak toplama listesi oluşturur ve anlık trafik verilerini hesaba katarak en verimli rotayı planlar.' },
        { icon: <AssessmentIcon />, label: '4. Veri Analizi ve Raporlama', description: 'Sistem, toplanan tüm verileri (atık miktarı, dolma hızları, toplama süreleri vb.) analiz eder. Bu analizler, gelecekteki konteyner yerleşim planlaması, araç ihtiyacı ve bütçeleme gibi stratejik kararlar için paha biçilmez bir kaynak sunar.' },
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
                <Typography variant="h5" component="p" sx={{ color: colors.textLight, mt: 2 }}>
                    Akıllı Atık Yönetim Sisteminin Mezitli'ye Sağladığı Ölçülebilir Faydalar
                </Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                {/* Ekonomik Faydalar */}
                <Grid item xs={12} sm={6} md={4}>
                    <ChartCard title="Yakıt Maliyetlerinde Azalma (%30-40)">
                        <FuelChart />
                    </ChartCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BenefitCard
                        icon={<HandymanIcon />}
                        title="Araç Bakım ve Amortisman Giderlerinde Düşüş"
                        description="Daha az kat edilen mesafe ve optimize edilmiş sürüş rotaları sayesinde araçların yıpranma oranı azalır, bakım maliyetleri düşer."
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BenefitCard
                        icon={<AccessTimeIcon />}
                        title="Personel Verimliliğinde Artış"
                        description="Ekiplerin gereksiz seferler yerine, tam dolu konteynerlere odaklanmasıyla operasyonel verimlilik artar ve zaman kullanımı optimize edilir."
                        color="success"
                    />
                </Grid>

                {/* Çevresel Faydalar */}
                <Grid item xs={12} sm={6} md={4}>
                    <ChartCard title="Karbon Salınımında Azalma">
                        <EmissionChart />
                    </ChartCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BenefitCard
                        icon={<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}><VolumeOffIcon /><TrafficIcon /></Box>}
                        title="Gürültü ve Trafik Kirliliğinde Düşüş"
                        description="Gereksiz çöp toplama seferlerinin önüne geçilerek şehir içinde dolaşan kamyon sayısı ve süresi azalır, bu da gürültü ve trafik yoğunluğunu düşürür."
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BenefitCard
                        icon={<DeleteSweepIcon />}
                        title="Görüntü ve Koku Kirliliğinin Önlenmesi"
                        description="Konteynerlerin doluluk oranının anlık takibi sayesinde, taşmalar ve buna bağlı oluşan kötü koku ile görüntü kirliliği sorunları tarihe karışır."
                        color="warning"
                    />
                </Grid>

                {/* Sosyal / Vatandaş Odaklı Faydalar */}
                <Grid item xs={12} sm={6} md={4}>
                    <BenefitCard
                        icon={<SentimentVerySatisfiedIcon />}
                        title="Vatandaş Memnuniyetinde Artış"
                        description="Her zaman temiz, taşmayan konteynerler ve daha hijyenik bir çevre sunarak vatandaşların yaşam kalitesi ve belediye hizmetlerinden duyduğu memnuniyet artar."
                        color="info"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ChartCard title="Vatandaş Şikayetlerinde Ciddi Azalma">
                        <ComplaintChart/>
                    </ChartCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BenefitCard
                        icon={<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}><StarsIcon /><LightbulbIcon /></Box>}
                        title="Modern ve Yenilikçi Belediye İmajı"
                        description="Teknoloji ve sürdürülebilirlik odaklı bu proje ile Mezitli, kaynaklarını verimli kullanan, çevreye duyarlı ve öncü bir akıllı şehir olarak konumlanır."
                        color="success"
                    />
                </Grid>
            </Grid>
        </Container>
    </StyledSection>
);

const CtaSection = () => (
    <Box sx={{ textAlign: 'center', py: 10, backgroundColor: colors.primaryDark }}>
        <Container maxWidth="md">
            <Typography variant="h2" component="h2" sx={{ color: colors.white, mb: 2 }}>Mezitli İçin Stratejik Bir Yatırım</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', my: 3, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
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