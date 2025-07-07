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
    Icon
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from '@mui/lab';

// MUI Icons
import ApartmentIcon from '@mui/icons-material/Apartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RouteIcon from '@mui/icons-material/Route';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SavingsIcon from '@mui/icons-material/Savings';
import Co2Icon from '@mui/icons-material/Co2';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AnalyticsIcon from '@mui/icons-material/Analytics';


// Renk Paleti ve Tema
const colors = {
    primaryDark: '#005082',
    primary: '#0077C0',
    primaryLight: '#00A1E4',
    accent: '#FDB913',
    background: '#F8F9FA',
    textDark: '#1E293B',
    textLight: '#475569',
    white: '#FFFFFF',
};

const theme = createTheme({
    palette: {
        primary: { main: colors.primary },
        secondary: { main: colors.accent },
        background: { default: colors.background, paper: colors.white },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h2: { fontWeight: 800 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
    },
});

// --- Bileşenler ---

const Header = () => (
    <AppBar position="sticky" sx={{ backgroundColor: colors.white, boxShadow: 1 }}>
        <Toolbar>
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ApartmentIcon sx={{ color: colors.primaryDark }} />
                    <Typography variant="h6" component="h1" sx={{ color: colors.primaryDark, fontWeight: 'bold' }}>
                        Mezitli Belediyesi
                    </Typography>
                </Box>
                <Typography variant="body1" component="h2" sx={{ color: colors.primary, fontWeight: 'semibold', display: { xs: 'none', sm: 'block' } }}>
                    Akıllı Atık Yönetimi Projesi
                </Typography>
            </Container>
        </Toolbar>
    </AppBar>
);

const HeroSection = () => (
    <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 }, backgroundColor: '#F0F4F8', borderRadius: 4, mb: 8, border: '1px solid #E0E0E0' }}>
        <AutoAwesomeIcon sx={{ fontSize: 60, color: colors.accent, mb: 2 }} />
        <Typography variant="h2" component="h2" sx={{ color: colors.primaryDark, lineHeight: 1.2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Geleceğin Mezitli'si İçin<br/><span style={{ color: colors.primaryLight }}>Akıllı Adımlar</span>
        </Typography>
        <Typography sx={{ color: colors.textLight, mt: 3, maxWidth: '750px', mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Kaynaklarımızı koruyan, vatandaşımızın yaşam kalitesini yükselten ve şehrimizi geleceğe taşıyan yenilikçi atık yönetimi projemizi keşfedin.
        </Typography>
    </Box>
);

const ProblemSection = () => {
    const problems = [
        { icon: <AttachMoneyIcon fontSize="large" />, title: 'Yüksek Maliyetler', description: 'Gereksiz yakıt tüketimi ve sık araç bakımı, bütçemizi zorluyor.' },
        { icon: <DeleteSweepIcon fontSize="large" />, title: 'Çevre Kirliliği', description: 'Taşan konteynerler koku, hijyen ve görüntü kirliliğine yol açıyor.' },
        { icon: <HourglassDisabledIcon fontSize="large" />, title: 'Verimsiz Zaman', description: 'Ekiplerimiz, henüz dolmamış konteynerleri kontrol ederek zaman kaybediyor.' },
        { icon: <SmsFailedIcon fontSize="large" />, title: 'Vatandaş Şikayetleri', description: 'Atık kaynaklı sorunlar, belediyemize ulaşan şikayetlerin başında geliyor.' },
    ];

    return (
        <Box component="section" sx={{ mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" component="h3" sx={{ color: colors.primaryDark }}>Mevcut Sistemdeki Zorluklar</Typography>
                <Typography sx={{ color: colors.textLight, mt: 1, maxWidth: '600px', mx: 'auto' }}>
                    Geleneksel yöntemler, hem bütçemiz hem de çevremiz için sürdürülebilir değil.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {problems.map(problem => (
                    <Grid item xs={12} sm={6} md={3} key={problem.title}>
                        <Card sx={{ textAlign: 'center', p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
                            <CardContent>
                                <Box sx={{ color: colors.primary }}>{problem.icon}</Box>
                                <Typography variant="h5" component="h4" sx={{ color: colors.primary, my: 2 }}>{problem.title}</Typography>
                                <Typography sx={{ color: colors.textLight }}>{problem.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const SolutionSection = () => {
    const steps = [
        { icon: <SpeedIcon />, title: 'ÖLÇÜM', desc: 'Konteynerdeki akıllı sensör, doluluk oranını anlık olarak ölçer.' },
        { icon: <CloudUploadIcon />, title: 'İLETİM', desc: 'Veri, mobil ağ üzerinden anında merkezi platforma gönderilir.' },
        { icon: <RouteIcon />, title: 'PLANLAMA', desc: 'Yapay zeka, en verimli ve en kısa rotayı otomatik olarak oluşturur.' },
        { icon: <CheckCircleOutlineIcon />, title: 'UYGULAMA', desc: 'Ekip, optimize rota ile zaman ve yakıt israfı olmadan toplamayı tamamlar.' },
    ];
    return (
         <Box component="section" sx={{ py: 8, backgroundColor: colors.white, borderRadius: 4, mb: 8, border: '1px solid #E0E0E0' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" component="h3" sx={{ color: colors.primaryDark }}>Çözüm: Akıllı Atık Yönetim Sistemi</Typography>
                <Typography sx={{ color: colors.textLight, mt: 1, maxWidth: '600px', mx: 'auto' }}>Veriye dayalı, 4 adımlı basit ve etkili bir iş akışı.</Typography>
            </Box>
            <Grid container spacing={2} alignItems="stretch" justifyContent="center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.title}>
                        <Grid item xs={12} md={2.5} sx={{ textAlign: 'center' }}>
                            <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ color: colors.primaryLight, fontSize: '2.5rem' }}>{step.icon}</Box>
                                <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', my: 1 }}>{step.title}</Typography>
                                <Typography variant="body2" sx={{ color: colors.textLight }}>{step.desc}</Typography>
                            </Paper>
                        </Grid>
                        {index < steps.length - 1 && (
                            <Grid item md={0.5} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h3" sx={{ color: colors.primaryLight }}>→</Typography>
                            </Grid>
                        )}
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};


const ChartCard = ({ title, description, children }) => (
    <Card sx={{ p: {xs: 2, md: 3}, boxShadow: 3, height: '100%' }}>
        <CardContent>
            <Typography variant="h5" component="h4" align="center" sx={{ color: colors.primaryDark }}>{title}</Typography>
            <Typography variant="body2" align="center" sx={{ color: colors.textLight, mb: 2, minHeight: '40px' }}>{description}</Typography>
            <Box sx={{ position: 'relative', height: { xs: '250px', sm: '300px' } }}>
                {children}
            </Box>
        </CardContent>
    </Card>
);

const FuelChart = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = new Chart(chartRef.current.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Mevcut Tüketim', 'Tasarruf Edilen'],
                datasets: [{ data: [60, 40], backgroundColor: [colors.primaryDark, colors.accent], borderColor: colors.white, borderWidth: 4, hoverOffset: 8 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, cutout: '70%' }
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
            type: 'bar',
            data: {
                labels: ['Mevcut Sistem', 'Akıllı Sistem'],
                datasets: [{ label: 'Göreceli Karbon Salınımı', data: [100, 70], backgroundColor: [colors.primary, colors.primaryLight], borderRadius: 8 }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
        return () => chartInstance.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
};

const ImpactSection = () => {
     const kpis = [
        { icon: <SavingsIcon />, value: '%40', label: 'Yakıt Tasarrufu' },
        { icon: <Co2Icon />, value: '%30', label: 'Daha Az Emisyon' },
        { icon: <BuildIcon />, value: '%50', label: 'Daha Az Araç Yıpranması' },
    ];
    return (
        <Box component="section" sx={{ mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" component="h3" sx={{ color: colors.primaryDark }}>Projenin Etkisi: Rakamlarla Kazanımlarımız</Typography>
                <Typography sx={{ color: colors.textLight, mt: 1, maxWidth: '600px', mx: 'auto' }}>Bu yatırım, kısa sürede kendini finanse edecek somut faydalar sunuyor.</Typography>
            </Box>
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <ChartCard title="Yakıt Tüketimi Karşılaştırması" description="Sistem, gereksiz seferleri ortadan kaldırarak %40'a varan tasarruf sağlıyor.">
                        <FuelChart />
                    </ChartCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ChartCard title="Karbon Salınımı Azalımı" description="Daha az yakıt, daha az karbon salınımı ve daha temiz bir Mezitli demek.">
                        <EmissionChart />
                    </ChartCard>
                </Grid>
            </Grid>
             <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                {kpis.map(kpi => (
                    <Grid item xs={12} sm={4} key={kpi.label}>
                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                            <Box sx={{ color: colors.primary, fontSize: '2.5rem' }}>{kpi.icon}</Box>
                            <Box>
                                <Typography variant="h4" component="p" sx={{ color: colors.primary, fontWeight: 'bold' }}>{kpi.value}</Typography>
                                <Typography variant="body1" component="p" sx={{ color: colors.textLight }}>{kpi.label}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const RoadmapSection = () => (
    <Box component="section" sx={{ py: 8, backgroundColor: colors.white, borderRadius: 4, border: '1px solid #E0E0E0' }}>
         <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h3" sx={{ color: colors.primaryDark }}>Proje Yol Haritamız</Typography>
            <Typography sx={{ color: colors.textLight, mt: 1, maxWidth: '600px', mx: 'auto' }}>Projeyi, yönetilebilir adımlarla ve başarıyı garanti altına alarak hayata geçireceğiz.</Typography>
        </Box>
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary"><AnalyticsIcon /></TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" component="h4">FAZ 1: Pilot Uygulama ve Test</Typography>
                        <Typography variant="caption">İlk 3 Ay</Typography>
                        <Typography>Viranşehir ve Davultepe sahil bandında 150 konteyner ile sistemi test edeceğiz.</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary"><BarChartIcon /></TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" component="h4">FAZ 2: Değerlendirme ve Raporlama</Typography>
                        <Typography variant="caption">4. Ay</Typography>
                        <Typography>Elde edilen verilerle başarı metriklerini ve tam ölçekli bütçeyi ortaya koyacağız.</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary"><DonutLargeIcon /></TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                     <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" component="h4">FAZ 3: Tam Ölçekli Yaygınlaştırma</Typography>
                        <Typography variant="caption">5. Aydan İtibaren</Typography>
                        <Typography>Projenin başarısı kanıtlandıktan sonra, sistemi tüm Mezitli geneline yaygınlaştıracağız.</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    </Box>
);

const CtaSection = () => (
    <Box component="section" sx={{ textAlign: 'center', py: 8, mt: 8 }}>
        <Typography variant="h3" component="h3" sx={{ color: colors.primaryDark }}>Mezitli İçin Karar Zamanı</Typography>
        <Typography sx={{ color: colors.textLight, mt: 2, maxWidth: '750px', mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Bu proje, bir harcama değil, geleceğimize yapılmış, kendi kendini finanse eden stratejik bir yatırımdır.
        </Typography>
        <Button
            variant="contained"
            size="large"
            sx={{
                mt: 4,
                backgroundColor: colors.accent,
                color: colors.primaryDark,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                py: 1.5,
                px: 6,
                borderRadius: '50px',
                '&:hover': {
                    backgroundColor: '#FDB913',
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                transition: '0.3s'
            }}
        >
            Projeyi Onaylıyorum
        </Button>
    </Box>
);

const Footer = () => (
    <Box component="footer" sx={{ backgroundColor: colors.primaryDark, color: colors.white, mt: 8, py: 3 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="body2">&copy; {new Date().getFullYear()} Mezitli Belediyesi. Tüm Hakları Saklıdır.</Typography>
        </Container>
    </Box>
);

// --- Ana Uygulama Bileşeni ---
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg" component="main" sx={{ py: { xs: 4, md: 6 } }}>
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <ImpactSection />
                <RoadmapSection />
                <CtaSection />
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
