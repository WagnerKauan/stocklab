import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '11mwnyy0hv.ufs.sh',
      port: '',
      pathname: '/**',
    }],
    
  }
};

export default nextConfig;
