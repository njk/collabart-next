module.exports = {
  images: {
    domains: ['werkliste.s3.amazonaws.com', 'res.cloudinary.com'],
    deviceSizes: [1080, 2048],
    imageSizes: [1024, 2048]
  },
  rewrites: [
    // if the host is `sabinekoelmel.com`,
    // this rewrite will be applied
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'sabinekoelmel.com',
        },
      ],
      destination: '/artists/5bab7f495d212a93e8cdd748',
    }
  ]
}