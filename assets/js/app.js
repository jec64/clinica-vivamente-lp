/* 
  Vivamente | Clínica Multidisciplinar
  JavaScript de Interatividade e Rastreamento (GTM / Google Ads)
*/

// Inicialização do Google Tag Manager dataLayer
window.dataLayer = window.dataLayer || [];

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initPrivacyModal();
  initTrackingEvents();
  initFloatingWhatsAppTooltip();
  initActiveNavOnScroll();
  initConvenioLegend();
});

/**
 * 1. Animação e comportamento do cabeçalho ao rolar a página
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 2. Controle do Menu Hambúrguer em dispositivos móveis
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Fecha o menu ao clicar em qualquer link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

/**
 * 3. Modal de Política de Privacidade (LGPD)
 */
function initPrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  const openBtns = document.querySelectorAll('.open-privacy-modal');
  const closeBtns = document.querySelectorAll('.close-privacy-modal');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  // Fechar ao clicar fora do conteúdo do modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * 4. Rastreamento de Conversões para Google Ads & Analytics
 */
function initTrackingEvents() {
  // Cliques nos Botões do WhatsApp
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], .btn-whatsapp, .track-whatsapp');
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const specialty = btn.getAttribute('data-specialty') || 'Geral';
      
      // Disparo do evento customizado para o GTM / Google Ads
      window.dataLayer.push({
        'event': 'click_whatsapp_agendamento',
        'conversion_category': 'Agendamento WhatsApp',
        'specialty_target': specialty,
        'click_time': new Date().toISOString()
      });
      
      console.log('Conversão Rasteada: click_whatsapp_agendamento (' + specialty + ')');
    });
  });

  // Cliques no Botão de Rota no Google Maps
  const mapsButtons = document.querySelectorAll('a[href*="google.com/maps"], .track-maps');
  mapsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.dataLayer.push({
        'event': 'click_google_maps',
        'conversion_category': 'Localizacao e Rota',
        'click_time': new Date().toISOString()
      });
      
      console.log('Conversão Rastreada: click_google_maps');
    });
  });
}

/**
 * 5. Micro-interação: Exibição do Tooltip do WhatsApp flutuante
 */
function initFloatingWhatsAppTooltip() {
  const floatingBtn = document.querySelector('.floating-whatsapp');
  if (!floatingBtn) return;

  // Exibe a mensagem de atenção após 4 segundos
  setTimeout(() => {
    floatingBtn.classList.add('show-tooltip');
  }, 4000);

  // Oculta após 12 segundos
  setTimeout(() => {
    floatingBtn.classList.remove('show-tooltip');
  }, 12000);
}

/**
 * 6. Destaque dinâmico do link ativo no menu conforme o scroll da página
 */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset para leitura antecipada

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * 7. Legenda Dinâmica para Convênios de Saúde
 */
function initConvenioLegend() {
  const cards = document.querySelectorAll('.partner-card[data-convenio]');
  const legendBox = document.getElementById('convenio-legend');
  if (!legendBox || cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards
      cards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      card.classList.add('active');

      const name = card.getAttribute('data-convenio');
      const desc = card.getAttribute('data-cobertura');

      // Smooth fade transition
      legendBox.style.opacity = '0';
      legendBox.style.transform = 'translateY(4px)';
      
      setTimeout(() => {
        legendBox.innerHTML = `
          <div class="legend-active-content">
            <strong>Cobertura ${name}:</strong>
            <span>${desc}</span>
          </div>
        `;
        legendBox.style.opacity = '1';
        legendBox.style.transform = 'translateY(0)';
      }, 150);
    });
  });
}
