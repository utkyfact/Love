const lockScreen = document.getElementById('lockScreen');
const parallaxBg = document.querySelector('.parallax-bg');
const cards = document.querySelectorAll('.card');

// En son görünen kartı takip etmek için değişken
let lastVisibleCard = null;

// Kilit ekranını kaldır
lockScreen.addEventListener('click', () => {
    lockScreen.classList.add('hidden');
});

// Intersection Observer oluştur
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Kartın görünürlük durumunu güncelle
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            lastVisibleCard = entry.target;
            updateBackground(entry.target);
        } else {
            entry.target.classList.remove('visible');
        }

        // Görünür kartları kontrol et ve en üsttekini bul
        const visibleCards = Array.from(cards).filter(card =>
            card.getBoundingClientRect().top <= window.innerHeight / 2 &&
            card.getBoundingClientRect().bottom >= window.innerHeight / 2
        );

        if (visibleCards.length > 0) {
            // En üstteki kartın arka planını göster
            const topCard = visibleCards[0];
            updateBackground(topCard);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-100px'
});

// Arka planı güncellemek için fonksiyon
function updateBackground(card) {
    const bgUrl = card.dataset.bg;
    if (bgUrl) {
        parallaxBg.style.backgroundImage = `url('${bgUrl}')`;
    }
};

// Her card'ı gözlemle
cards.forEach(card => {
    observer.observe(card);
});

// Sayfa scroll olayını dinle
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        // En üstteyken varsayılan arka plan rengini göster
        parallaxBg.style.backgroundImage = '';
        parallaxBg.style.backgroundColor = '#FFE6F0';
    } else {
        // Sayfa en üstte değilken görünür kartları kontrol et
        const visibleCards = Array.from(cards).filter(card =>
            card.getBoundingClientRect().top <= window.innerHeight / 2 &&
            card.getBoundingClientRect().bottom >= window.innerHeight / 2
        );

        // Eğer görünür bir kart varsa, onun arka planını ayarla
        if (visibleCards.length > 0) {
            const topCard = visibleCards[0];
            updateBackground(topCard);
        }
    }
});