import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Явно фиксируем рабочую директорию Turbopack, чтобы он не подхватывал
  // корневой package-lock.json (там живёт serve-handler для прототипа).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
