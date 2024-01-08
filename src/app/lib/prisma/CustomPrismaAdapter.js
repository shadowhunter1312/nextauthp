// customPrismaAdapter.js

import { PrismaAdapter } from "@next-auth/prisma-adapter";

const CustomPrismaAdapter = (prisma) => {
  const adapter = PrismaAdapter(prisma); // Use 'new' keyword here

  const createUser = async (profile,user) => {
    console.log(profile)
    return await prisma.user.upsert({
      where: { username: profile.username },
      update: { name: profile.name, image: profile.image },
      create: { username: profile.username, name: profile.name, image: profile.image },
    });
  };

  // Add other custom overrides as needed

  return {
    ...adapter,
    createUser,
  
    // Add other functions as needed
  };
};

export default CustomPrismaAdapter;
