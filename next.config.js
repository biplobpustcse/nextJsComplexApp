

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
      // reactStrictMode: false
    }

    return config
  }
}

module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}





// module.exports = {
//   basePath: '/',

//   async redirects() {
//     return [
//       {
//         source: '/carrer/apply-online/:id',
//         destination: '/apply-online/:id',
//         permanent: true,
//       },
//     ]
//   },
// }

// module.exports = {
//   experimental: {
//     async rewrites() {
//       return [
//         {
//           source: '/carrer/apply-online/:id',
//           destination: '/apply-online/:id',
          
//         }
//       ]
//     }
//   }
// }



