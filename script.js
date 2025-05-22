gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true
});

// Scroll suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            smoother.scrollTo(target, true, "top top");
        }
    });
});

// Animação de entrada das sections
gsap.utils.toArray('.section-animate').forEach(section => {
    gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Animação de letras nos h2
document.querySelectorAll('h2').forEach(h2 => {
    const text = h2.textContent;
    h2.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = 0;
        span.style.transform = 'translateY(20px)';
        h2.appendChild(span);
    });
    gsap.to(h2.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: h2,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// Efeito rastro do mouse
const numTrailElements = 20;
const trailElements = [];
const colors = ["#FFFFFF"];

for (let i = 0; i < numTrailElements; i++) {
    const el = document.createElement('div');
    el.classList.add('mouse-trail-element');
    el.style.backgroundColor = colors[0];
    el.style.opacity = (1 - i / numTrailElements).toFixed(2);
    document.body.appendChild(el);
    trailElements.push({ el: el, x: 0, y: 0 });
}

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

gsap.ticker.add(() => {
    let x = mouse.x;
    let y = mouse.y;

    trailElements.forEach((trail, i) => {
        trail.x += (x - trail.x) * 0.3;
        trail.y += (y - trail.y) * 0.3;

        gsap.set(trail.el, {
            x: trail.x - 5,
            y: trail.y - 5
        });

        x = trail.x;
        y = trail.y;
    });
});

// Parallax em elementos com .parallax
gsap.utils.toArray(".parallax").forEach(el => {
    gsap.to(el, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Ícones sociais flutuando
gsap.to(".social-links a", {
    y: -10,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 1
});

// Hover animado nas imagens da galeria
gsap.utils.toArray(".logo-item img").forEach(img => {
    img.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, rotate: 2, duration: 0.3 });
    });
    img.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, rotate: 0, duration: 0.3 });
    });
});

// Botão de contato pulsante
gsap.to(".btn-contato", {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 1
});

// Parallax no vídeo da hero
gsap.to(".hero-background-video", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

console.log("Animações GSAP carregadas com sucesso!");
