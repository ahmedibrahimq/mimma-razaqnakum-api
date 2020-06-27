const node_env = process.env.NODE_ENV || "development";

if (node_env !== 'production') {
   require('dotenv').config();
}

const config = {
   development : {
      URI: process.env.DATABASE_URL,
      PORT: process.env.PORT || 3000
   }
}

export default config[node_env];
