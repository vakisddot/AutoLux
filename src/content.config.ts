import { defineCollection, z } from "astro:content";
import { csvLoader } from "@ascorbic/csv-loader";

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

export const collections = { cars };
