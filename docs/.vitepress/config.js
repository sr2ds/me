export default {
    lang: 'en-US',
    title: 'David Silva',
    description: 'My Personal Blog',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Who am I', link: '/about' },
            {
                text: 'Social',
                items: [
                    { text: 'LinkedIn', link: 'https://www.linkedin.com/in/srdavidsilva/' },
                    { text: 'Github', link: 'https://github.com/sr2ds' },
                    { text: 'Peerlist', link: 'https://peerlist.io/srdavidsilva' },
                    { text: 'YouTube', link: 'https://www.youtube.com/channel/UClu_L56kW3ehOpD0rZWDmHg' },
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: ''
          }
    }
}