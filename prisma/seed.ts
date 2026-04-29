import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL || "file:./dev.db",
  }),
});

async function main() {
  await prisma.payment.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.bid.deleteMany();
  await prisma.job.deleteMany();
  await prisma.agentProfile.deleteMany();
  await prisma.user.deleteMany();

  const [client, agent1, agent2, agent3, admin] = await Promise.all([
    prisma.user.create({
      data: {
        email: "client@marketplace.dev",
        name: "Acme Client",
        walletAddress: "0xclient000000000000000000000000000000000001",
        role: "client",
      },
    }),
    prisma.user.create({
      data: {
        email: "agent1@marketplace.dev",
        name: "Alpha Agent",
        walletAddress: "0xagent000000000000000000000000000000000001",
        role: "agent",
      },
    }),
    prisma.user.create({
      data: {
        email: "agent2@marketplace.dev",
        name: "Beta Agent",
        walletAddress: "0xagent000000000000000000000000000000000002",
        role: "agent",
      },
    }),
    prisma.user.create({
      data: {
        email: "agent3@marketplace.dev",
        name: "Gamma Agent",
        walletAddress: "0xagent000000000000000000000000000000000003",
        role: "agent",
      },
    }),
    prisma.user.create({
      data: {
        email: "admin@marketplace.dev",
        name: "Marketplace Admin",
        walletAddress: "0xadmin000000000000000000000000000000000001",
        role: "admin",
      },
    }),
  ]);

  await prisma.agentProfile.createMany({
    data: [
      {
        userId: agent1.id,
        skills: ["Solidity", "TypeScript", "Automation"],
        bio: "Smart contract and automation specialist",
        hourlyRate: 15000,
        rating: 4.9,
        completedJobs: 12,
        portfolioLinks: ["https://example.com/alpha"],
      },
      {
        userId: agent2.id,
        skills: ["Rust", "Infra", "Security"],
        bio: "Backend and protocol engineer",
        hourlyRate: 18000,
        rating: 4.8,
        completedJobs: 9,
        portfolioLinks: ["https://example.com/beta"],
      },
      {
        userId: agent3.id,
        skills: ["Python", "Data", "Trading Bots"],
        bio: "Data-heavy automation builder",
        hourlyRate: 13000,
        rating: 4.7,
        completedJobs: 15,
        portfolioLinks: ["https://example.com/gamma"],
      },
    ],
  });

  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: "Build DeFi liquidation bot",
        description: "Need an agent to monitor lending markets and execute liquidations.",
        budget: 250000,
        category: "trading",
        status: "open",
        clientId: client.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Ship NFT mint analytics dashboard",
        description: "Create a backend that indexes mint events and usage metrics.",
        budget: 180000,
        category: "analytics",
        status: "bidding",
        clientId: client.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Audit wallet drainer detection rules",
        description: "Harden our on-chain monitoring rule set.",
        budget: 120000,
        category: "security",
        status: "open",
        clientId: client.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Automate DAO payroll payouts",
        description: "Need an agent to batch and reconcile USDC payroll runs.",
        budget: 95000,
        category: "operations",
        status: "open",
        clientId: client.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Indexer maintenance sprint",
        description: "Stabilize our event indexer and reduce lag spikes.",
        budget: 110000,
        category: "infra",
        status: "open",
        clientId: client.id,
      },
    }),
  ]);

  await prisma.bid.createMany({
    data: [
      {
        jobId: jobs[0].id,
        agentId: agent1.id,
        amount: 240000,
        proposal: "Can deliver liquidation monitoring and execution MVP in 7 days.",
        timeline: 7,
        status: "pending",
      },
      {
        jobId: jobs[0].id,
        agentId: agent2.id,
        amount: 230000,
        proposal: "Security-focused implementation with risk guards.",
        timeline: 10,
        status: "pending",
      },
      {
        jobId: jobs[1].id,
        agentId: agent3.id,
        amount: 170000,
        proposal: "Fast analytics backend using Python workers.",
        timeline: 5,
        status: "pending",
      },
      {
        jobId: jobs[2].id,
        agentId: agent2.id,
        amount: 115000,
        proposal: "Will ship detection rules and test fixtures.",
        timeline: 4,
        status: "pending",
      },
      {
        jobId: jobs[4].id,
        agentId: agent1.id,
        amount: 105000,
        proposal: "Can tighten indexer lag and observability this week.",
        timeline: 6,
        status: "pending",
      },
    ],
  });

  console.log(`Seeded users: ${[client, agent1, agent2, agent3, admin].length}`);
  console.log(`Seeded jobs: ${jobs.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
