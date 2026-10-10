import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import ProjectShowcase from './components/ProjectShowcase'
import Footer from './components/Footer'
export default function App() {
  return (
    <main className="relative bg-cream">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Projects />
      <ProjectShowcase />
      <Marquee />
      <Footer />
    </main>
  )
}
