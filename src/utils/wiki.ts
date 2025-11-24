export async function fetchWikiImage(make: string, model: string): Promise<string> {
    try {
        const searchQuery = `${make}_${model}`;
        const endpoint = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(
            searchQuery
        )}`;

        const response = await fetch(endpoint, {
            headers: {
                "User-Agent": "AutoLuxDemo/1.0 (test@demo.com)",
                Accept: "application/json",
            },
        });

        const data = await response.json();

        return `https:${data.items[0].srcset[0].src}`;
    } catch (error) {
        console.error(`Error fetching image for ${make} ${model}:`, error);
        return "/placeholder-car.jpg";
    }
}