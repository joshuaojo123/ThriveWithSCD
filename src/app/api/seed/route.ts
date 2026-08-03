export async function GET() {
  return Response.json({
    message: "Seed data endpoint ready",
    resources: [
      { title: "Understanding Sickle Cell", category: "Education" },
      { title: "Community support circles", category: "Community" },
      { title: "ThriveHeat", category: "Store" },
    ],
  });
}
