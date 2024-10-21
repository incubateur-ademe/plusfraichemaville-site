import puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";

const PFMV_OLD_URL = "https://enthusiasm-point-944116.framer.app/";
const EXTRACT_DIR = "./pfmv-old-website";

export const extractSite = async () => {
  console.log("Scraping en cours...");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    if (!fs.existsSync(EXTRACT_DIR)) {
      fs.mkdirSync(EXTRACT_DIR, { recursive: true });
    }

    await page.goto(PFMV_OLD_URL, { waitUntil: "networkidle0" });

    const html = await page.content();
    fs.writeFileSync(path.join(EXTRACT_DIR, "index.html"), html);

    const styles = await page.evaluate(() => {
      return Array.from(document.styleSheets)
        .map((sheet) => {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        })
        .join("\n");
    });
    fs.writeFileSync(path.join(EXTRACT_DIR, "styles.css"), styles);

    const scripts = await page.evaluate(() => {
      return Array.from(document.scripts)
        .map((script) => script.innerHTML)
        .join("\n\n");
    });
    fs.writeFileSync(path.join(EXTRACT_DIR, "scripts.js"), scripts);

    const images = await page.evaluate(() => {
      return Array.from(document.images).map((img) => img.src);
    });
    for (let i = 0; i < images.length; i++) {
      const imageUrl = images[i];
      const viewSource = await page.goto(imageUrl);
      if (viewSource) {
        const buffer = await viewSource.buffer();
        fs.writeFileSync(path.join(EXTRACT_DIR, `image-${i}${path.extname(imageUrl)}`), buffer);
      }
    }

    console.log("Scraping terminé");
    browser.close();
  } catch (error) {
    console.log("Une erreur est survenue :", error);
    browser.close();
  }
};

extractSite();
