// ─────────────────────────────────────────
//  App.js  ←  ROOT COMPONENT
//  This is the "parent" that brings all
//  components together into one page.
//
//  Think of it like the main frame of a
//  house — all rooms (components) live here.
// ─────────────────────────────────────────

import Cursor  from './components/Cursor';
import Navbar  from './components/Navbar';
import Hero    from './components/Hero';
import {
  About, Skills, Projects,
  Journey, Contact, Footer
} from './components/Sections';

function App() {
  return (
    // The main wrapper div
    <div className="App">

      {/* Custom animated cursor */}
      <Cursor />

      {/* Fixed top navigation */}
      <Navbar />

      {/* Page sections — stacked vertically */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
