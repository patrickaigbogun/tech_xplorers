// next.config.js
module.exports = {
    async headers() {
        return [
          {
            source: "/app/components/ChatInterface.tsx",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "http://localhost:3000/", // Set your origin
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
      },
  };