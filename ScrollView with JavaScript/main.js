const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home`)
sr.reveal(`.about .left`, {origin: 'left'})
sr.reveal(`.about .right`, {origin: 'right'})
sr.reveal(`.contact_one`)
sr.reveal(`.contact_two`)
sr.reveal(`.contact_three`)
