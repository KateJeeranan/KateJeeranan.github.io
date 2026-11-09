/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/


/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*==================== STATS COUNTER ====================*/
const counters = document.querySelectorAll('.counter')

function runCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0
    const duration = 1200
    const start = performance.now()
    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)))
        if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target)
                obs.unobserve(entry.target)
            }
        })
    }, { threshold: .6 })
    counters.forEach(c => counterObserver.observe(c))
} else {
    counters.forEach(c => { c.textContent = c.dataset.target })
}

/*==================== JOURNEY: TYPE + YEAR FILTER ====================*/
const yearGroups = [...document.querySelectorAll('.journey__year')]
const allCards = [...document.querySelectorAll('.journey__year .jcard')]
const typeIcons = {
    hackathon: 'uil-brackets-curly', competition: 'uil-trophy', workshop: 'uil-wrench',
    bootcamp: 'uil-graduation-cap', course: 'uil-book-open', conference: 'uil-microphone',
    talk: 'uil-microphone', volunteer: 'uil-heart', camp: 'uil-fire', 'tv show': 'uil-tv-retro'
}
// Thai names for activity types (anything not listed shows as typed)
const typeThai = {
    hackathon: 'แฮกกาธอน', competition: 'การแข่งขัน', workshop: 'เวิร์กช็อป',
    bootcamp: 'บูตแคมป์', course: 'คอร์สเรียน', conference: 'งานสัมมนา',
    talk: 'งานทอล์ก', volunteer: 'จิตอาสา', camp: 'ค่าย', 'tv show': 'รายการทีวี'
}
const iconFor = t => typeIcons[t.toLowerCase()] || 'uil-tag'
// bilingual text: CSS shows only the span matching the current language
const bi = (th, en) => '<span lang="th">' + th + '</span><span lang="en">' + en + '</span>'
const typeLabel = t => bi(typeThai[t.toLowerCase()] || t, t)
const plural = n => bi(n + ' กิจกรรม', n + (n === 1 ? ' activity' : ' activities'))

// type label on each card, generated from data-type
allCards.forEach(card => {
    const t = card.dataset.type
    const body = card.querySelector('.jcard__body')
    if (!t || !body) return
    const label = document.createElement('span')
    label.className = 'jcard__type'
    label.innerHTML = '<i class="uil ' + iconFor(t) + '"></i> ' + typeLabel(t)
    body.prepend(label)
})

// hero counter with data-target="auto" = number of activity cards
document.querySelectorAll('.counter[data-target="auto"]').forEach(c => { c.dataset.target = allCards.length })
// hero counter with data-target="auto-years" = first year to latest year in the journey
const journeyYears = yearGroups.map(g => parseInt(g.dataset.year, 10)).filter(Boolean)
document.querySelectorAll('.counter[data-target="auto-years"]').forEach(c => {
    c.dataset.target = journeyYears.length ? Math.max(...journeyYears) - Math.min(...journeyYears) + 1 : 0
})

const filterState = { type: 'all', year: 'all' }

function applyJourneyFilter() {
    yearGroups.forEach(group => {
        let shown = 0
        group.querySelectorAll('.jcard').forEach(card => {
            const ok = filterState.type === 'all' || card.dataset.type === filterState.type
            card.hidden = !ok
            if (ok) shown++
        })
        group.hidden = shown === 0 || (filterState.year !== 'all' && group.dataset.year !== filterState.year)
        const count = group.querySelector('.journey__year-count')
        if (count) count.innerHTML = plural(shown)
    })
    if (window.AOS) AOS.refresh()
}

function buildChips(boxId, key, allLabel, options) {
    const box = document.getElementById(boxId)
    if (!box) return
    if (options.length < 2) { box.hidden = true; return }
    const list = [['all', allLabel, allCards.length, null]].concat(options)
    list.forEach(([value, label, n, icon], i) => {
        const chip = document.createElement('button')
        chip.type = 'button'
        chip.className = 'journey__chip' + (i === 0 ? ' is-active' : '')
        chip.innerHTML = (icon ? '<i class="uil ' + icon + '"></i> ' : '') + label + '<span class="journey__chip-count">' + n + '</span>'
        chip.addEventListener('click', () => {
            box.querySelectorAll('.journey__chip').forEach(c => c.classList.remove('is-active'))
            chip.classList.add('is-active')
            filterState[key] = value
            applyJourneyFilter()
        })
        box.appendChild(chip)
    })
}

buildChips('filter-year', 'year', bi('ทุกปี', 'All years'), yearGroups.map(g => [g.dataset.year, g.dataset.year, g.querySelectorAll('.jcard').length, null]))
applyJourneyFilter()

/*==================== LANGUAGE TOGGLE (TH / EN) ====================*/
const langButton = document.getElementById('lang-button')

if (langButton) {
    langButton.addEventListener('click', () => {
        const root = document.documentElement
        const next = root.getAttribute('data-lang') === 'en' ? 'th' : 'en'
        root.setAttribute('data-lang', next)
        root.lang = next
        try { localStorage.setItem('selected-lang', next) } catch (e) {}
        if (window.AOS) AOS.refresh()
    })
}

/*==================== JOURNEY: PHOTO LIGHTBOX ====================*/
const lightbox = document.getElementById('lightbox')

if (lightbox) {
    const lbImg = document.getElementById('lightbox-img'),
        lbCaption = document.getElementById('lightbox-caption'),
        lbPrev = document.getElementById('lightbox-prev'),
        lbNext = document.getElementById('lightbox-next')
    let photos = [], index = 0

    const show = () => {
        const photo = photos[index]
        lbImg.src = photo.src
        lbImg.alt = photo.alt
        lbCaption.textContent = photo.alt + (photos.length > 1 ? '  (' + (index + 1) + '/' + photos.length + ')' : '')
        lbPrev.hidden = lbNext.hidden = photos.length < 2
    }
    const close = () => { lightbox.hidden = true; document.body.style.overflow = '' }
    const step = d => { index = (index + d + photos.length) % photos.length; show() }

    document.querySelectorAll('.jcard__media').forEach(media => {
        const imgs = [...media.querySelectorAll('img')]
        if (!imgs.length) return
        if (imgs.length > 1) {
            const badge = document.createElement('span')
            badge.className = 'jcard__more'
            badge.innerHTML = '<i class="uil uil-images"></i> +' + (imgs.length - 1)
            media.appendChild(badge)
        }
        media.addEventListener('click', () => {
            photos = imgs.map(img => ({ src: img.src, alt: img.alt }))
            index = 0
            show()
            lightbox.hidden = false
            document.body.style.overflow = 'hidden'
        })
    })

    document.getElementById('lightbox-close').addEventListener('click', close)
    lbPrev.addEventListener('click', () => step(-1))
    lbNext.addEventListener('click', () => step(1))
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close() })
    document.addEventListener('keydown', e => {
        if (lightbox.hidden) return
        if (e.key === 'Escape') close()
        if (e.key === 'ArrowLeft') step(-1)
        if (e.key === 'ArrowRight') step(1)
    })
}
