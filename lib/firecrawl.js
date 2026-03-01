import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          schema: {
            type: "object",
            required: ["productName", "currentPrice"],
            properties: {
              productName: {
                type: "string",
              },
              currentPrice: {
                type: "string",
              },
              currencyCode: {
                type: "string",
              },
              productImageUrl: {
                type: "string",
              },
            },
          },
          prompt:`Extract the product name as 'productName'.

Extract the FULL visible product price as 'currentPrice'.
The price must include both the whole and decimal part.
Example: if the price is ₹591.90, return 591.90.
Do NOT return only the decimal portion (like 0.90).
Do NOT return only the fractional part (like 90).

Return only numeric value for 'currentPrice' (no currency symbols).

Extract the 3-letter ISO currency code as 'currencyCode' 
(e.g., INR, USD, EUR — not symbols like ₹ or $).

Extract the main product image URL as 'productImageUrl' if available.`,
        },
      ],
    });

    const extractedData = result.json;

if (!extractedData || !extractedData.productName) {
  throw new Error("No data extracted from URL");
}

// Clean and normalize price safely
let cleanedPrice = extractedData.currentPrice
  ?.toString()
  .replace(/[^0-9.]/g, "");

// If price starts with ".", add leading 0
if (cleanedPrice && cleanedPrice.startsWith(".")) {
  cleanedPrice = "0" + cleanedPrice;
}

return {
  productName: extractedData.productName,
  currentPrice: cleanedPrice,
  currencyCode: extractedData.currencyCode || "INR",
  productImageUrl: extractedData.productImageUrl || null,
};

  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}