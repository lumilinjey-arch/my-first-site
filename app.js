// 1. Логика Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Имитация загрузки 1.5 секунды
});

// 2. Логика 3D сцены для Hero (Сфера)
const heroContainer = document.getElementById('webgl-container');
if (heroContainer) {
    const sceneHero = new THREE.Scene();
    const cameraHero = new THREE.PerspectiveCamera(75, heroContainer.clientWidth / heroContainer.clientHeight, 0.1, 1000);
    const rendererHero = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    rendererHero.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    heroContainer.appendChild(rendererHero.domElement);

    const geoHero = new THREE.SphereGeometry(3, 32, 32);
const matHero = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.15 });
const sphereHero = new THREE.Mesh(geoHero, matHero);
sceneHero.add(sphereHero);
cameraHero.position.z = 6;

// НОВОЕ: Отслеживаем координаты мыши для 3D сферы
let targetRotationX = 0;
let targetRotationY = 0;

document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = mouseX * 0.5;
    targetRotationX = mouseY * 0.5;
});

function animateHero() {
    requestAnimationFrame(animateHero);
    // Базовое вращение
    sphereHero.rotation.y += 0.002;
    // Плавный поворот за мышью (эффект инерции)
    sphereHero.rotation.x += 0.05 * (targetRotationX - sphereHero.rotation.x);
    sphereHero.rotation.y += 0.05 * (targetRotationY - sphereHero.rotation.y);
    rendererHero.render(sceneHero, cameraHero);
}
animateHero();
}

// 3. Логика 3D сцены для блока Case Study
const caseContainer = document.getElementById('case-webgl-container');
if (caseContainer) {
    const sceneCase = new THREE.Scene();
    const cameraCase = new THREE.PerspectiveCamera(75, caseContainer.clientWidth / caseContainer.clientHeight, 0.1, 1000);
    const rendererCase = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererCase.setSize(caseContainer.clientWidth, caseContainer.clientHeight);
    caseContainer.appendChild(rendererCase.domElement);

    const geometryCase = new THREE.TorusKnotGeometry(3.5, 0.8, 120, 16);
    const materialCase = new THREE.MeshBasicMaterial({ 
        color: 0x00e5ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const torusKnot = new THREE.Mesh(geometryCase, materialCase);
    sceneCase.add(torusKnot);

    cameraCase.position.z = 11.5;
    torusKnot.position.x = 2;
    torusKnot.position.y = -0.5;

    function animateCase() {
        requestAnimationFrame(animateCase);
        torusKnot.rotation.x += 0.001;
        torusKnot.rotation.y += 0.002;
        rendererCase.render(sceneCase, cameraCase);
    }
    animateCase();

    window.addEventListener('resize', () => {
        cameraCase.aspect = caseContainer.clientWidth / caseContainer.clientHeight;
        cameraCase.updateProjectionMatrix();
        rendererCase.setSize(caseContainer.clientWidth, caseContainer.clientHeight);
    });
}

// 4. Логика 3D сцены для блока Coalition (Инвесторы)
const coalitionContainer = document.getElementById('coalition-webgl-container');
if (coalitionContainer) {
    const sceneCoalition = new THREE.Scene();
    const cameraCoalition = new THREE.PerspectiveCamera(75, coalitionContainer.clientWidth / coalitionContainer.clientHeight, 0.1, 1000);
    const rendererCoalition = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererCoalition.setSize(coalitionContainer.clientWidth, coalitionContainer.clientHeight);
    coalitionContainer.appendChild(rendererCoalition.domElement);

    const geometryCore = new THREE.IcosahedronGeometry(2, 0);
    const materialCore = new THREE.MeshBasicMaterial({
        color: 0x5c4dff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const innerCore = new THREE.Mesh(geometryCore, materialCore);
    sceneCoalition.add(innerCore);

    cameraCoalition.position.z = 4.5;

    function animateCoalition() {
        requestAnimationFrame(animateCoalition);
        innerCore.rotation.x -= 0.002;
        innerCore.rotation.y -= 0.003;
        rendererCoalition.render(sceneCoalition, cameraCoalition);
    }
    animateCoalition();

    window.addEventListener('resize', () => {
        cameraCoalition.aspect = coalitionContainer.clientWidth / coalitionContainer.clientHeight;
        cameraCoalition.updateProjectionMatrix();
        rendererCoalition.setSize(coalitionContainer.clientWidth, coalitionContainer.clientHeight);
    });
}

// 5. Логика 3D сцены для блока Thesis (Облако данных)
const thesisContainer = document.getElementById('thesis-webgl-container');
if (thesisContainer) {
    const sceneThesis = new THREE.Scene();
    const cameraThesis = new THREE.PerspectiveCamera(75, thesisContainer.clientWidth / thesisContainer.clientHeight, 0.1, 1000);
    const rendererThesis = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererThesis.setSize(thesisContainer.clientWidth, thesisContainer.clientHeight);
    thesisContainer.appendChild(rendererThesis.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x5c4dff,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneThesis.add(particlesMesh);

    cameraThesis.position.z = 4;

    function animateThesis() {
        requestAnimationFrame(animateThesis);
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        rendererThesis.render(sceneThesis, cameraThesis);
    }
    animateThesis();

    window.addEventListener('resize', () => {
        cameraThesis.aspect = thesisContainer.clientWidth / thesisContainer.clientHeight;
        cameraThesis.updateProjectionMatrix();
        rendererThesis.setSize(thesisContainer.clientWidth, thesisContainer.clientHeight);
    });
}

// 6. Логика 3D сцены для блока Events (Цифровая волна)
const eventsContainer = document.getElementById('events-webgl-container');
if (eventsContainer) {
    const sceneEvents = new THREE.Scene();
    const cameraEvents = new THREE.PerspectiveCamera(75, eventsContainer.clientWidth / eventsContainer.clientHeight, 0.1, 1000);
    const rendererEvents = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererEvents.setSize(eventsContainer.clientWidth, eventsContainer.clientHeight);
    eventsContainer.appendChild(rendererEvents.domElement);

    const geometryWave = new THREE.PlaneGeometry(30, 20, 40, 30);
    const materialWave = new THREE.PointsMaterial({
        color: 0x00e5ff,
        size: 0.05,
        transparent: true,
        opacity: 0.4
    });

    const waveMesh = new THREE.Points(geometryWave, materialWave);
    waveMesh.rotation.x = -Math.PI / 2.5;
    waveMesh.position.y = -3;
    waveMesh.position.z = -5;
    sceneEvents.add(waveMesh);

    cameraEvents.position.z = 5;
    cameraEvents.position.y = 1;
    let clock = new THREE.Clock();

    function animateEvents() {
        requestAnimationFrame(animateEvents);
        
        let time = clock.getElapsedTime();
        let position = geometryWave.attributes.position;
        
        for (let i = 0; i < position.count; i++) {
            let x = position.getX(i);
            let y = position.getY(i);
            let z = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time * 0.8) * 0.5;
            position.setZ(i, z);
        }
        position.needsUpdate = true;

        rendererEvents.render(sceneEvents, cameraEvents);
    }
    animateEvents();

    window.addEventListener('resize', () => {
        cameraEvents.aspect = eventsContainer.clientWidth / eventsContainer.clientHeight;
        cameraEvents.updateProjectionMatrix();
        rendererEvents.setSize(eventsContainer.clientWidth, eventsContainer.clientHeight);
    });
}

// 7. Логика 3D сцены для блока Impact (Кольца)
const impactContainer = document.getElementById('impact-webgl-container');
if (impactContainer) {
    const sceneImpact = new THREE.Scene();
    const cameraImpact = new THREE.PerspectiveCamera(75, impactContainer.clientWidth / impactContainer.clientHeight, 0.1, 1000);
    const rendererImpact = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererImpact.setSize(impactContainer.clientWidth, impactContainer.clientHeight);
    impactContainer.appendChild(rendererImpact.domElement);

    const geoOuter = new THREE.TorusGeometry(6.5, 1.2, 16, 100);
    const matOuter = new THREE.PointsMaterial({ 
        color: 0x00e5ff, size: 0.02, transparent: true, opacity: 0.4 
    });
    const ringOuter = new THREE.Points(geoOuter, matOuter);
    ringOuter.rotation.x = Math.PI / 2.2; 
    sceneImpact.add(ringOuter);

    const geoInner = new THREE.TorusGeometry(3.5, 0.5, 16, 80);
    const matInner = new THREE.PointsMaterial({ 
        color: 0x5c4dff, size: 0.03, transparent: true, opacity: 0.6 
    });
    const ringInner = new THREE.Points(geoInner, matInner);
    ringInner.rotation.x = Math.PI / 2.5; 
    sceneImpact.add(ringInner);

    cameraImpact.position.z = 8; 

    function animateImpact() {
        requestAnimationFrame(animateImpact);
        ringOuter.rotation.z -= 0.001;
        ringInner.rotation.z += 0.002;
        rendererImpact.render(sceneImpact, cameraImpact);
    }
    animateImpact();

    window.addEventListener('resize', () => {
        cameraImpact.aspect = impactContainer.clientWidth / impactContainer.clientHeight;
        cameraImpact.updateProjectionMatrix();
        rendererImpact.setSize(impactContainer.clientWidth, impactContainer.clientHeight);
    });
}

// 8. Логика Модального окна (Терминал формы)
const modalOverlay = document.getElementById('invite-modal');
const closeBtn = document.getElementById('close-modal-btn');
const inviteForm = document.getElementById('invite-form');
const formContainer = document.getElementById('modal-form-container');
const successContainer = document.getElementById('modal-success-container');

if (modalOverlay) {
    // Ищем абсолютно все ссылки с href="#apply"
    const openBtns = document.querySelectorAll('a[href="#apply"]');

    openBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Блокируем стандартный переход (прыжок наверх)
            modalOverlay.classList.add('active');
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            formContainer.style.display = 'block';
            successContainer.style.display = 'none';
            if(inviteForm) inviteForm.reset();
        }, 300);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    if(inviteForm) {
        inviteForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            formContainer.style.display = 'none';
            successContainer.style.display = 'block';
        });
    }
}
// 9. Scroll Reveal (Надежное появление при скролле)
const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .number-card, .thesis-card, .event-item, .case-card');

revealElements.forEach(el => el.classList.add('reveal'));

const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

// Проверяем при скролле и сразу при загрузке
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);
checkReveal(); // На случай, если элементы уже в зоне видимости


// 10. Cyber HUD Cursor (Логика прицела)
if (window.matchMedia("(pointer: fine)").matches) {
    const dot = document.createElement('div');
    dot.classList.add('hud-cursor-dot');
    const cross = document.createElement('div');
    cross.classList.add('hud-cursor-cross');
    
    document.body.appendChild(dot);
    document.body.appendChild(cross);

    let mouseX = 0, mouseY = 0;
    let crossX = 0, crossY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Плавное следование рамки прицела за точкой
    function animateHUD() {
        crossX += (mouseX - crossX) * 0.25;
        crossY += (mouseY - crossY) * 0.25;
        cross.style.left = `${crossX}px`;
        cross.style.top = `${crossY}px`;
        requestAnimationFrame(animateHUD);
    }
    animateHUD();

    // Реакция на интерактивные элементы
    const interactables = document.querySelectorAll('a, button, input, .logo');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cross.classList.add('active'));
        el.addEventListener('mouseleave', () => cross.classList.remove('active'));
    });
}
// 11. Interactive VC Deal-Flow Simulator
const simStartBtn = document.getElementById('sim-start-btn');
const simRestartBtn = document.getElementById('sim-restart-btn');
const simScreenStart = document.getElementById('sim-screen-start');
const simScreenGame = document.getElementById('sim-screen-game');
const simScreenResult = document.getElementById('sim-screen-result');

const simCurrentRound = document.getElementById('sim-current-round');
const simPitchTitle = document.getElementById('sim-pitch-title');
const simPitchDesc = document.getElementById('sim-pitch-desc');
const simMetricSector = document.getElementById('sim-metric-sector');
const simMetricAsk = document.getElementById('sim-metric-ask');
const simMetricTeam = document.getElementById('sim-metric-team');

const simInvestBtn = document.getElementById('sim-invest-btn');
const simPassBtn = document.getElementById('sim-pass-btn');
const simScoreEl = document.getElementById('sim-score');
const simResultText = document.getElementById('sim-result-text');

const pitches = [
    {
        title: "NEURA-SWAP // Autonomous DeFi Agent",
        desc: "An AI agent that autonomously routes cross-chain liquidity using zero-knowledge proofs, bypassing centralized market makers entirely.",
        sector: "DefAI / ZK",
        ask: "$500K (Seed)",
        team: "Ex-DeepMind & Paradigm researchers",
        isGood: true,
        feedback: "Correct call! Strong technical moat and top-tier background."
    },
    {
        title: "MEME-GPT // Social Token Launchpad",
        desc: "A wrapper around GPT-4 that instantly deploys community meme tokens based on trending Twitter hashtags with zero utility.",
        sector: "Consumer / Meme",
        ask: "$200K (Pre-Seed)",
        team: "Anon Twitter influencers",
        isGood: false,
        feedback: "Good pass. High hype, zero long-term infrastructure value."
    },
    {
        title: "QUANTUM-DEPIN // Decentralized GPU Mesh",
        desc: "A permissionless hardware grid aggregating idle consumer graphics cards for heavy neural network training in a trustless environment.",
        sector: "DePIN / AI Compute",
        ask: "$750K (Seed)",
        team: "Ex-NVIDIA engineers",
        isGood: true,
        feedback: "Correct call! Massive demand for decentralized compute."
    }
];

let currentRound = 0;
let score = 0;

if (simStartBtn) {
    simStartBtn.addEventListener('click', () => {
        simScreenStart.style.display = 'none';
        simScreenGame.style.display = 'flex';
        currentRound = 0;
        score = 0;
        loadPitch();
    });

    simRestartBtn.addEventListener('click', () => {
        simScreenResult.style.display = 'none';
        simScreenStart.style.display = 'flex';
    });

    const loadPitch = () => {
        if (currentRound < pitches.length) {
            let p = pitches[currentRound];
            simCurrentRound.innerText = currentRound + 1;
            simPitchTitle.innerText = p.title;
            simPitchDesc.innerText = p.desc;
            simMetricSector.innerText = p.sector;
            simMetricAsk.innerText = p.ask;
            simMetricTeam.innerText = p.team;
        } else {
            showResults();
        }
    };

    const handleChoice = (invested) => {
        let p = pitches[currentRound];
        // Если инвестировал в хороший или скипнул плохой — плюс балл
        if ((invested && p.isGood) || (!invested && !p.isGood)) {
            score++;
        }
        currentRound++;
        loadPitch();
    };

    simInvestBtn.addEventListener('click', () => handleChoice(true));
    simPassBtn.addEventListener('click', () => handleChoice(false));

    const showResults = () => {
        simScreenGame.style.display = 'none';
        simScreenResult.style.display = 'flex';
        simScoreEl.innerText = score;
        
        if (score === 3) {
            simResultText.innerText = "Legendary instinct! You have the exact profile of a Lead Partner at zkSynergy. Your capital allocation strategy is spot on.";
        } else if (score === 2) {
            simResultText.innerText = "Solid performance. You avoided the major traps, though one high-potential protocol slipped past your radar.";
        } else {
            simResultText.innerText = "Rookie numbers. You funded a pump-and-dump scheme and missed the infrastructure wave. Time to study our thesis!";
        }
    };
}


// 13. ROI Calculator Logic
const roiCapital = document.getElementById('roi-capital');
const roiTime = document.getElementById('roi-time');
const roiCapitalVal = document.getElementById('roi-capital-val');
const roiTimeVal = document.getElementById('roi-time-val');
const roiMult = document.getElementById('roi-mult');
const roiTotal = document.getElementById('roi-total');

if (roiCapital && roiTime) {
    const calculateROI = () => {
        let cap = parseFloat(roiCapital.value);
        let years = parseFloat(roiTime.value);
        
        // Формула венчурной симуляции: База 1.0x + (Время * Рост) * Бонус за объем капитала
        let volumeBonus = 1 + (cap / 1000000); 
        let multiplier = 1.0 + (years * 2.1) * volumeBonus;
        
        // Округление мультипликатора
        multiplier = multiplier.toFixed(1);
        let totalVal = Math.round(cap * multiplier);
        
        roiCapitalVal.innerText = cap.toLocaleString('en-US');
        roiTimeVal.innerText = years;
        roiMult.innerText = multiplier;
        roiTotal.innerText = totalVal.toLocaleString('en-US');
    };

    roiCapital.addEventListener('input', calculateROI);
    roiTime.addEventListener('input', calculateROI);
    calculateROI(); // Инит при загрузке
}

// 14. Terminal FAQ (Typewriter Effect)
const faqCmds = document.querySelectorAll('.faq-cmd');
const faqTypewriter = document.getElementById('faq-typewriter');
let typeInterval;

faqCmds.forEach(cmd => {
    cmd.addEventListener('click', () => {
        // Убираем активный класс у всех, вешаем на текущую
        faqCmds.forEach(c => c.classList.remove('active'));
        cmd.classList.add('active');
        
        const answer = cmd.getAttribute('data-answer');
        clearInterval(typeInterval);
        faqTypewriter.innerText = '';
        
        let i = 0;
        // Эффект печати текста
        typeInterval = setInterval(() => {
            if (i < answer.length) {
                faqTypewriter.innerHTML += answer.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30); // Скорость печати (мс на символ)
    });
});
// 15. Unified Live Crypto Ticker (Binance API для обеих строк)
async function fetchCryptoPrices() {
    try {
        // Список монет для верхней (Global) и нижней (Portfolio) строки
        const symbols = '["BTCUSDT","ETHUSDT","SOLUSDT","SUIUSDT","TONUSDT","LINKUSDT","FETUSDT","AVAXUSDT","IOUSDT","RENDERUSDT","TAOUSDT","GRTUSDT","WLDUSDT","ARUSDT","NEARUSDT"]';
        const url = 'https://api.binance.com/api/v3/ticker/24hr?symbols=' + encodeURIComponent(symbols);
        
        const response = await fetch(url);
        const data = await response.json();
        
        const priceMap = {};
        data.forEach(item => {
            const coin = item.symbol.replace('USDT', '');
            priceMap[coin] = {
                price: parseFloat(item.lastPrice),
                change: parseFloat(item.priceChangePercent)
            };
        });

        // 1. Обновляем верхнюю строку (Global Market)
        const marketItems = document.querySelectorAll('.market-item');
        marketItems.forEach(item => {
            const coinEl = item.querySelector('.coin');
            const priceEl = item.querySelector('.price');
            const changeEl = item.querySelector('.change');
            
            if (coinEl && priceMap[coinEl.innerText]) {
                const crypto = priceMap[coinEl.innerText];
                let formattedPrice = crypto.price > 10 ? 
                    crypto.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
                    crypto.price.toFixed(3);
                    
                priceEl.innerText = '$' + formattedPrice;
                changeEl.innerText = (crypto.change >= 0 ? '+' : '') + crypto.change.toFixed(2) + '%';
                changeEl.className = 'change ' + (crypto.change >= 0 ? 'pos' : 'neg');
            }
        });

        // 2. Обновляем вторую строку (Portfolio / Инвестиции)
        const portfolioItems = document.querySelectorAll('.live-item');
        portfolioItems.forEach(item => {
            const coinEl = item.querySelector('.p-coin');
            const tickValEl = item.querySelector('.tick-val');
            
            if (coinEl && tickValEl && priceMap[coinEl.innerText]) {
                const crypto = priceMap[coinEl.innerText];
                
                let formattedPrice = crypto.price > 10 ? 
                    crypto.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
                    crypto.price.toFixed(3);
                    
                // Выводим: $Цена (+Процент)
                tickValEl.innerText = '$' + formattedPrice + ' (' + (crypto.change >= 0 ? '+' : '') + crypto.change.toFixed(2) + '%)';
                tickValEl.className = 'tick-val ' + (crypto.change >= 0 ? 'pos' : 'neg');
            }
        });
    } catch (error) {
        console.error("Ошибка загрузки курсов с Binance:", error);
    }
}

// Запускаем сразу и обновляем каждые 10 секунд
fetchCryptoPrices();
setInterval(fetchCryptoPrices, 10000);
// === 1. Шифрование главного заголовка ===
const cipherTitle = document.querySelector('.cipher-heading');
if (cipherTitle) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const originalHTML = cipherTitle.innerHTML; 
    const targetText = cipherTitle.getAttribute('data-text');
    let iterations = 0;
    const interval = setInterval(() => {
        cipherTitle.innerText = targetText.split("").map((letter, index) => {
            if (index < iterations) return targetText[index];
            return letters[Math.floor(Math.random() * letters.length)];
        }).join("");
        if (iterations >= targetText.length) {
            clearInterval(interval);
            cipherTitle.innerHTML = originalHTML; // Возвращаем <br>
        }
        iterations += 1 / 3;
    }, 30);
}

// === 2. Накрутка цифр (CountUp) ===
const counters = document.querySelectorAll('.counter');
setTimeout(() => { 
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const step = target / 50; 
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}, 1500); 

// === 3. Магнитные кнопки ===
const magneticBtns = document.querySelectorAll('.hero .btn-primary, .hero .btn-secondary');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.classList.add('magnet-active');
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', function() {
        this.classList.remove('magnet-active');
        this.style.transform = 'translate(0px, 0px)';
    });
});

// === 4. Загрузка терминала (Boot-up) ===
const bootLogs = document.querySelectorAll('.boot-log');
const terminalData = document.getElementById('terminal-data');
const terminalBoot = document.getElementById('terminal-boot');
if (bootLogs.length > 0 && terminalData) {
    bootLogs.forEach((log, index) => {
        setTimeout(() => { log.style.opacity = '1'; }, 500 + (index * 400));
    });
    setTimeout(() => {
        terminalBoot.style.display = 'none';
        terminalData.style.display = 'block';
    }, 500 + (bootLogs.length * 400) + 600);
}
// === 5. Интерактивная строка CLI (Нажатие Enter) ===
const cliInput = document.getElementById('cli-input');
if (cliInput) {
    cliInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const val = this.value.trim();
            if (val === '') return;
            
            // Блокируем ввод и имитируем обработку
            this.disabled = true; 
            this.value = 'Processing request...';
            this.style.color = '#00e5ff';
            
            setTimeout(() => {
                // Перекидываем пользователя на форму заявки (якорь #apply)
                window.location.href = '#apply'; 
                
                // Возвращаем строку в исходное состояние через секунду
                setTimeout(() => {
                    this.disabled = false;
                    this.value = '';
                    this.style.color = '#fff';
                }, 1000);
            }, 1000);
        }
    });
}

// === 6. Системные уведомления (Live Toasts) ===
document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
        console.error("ОШИБКА: Контейнер для логов всё еще не найден!");
        return; // Останавливаем работу, если контейнера нет
    }

    const toastMessages = [
        "> ZK Prime AI: Scanning <span class='highlight'>GitHub repo</span> of stealth Web3 project...",
        "> Pipeline update: <span class='highlight'>Qualifying</span> new founder...",
        "> Deal flow: Smart contract audit <span class='highlight'>initiated</span>",
        "> Alert: <span class='highlight'>$2M</span> Seed round syndication opened",
        "> AI Agent: Analyzing Tokenomics whitepaper...",
        "> Node synced: Deploying <span class='highlight'>testnet liquidity</span>"
    ];

    const showToast = () => {
        const randomMsg = toastMessages[Math.floor(Math.random() * toastMessages.length)];
        const toast = document.createElement('div');
        toast.className = 'cyber-toast';
        toast.innerHTML = randomMsg;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 5000);
    };

    // Запускаем первый лог через секунду, остальные каждые 10 секунд
    setTimeout(showToast, 1000);
    setInterval(showToast, 10000);
});