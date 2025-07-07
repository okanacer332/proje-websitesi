import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Renk Paleti: Brilliant Blues & Energetic
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

// --- Bileşenler ---

const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 style={{ color: colors.primaryDark }} className="text-xl md:text-2xl font-bold">Mezitli Belediyesi</h1>
            <h2 style={{ color: colors.primary }} className="text-md md:text-lg font-semibold">Akıllı Atık Yönetimi</h2>
        </div>
    </header>
);

const HeroSection = () => (
    <section id="hero" className="text-center py-12 md:py-20 bg-gray-100 rounded-2xl mb-12">
        <h2 style={{ color: colors.primaryDark }} className="text-4xl md:text-6xl font-extrabold leading-tight">Geleceğin Mezitli'si İçin<br/><span style={{ color: colors.primaryLight }}>Akıllı Adımlar</span></h2>
        <p style={{ color: colors.textLight }} className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">Kaynaklarımızı koruyan, vatandaşımızın yaşam kalitesini yükselten ve şehrimizi geleceğe taşıyan yenilikçi atık yönetimi projemizi keşfedin.</p>
    </section>
);

const ProblemSection = () => {
    const problems = [
        { icon: '💰', title: 'Yüksek Maliyetler', description: 'Gereksiz yakıt tüketimi ve sık araç bakımı, bütçemizi zorluyor.' },
        { icon: '🗑️', title: 'Çevre Kirliliği', description: 'Taşan konteynerler koku, hijyen ve görüntü kirliliğine yol açıyor.' },
        { icon: '⏰', title: 'Verimsiz Zaman', description: 'Ekiplerimiz, henüz dolmamış konteynerleri kontrol ederek zaman kaybediyor.' },
        { icon: '🗣️', title: 'Vatandaş Şikayetleri', description: 'Atık kaynaklı sorunlar, belediyemize ulaşan şikayetlerin başında geliyor.' },
    ];

    return (
        <section id="problem" className="mb-16">
            <div className="text-center mb-10">
                <h3 style={{ color: colors.primaryDark }} className="text-3xl font-bold">Mevcut Sistemdeki Zorluklar</h3>
                <p style={{ color: colors.textLight }} className="mt-2 max-w-2xl mx-auto">Geleneksel yöntemler, hem bütçemiz hem de çevremiz için sürdürülebilir değil.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {problems.map(problem => (
                    <div key={problem.title} className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                        <span className="text-5xl">{problem.icon}</span>
                        <h4 style={{ color: colors.primary }} className="text-xl font-bold mt-4 mb-2">{problem.title}</h4>
                        <p style={{ color: colors.textLight }}>{problem.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SolutionSection = () => (
    <section id="solution" className="py-16 bg-white rounded-2xl mb-16">
        <div className="text-center mb-12">
            <h3 style={{ color: colors.primaryDark }} className="text-3xl font-bold">Çözüm: Akıllı Atık Yönetim Sistemi</h3>
            <p style={{ color: colors.textLight }} className="mt-2 max-w-2xl mx-auto">Veriye dayalı, 4 adımlı basit ve etkili bir iş akışı.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            <div className="text-center p-4 m-2 w-full md:w-1/5">
                <div style={{ color: colors.primaryLight }} className="text-4xl font-extrabold">1</div>
                <h4 className="font-bold my-2">ÖLÇÜM</h4>
                <p className="text-sm text-gray-600">Konteynerdeki akıllı sensör, doluluk oranını anlık olarak ölçer.</p>
            </div>
            <div style={{ color: colors.primaryLight }} className="text-4xl transform rotate-90 md:rotate-0">→</div>
            <div className="text-center p-4 m-2 w-full md:w-1/5">
                <div style={{ color: colors.primaryLight }} className="text-4xl font-extrabold">2</div>
                <h4 className="font-bold my-2">İLETİM</h4>
                <p className="text-sm text-gray-600">Veri, mobil ağ üzerinden anında merkezi platforma gönderilir.</p>
            </div>
            <div style={{ color: colors.primaryLight }} className="text-4xl transform rotate-90 md:rotate-0">→</div>
            <div className="text-center p-4 m-2 w-full md:w-1/5">
                <div style={{ color: colors.primaryLight }} className="text-4xl font-extrabold">3</div>
                <h4 className="font-bold my-2">PLANLAMA</h4>
                <p className="text-sm text-gray-600">Yapay zeka, en verimli ve en kısa rotayı otomatik olarak oluşturur.</p>
            </div>
            <div style={{ color: colors.primaryLight }} className="text-4xl transform rotate-90 md:rotate-0">→</div>
            <div className="text-center p-4 m-2 w-full md:w-1/5">
                <div style={{ color: colors.primaryLight }} className="text-4xl font-extrabold">4</div>
                <h4 className="font-bold my-2">UYGULAMA</h4>
                <p className="text-sm text-gray-600">Ekip, optimize rota ile zaman ve yakıt israfı olmadan toplamayı tamamlar.</p>
            </div>
        </div>
    </section>
);

const ChartContainer = ({ children }) => (
    <div className="relative w-full max-w-md mx-auto h-80 md:h-96">{children}</div>
);

const FuelChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Mevcut Tüketim', 'Tasarruf Edilen'],
                datasets: [{
                    data: [60, 40],
                    backgroundColor: [colors.primaryDark, colors.accent],
                    borderColor: colors.white,
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: colors.textLight, font: { size: 14 }}},
                    tooltip: { callbacks: { title: (items) => items[0].label }}
                },
                cutout: '70%'
            }
        });
        return () => chartInstance.destroy();
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

const EmissionChart = () => {
    const chartRef = useRef(null);
    
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mevcut Sistem', 'Akıllı Sistem'],
                datasets: [{
                    label: 'Göreceli Karbon Salınımı',
                    data: [100, 70],
                    backgroundColor: [colors.primary, colors.primaryLight],
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, ticks: { color: colors.textLight }, grid: { color: '#E2E8F0' }},
                    x: { ticks: { color: colors.textLight }, grid: { display: false }}
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { title: (items) => items[0].label }}
                }
            }
        });
        return () => chartInstance.destroy();
    }, []);

    return <canvas ref={chartRef}></canvas>;
};


const ImpactSection = () => {
    const kpis = [
        { value: '%40', label: 'Yakıt Tasarrufu' },
        { value: '%30', label: 'Daha Az Emisyon' },
        { value: '%50', label: 'Daha Az Araç Yıpranması' },
    ];

    return (
        <section id="impact" className="mb-16">
            <div className="text-center mb-10">
                <h3 style={{ color: colors.primaryDark }} className="text-3xl font-bold">Projenin Etkisi: Rakamlarla Kazanımlarımız</h3>
                <p style={{ color: colors.textLight }} className="mt-2 max-w-2xl mx-auto">Bu yatırım, kısa sürede kendini finanse edecek somut faydalar sunuyor.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h4 style={{ color: colors.primaryDark }} className="text-xl font-bold mb-4 text-center">Yakıt Tüketimi Karşılaştırması</h4>
                    <p className="text-gray-600 text-center mb-4">Akıllı sistem, gereksiz seferleri ortadan kaldırarak yakıt tüketiminde %40'a varan oranda tasarruf sağlıyor.</p>
                    <ChartContainer><FuelChart /></ChartContainer>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h4 style={{ color: colors.primaryDark }} className="text-xl font-bold mb-4 text-center">Karbon Salınımı Azalımı</h4>
                    <p className="text-gray-600 text-center mb-4">Daha az yakıt tüketimi, doğrudan daha az karbon salınımı ve daha temiz bir Mezitli anlamına geliyor.</p>
                    <ChartContainer><EmissionChart /></ChartContainer>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {kpis.map(kpi => (
                    <div key={kpi.label} className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 style={{ color: colors.primary }} className="text-5xl font-extrabold">{kpi.value}</h3>
                        <p className="font-semibold mt-2">{kpi.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const RoadmapSection = () => (
    <section id="roadmap" className="py-16 bg-white rounded-2xl">
        <div className="text-center mb-12">
            <h3 style={{ color: colors.primaryDark }} className="text-3xl font-bold">Proje Yol Haritamız</h3>
            <p style={{ color: colors.textLight }} className="mt-2 max-w-2xl mx-auto">Projeyi, yönetilebilir adımlarla ve başarıyı garanti altına alarak hayata geçireceğiz.</p>
        </div>
        <div className="relative pl-8 border-l-4 border-gray-200 ml-4 max-w-3xl mx-auto">
            <div className="mb-12 relative before:content-[''] before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:rounded-full before:bg-[#00A1E4] before:border-4 before:border-white">
                <h4 style={{ color: colors.primaryLight }} className="text-xl font-bold">FAZ 1: Pilot Uygulama ve Test</h4>
                <p className="font-semibold text-gray-500">İlk 3 Ay</p>
                <p className="mt-2 text-gray-700">Sistemi ilk olarak, hem turistik hem de yerleşik nüfusun yoğun olduğu <strong>Viranşehir ve Davultepe sahil bandında</strong> 150 konteyner ile test edeceğiz.</p>
            </div>
            <div className="mb-12 relative before:content-[''] before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:rounded-full before:bg-[#00A1E4] before:border-4 before:border-white">
                <h4 style={{ color: colors.primaryLight }} className="text-xl font-bold">FAZ 2: Değerlendirme ve Raporlama</h4>
                <p className="font-semibold text-gray-500">4. Ay</p>
                <p className="mt-2 text-gray-700">Pilot bölgeden elde edilen verileri analiz ederek net başarı metriklerini ve tam ölçekli uygulama bütçesini ortaya koyacağız.</p>
            </div>
            <div className="relative before:content-[''] before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:rounded-full before:bg-[#00A1E4] before:border-4 before:border-white">
                <h4 style={{ color: colors.primaryLight }} className="text-xl font-bold">FAZ 3: Tam Ölçekli Yaygınlaştırma</h4>
                <p className="font-semibold text-gray-500">5. Aydan İtibaren</p>
                <p className="mt-2 text-gray-700">Projenin başarısı kanıtlandıktan sonra, sistemi tüm Mezitli geneline, kritik noktalardan başlayarak yaygınlaştıracağız.</p>
            </div>
        </div>
    </section>
);

const CtaSection = () => (
    <section id="cta" className="text-center py-16 mt-12">
        <h3 style={{ color: colors.primaryDark }} className="text-3xl md:text-4xl font-extrabold">Mezitli İçin Karar Zamanı</h3>
        <p style={{ color: colors.textLight }} className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Bu proje, bir harcama değil, geleceğimize yapılmış, kendi kendini finanse eden stratejik bir yatırımdır.</p>
        <button style={{ backgroundColor: colors.accent, color: colors.primaryDark }} className="mt-8 font-bold py-4 px-10 rounded-full text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg">Projeyi Onaylıyorum</button>
    </section>
);

const Footer = () => (
    <footer style={{ backgroundColor: colors.primaryDark }} className="text-white mt-12">
        <div className="container mx-auto px-6 py-4 text-center">
            <p>&copy; {new Date().getFullYear()} Mezitli Belediyesi. Tüm Hakları Saklıdır.</p>
        </div>
    </footer>
);


// --- Ana Uygulama Bileşeni ---

export default function App() {
    return (
        <div style={{ backgroundColor: colors.background }} className="text-gray-800">
            <Header />
            <main className="container mx-auto px-6 py-8 md:py-12">
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <ImpactSection />
                <RoadmapSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    );
}
