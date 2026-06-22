import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: "⚡",
    title: "Share moments",
    description: "Post status updates and let the world know what's on your mind — instantly.",
  },
  {
    icon: "🔗",
    title: "Connect with people",
    description: "Follow friends, discover new voices, and build your own corner of the internet.",
  },
  {
    icon: "📡",
    title: "Your live feed",
    description: "See posts from everyone you follow, updated in real time as it happens.",
  },
]

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
          Why Pulse
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Everything you need to stay connected
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="bg-white/5 border-white/10 text-white hover:bg-white/8 transition-colors">
              <CardHeader>
                <div className="text-3xl mb-2">{f.icon}</div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}