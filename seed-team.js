const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const STRAPI_URL = "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_TOKEN || "1edd5e6c203a350c4a4c5bf06280913e5f670b4825b71745d17c10dab07ecdb4c1e69dc9ab7623ddaebcefcf0663fb4facd52a296495bc9e05c0b3d4933c71287135053c84351470a57237dd73ecada94b8b5bc06ead9af007843f29a07ff93926a5a35db2ac5f07faf6bd7c8c7acd7e8992c5e53acdc589bb88914197ce7dd6";
const teamData = JSON.parse(fs.readFileSync(path.join(__dirname, "team-data.json"), "utf-8"));

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadImage(res.headers.location).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function uploadToStrapi(buffer, filename) {
  const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
  const parts = [];

  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${filename}"\r\nContent-Type: image/gif\r\n\r\n`
    )
  );
  parts.push(buffer);
  parts.push(Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="fileInfo"\r\nContent-Type: application/json\r\n\r\n{}\r\n--${boundary}--\r\n`));

  const body = Buffer.concat(parts);

  return new Promise((resolve, reject) => {
    const url = new URL("/api/upload", STRAPI_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "Content-Length": body.length,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function createTeamEntry(name, surname, bio, email, mediaIds) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      data: { name, surname, bio, email, picture: mediaIds },
    });
    const url = new URL("/api/teams", STRAPI_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  let created = 0;
  let failed = 0;

  for (const person of teamData) {
    const { name, surname, bio, email, picture_url } = person;
    console.log(`Processing: ${name} ${surname}...`);

    try {
      // Download image
      let mediaIds = [];
      if (picture_url) {
        try {
          console.log(`  Downloading image...`);
          const imageBuffer = await downloadImage(picture_url);
          const filename = picture_url.split("/").pop() || `${name}-${surname}.gif`;
          console.log(`  Uploading ${filename} (${imageBuffer.length} bytes)...`);
          const uploadResult = await uploadToStrapi(imageBuffer, filename);
          if (uploadResult && uploadResult[0] && uploadResult[0].id) {
            mediaIds = [uploadResult[0].id];
            console.log(`  Uploaded media id: ${uploadResult[0].id}`);
          } else {
            console.log(`  Upload returned: ${JSON.stringify(uploadResult).slice(0, 200)}`);
          }
        } catch (imgErr) {
          console.log(`  Image failed: ${imgErr.message}`);
        }
      }

      // Create entry
      const result = await createTeamEntry(name, surname, bio, email, mediaIds);
      if (result.data && result.data.id) {
        created++;
        console.log(`  Created entry id: ${result.data.id}`);
      } else {
        failed++;
        console.log(`  Create failed: ${JSON.stringify(result).slice(0, 300)}`);
      }
    } catch (err) {
      failed++;
      console.log(`  Error: ${err.message}`);
    }

    // Small delay to avoid overwhelming the server
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nDone. Created: ${created}, Failed: ${failed}`);
}

main().catch(console.error);
