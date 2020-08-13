const node_env = process.env.NODE_ENV || "development";

if (node_env !== 'production') {
   require('dotenv').config();
}

const config = {
   development : {
      URI: process.env.DATABASE_URL,
      PORT: process.env.PORT || 3000,
      MORGAN_FORMAT: 'dev',
      BCRYPT_ROUNDS: +process.env.BCRYPT_ROUNDS || 10,
      JWT_SECRET: process.env.JWT_SECRET || 'Very Secret 123556',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1200s',
      JWT_REFRESH_THRESHOLD: process.env.JWT_REFRESH_THRESHOLD || 60,
   }
}

export default config[node_env];
