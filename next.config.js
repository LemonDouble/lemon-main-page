/** @type {import('next').NextConfig} */
const nextConfig = {
    // 삭제한 상세 화면과 지원을 중단한 언어(ja, zh-cn, zh-tw)의 기존 주소를 이어 준다.
    redirects() {
        return [
            {
                source: '/detail',
                destination: 'https://blog.lemondouble.com/projects/',
                permanent: true,
            },
            {
                source: '/:locale(en|ja|zh-cn|zh-tw)/detail',
                destination: 'https://blog.lemondouble.com/en/projects/',
                permanent: true,
            },
            {
                source: '/:locale(ja|zh-cn|zh-tw)',
                destination: '/en',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
