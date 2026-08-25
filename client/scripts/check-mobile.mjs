/**
 * Mobile layout check for the Contact section.
 * Serves the built dist/ with `vite preview`, opens it in headless Chrome,
 * and verifies at mobile widths:
 *   1. No horizontal page overflow
 *   2. No element in the contact section escapes the viewport
 *   3. The 4 info boxes row is centered relative to the form
 * Saves a screenshot of the contact section for visual review.
 */
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
// Random port per run — avoids collisions with stale servers
const PORT = 4600 + Math.floor(Math.random() * 300);
const URL = `http://localhost:${PORT}/`;

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// --- start preview server ---
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: projectRoot,
  shell: true,
  stdio: 'ignore',
});

async function waitForServer(timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(URL);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw new Error('Preview server did not start');
}

let browser;
let failures = 0;

try {
  await waitForServer();
  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const width of [375, 390, 430]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 812 });
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for the SPA to actually render the contact section
    try {
      await page.waitForSelector('#contact', { timeout: 10000 });
    } catch {
      console.log(`❌ ${width}px: contact section never rendered`);
      console.log('   title:', await page.title());
      console.log('   sections:', await page.evaluate(() => [...document.querySelectorAll('section[id]')].map((s) => s.id).join(', ')));
      failures++;
      await page.close();
      continue;
    }

    // Scroll through the page so GSAP scroll-triggered animations settle
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      document.getElementById('contact')?.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1200));

    const result = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const issues = [];

      // 1. Page-level horizontal overflow
      const scrollW = document.documentElement.scrollWidth;
      if (scrollW > vw + 1) {
        issues.push(`PAGE OVERFLOW: scrollWidth ${scrollW} > viewport ${vw}`);
      }

      const contact = document.getElementById('contact');
      if (!contact) {
        issues.push('Contact section not found');
        return { issues };
      }

      // 2. Any element escaping the viewport horizontally
      contact.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.left < -1 || r.right > vw + 1)) {
          const cls = typeof el.className === 'string' ? el.className.slice(0, 50) : '';
          issues.push(
            `ESCAPES VIEWPORT: <${el.tagName.toLowerCase()}> "${cls}" left=${r.left.toFixed(1)} right=${r.right.toFixed(1)} (vw=${vw})`
          );
        }
      });

      // 3. Boxes row centered relative to the form
      const ul = contact.querySelector('ul');
      const form = contact.querySelector('form');
      if (ul && form) {
        const u = ul.getBoundingClientRect();
        const f = form.getBoundingClientRect();
        const ulCenter = (u.left + u.right) / 2;
        const formCenter = (f.left + f.right) / 2;
        const drift = Math.abs(ulCenter - formCenter);
        if (drift > 2) {
          issues.push(
            `BOXES OFF-CENTER: boxes center ${ulCenter.toFixed(1)} vs form center ${formCenter.toFixed(1)} (drift ${drift.toFixed(1)}px)`
          );
        }
        // Box row should not be wider than the form
        if (u.width > f.width + 1) {
          issues.push(`BOXES WIDER THAN FORM: ${u.width.toFixed(1)} vs ${f.width.toFixed(1)}`);
        }
      } else {
        issues.push('Boxes row or form not found');
      }

      return { issues };
    });

    if (result.issues.length === 0) {
      console.log(`✅ ${width}px: no overflow, boxes centered with the form`);
    } else {
      failures++;
      console.log(`❌ ${width}px:`);
      result.issues.forEach((i) => console.log(`   - ${i}`));
    }

    // Screenshot at 375px only (the requested width)
    if (width === 375) {
      await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(projectRoot, 'contact-375.png') });
      console.log('📸 Screenshot saved: client/contact-375.png');
    }

    await page.close();
  }
} catch (err) {
  failures++;
  console.error('CHECK FAILED:', err.message);
} finally {
  if (browser) await browser.close();
  server.kill();
  if (process.platform === 'win32') {
    spawn('taskkill', ['/F', '/T', '/PID', String(server.pid)], { shell: true, stdio: 'ignore' });
  }
}

process.exit(failures > 0 ? 1 : 0);
