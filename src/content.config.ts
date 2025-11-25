import { defineCollection, z } from "astro:content";
import { csvLoader } from "@ascorbic/csv-loader";
import { glob } from 'astro/loaders';

const cars = defineCollection({
    loader: csvLoader({
        fileName: "data/cars.csv",
    }),

    schema: z.object({
        id: z.coerce.string(),
        make: z.coerce.string(),
        model: z.coerce.string(),
        year: z.coerce.string(),
        engine: z.coerce.string(),
        horsepower: z.coerce.string(),
        torque: z.coerce.string(),
        acceleration: z.coerce.string(),
        price: z.coerce.string(),
        url: z.coerce.string(),
    }),
});

const news = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default("Autolux Team"),
        tags: z.array(z.string()).optional(),
        slug: z.string(),
    }),
});

export const collections = { cars, news };
