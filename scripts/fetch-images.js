import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

const INPUT_FILE = "data/cars_raw.csv";
const OUTPUT_FILE = "data/cars.csv";

async function fetchWikiImage(make, model, id, total) {
    const searchQuery = `${make}_${model}`;
    console.log(`(${id} / ${total}) Fetching image for: ${make} ${model}...`);

    try {
        const endpoint = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(
            searchQuery
        )}`;

        const response = await fetch(endpoint, {
            headers: {
                "User-Agent": "AutoLuxDemo/1.0 (info@autolux.bg)",
                Accept: "application/json",
            },
        });

        if (response.status === 429) {
            throw new Error("Wikipedia API rate limit exceeded!");
        }

        const data = await response.json();

        if (
            data.items &&
            data.items.length > 0 &&
            data.items[0].srcset &&
            data.items[0].srcset.length > 0
        ) {
            const imageUrl = `https:${data.items[0].srcset[0].src}`;
            return imageUrl;
        }

        return "/placeholder-car.jpg";
    } catch (error) {
        console.error(
            `Error fetching image for ${make} ${model}:`,
            error.message
        );
        return "/placeholder-car.jpg";
    }
}

async function main() {
    try {
        const csvData = (await fs.readFile(INPUT_FILE, "utf-8"))
            .replace(/^\uFEFF/, ""); // Remove BOM

        const records = parse(csvData, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });

        const enrichedRecords = [];

        for (const car of records) {
            const url = await fetchWikiImage(
                car.make,
                car.model,
                car.id,
                records.length
            );

            enrichedRecords.push({
                ...car,
                url: url,
            });

            await new Promise((resolve) => setTimeout(resolve, 10));
        }

        const outputCsv = stringify(enrichedRecords, {
            header: true,
        });

        await fs.writeFile(OUTPUT_FILE, outputCsv);

        console.log("------------------------------------------------");
        console.log(`Successfully fetched and saved car images at: ${OUTPUT_FILE}`);
        console.log("------------------------------------------------");
    } catch (err) {
        console.error("Script failed:", err);
    }
}

main();