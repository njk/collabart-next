module.exports = {
  images: {
    domains: ['werkliste.s3.amazonaws.com', 'res.cloudinary.com'],
    deviceSizes: [1080, 2048],
    imageSizes: [1024, 2048]
  },
  async redirects() {
    return [
      // if the host is `sabinekoelmel.com`,
      // this rewrite will be applied
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.sabinekoelmel.com',
          },
        ],
        permanent: false,
        destination: '/artists/5bab7f495d212a93e8cdd748',
      },
      // if the host is `hannesmichanek.com`,
      // this rewrite will be applied
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.hannesmichanek.com',
          },
        ],
        permanent: false,
        destination: '/artists/5bab7f495d212a93e8cdd6ee',
      }]
  }
}