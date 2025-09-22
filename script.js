document.addEventListener('DOMContentLoaded', function () {

  // ------------------
  // 헤더 스크롤 효과 (스크립트는 변경 없음)
  // ------------------
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // ------------------
  // 모바일 메뉴 토글
  // ------------------
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', () => {
          nav.classList.toggle('is-active');
          mobileToggle.classList.toggle('is-active');
          document.body.style.overflow = nav.classList.contains('is-active') ? 'hidden' : '';
          const icon = mobileToggle.querySelector('i');
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
      });
  }
  
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (nav.classList.contains('is-active')) {
              nav.classList.remove('is-active');
              mobileToggle.classList.remove('is-active');
              document.body.style.overflow = '';
              const icon = mobileToggle.querySelector('i');
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });
  });

  // ------------------
  // 스크롤 애니메이션 (Fade-in)
  // ------------------
  const animatedElements = document.querySelectorAll('.service-card, .about-image, .about-text, .faq-item, .facilities-text, .facilities-images');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
  });

  // ------------------
  // FAQ 아코디언 (하나만 열리게 하는 기능 추가)
  // ------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
      item.addEventListener('toggle', (event) => {
          if (event.target.open) {
              faqItems.forEach(otherItem => {
                  if (otherItem !== event.target) {
                      otherItem.open = false;
                  }
              });
          }
      });
  });

  // ------------------
  // 시설 안내 이미지 갤러리
  // ------------------
  const facilityThumbnails = document.querySelectorAll('.facility-thumbnails img');
  const mainFacilityImage = document.querySelector('.main-facility-image img');

  if (facilityThumbnails.length > 0 && mainFacilityImage) {
      facilityThumbnails.forEach(thumbnail => {
          thumbnail.addEventListener('click', function () {
              mainFacilityImage.style.opacity = '0';
              setTimeout(() => {
                  mainFacilityImage.src = this.src;
                  mainFacilityImage.alt = this.alt;
                  mainFacilityImage.style.opacity = '1';
              }, 300);
          });
      });
  }

  // ------------------
  // 모달 관련 기능 (CTA 버튼용)
  // ------------------
  const ctaButton = document.querySelector('.cta-button');
  const modal = document.getElementById('consultationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeIconBtn = document.querySelector('.close-btn');
  const copyPhoneNumberBtn = document.getElementById('copyPhoneNumberBtn');

  function openModal() {
      if (modal) {
          modal.classList.add('show');
          document.body.style.overflow = 'hidden';
      }
  }

  function closeModal() {
      if (modal) {
          modal.classList.remove('show');
          document.body.style.overflow = '';
      }
  }
  
  // CTA 버튼만 모달 열기
  if (ctaButton) ctaButton.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeIconBtn) closeIconBtn.addEventListener('click', closeModal);
  
  if (modal) {
      modal.addEventListener('click', (e) => {
          if (e.target === modal) {
              closeModal();
          }
      });
  }
  
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
          closeModal();
      }
  });

  if (copyPhoneNumberBtn) {
      copyPhoneNumberBtn.addEventListener('click', () => {
          const phoneNumber = '031-772-9190';
          navigator.clipboard.writeText(phoneNumber).then(() => {
              const originalText = copyPhoneNumberBtn.innerHTML;
              copyPhoneNumberBtn.innerHTML = '<i class="fas fa-check"></i> 복사 완료!';
              copyPhoneNumberBtn.style.background = 'var(--secondary-color)';
              
              setTimeout(() => {
                  copyPhoneNumberBtn.innerHTML = originalText;
                  copyPhoneNumberBtn.style.background = '';
              }, 2000);
          }).catch(err => {
              console.error('복사 실패:', err);
              alert('전화번호 복사에 실패했습니다.');
          });
      });
  }
  
  console.log('블루밍케어 방문요양센터 웹사이트 로딩 완료!');
});