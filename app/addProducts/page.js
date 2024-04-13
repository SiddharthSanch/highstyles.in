"use client"
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";

const products=[
  {
      "title": "Leather Backpack",
    "description": "Genuine leather backpack with multiple compartments",
    "url": ["https://example.com/leather-backpack"],
    "price": 100,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "XYZ Brand",
    "available_colors": ["Brown", "Black"],
    "condition": "New",
    "rating": 4,
    "SKU": "LB1001",
    "no_of_reviews": 10,
    "for_gender": "Unisex"
  },
  {
      "title": "Canvas Tote Bag",
    "description": "Stylish canvas tote bag for everyday use",
    "url": ["https://example.com/canvas-tote-bag"],
    "price": 50,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Tote Bag",
    "brand": "ABC Company",
    "available_colors": ["Blue", "Red", "Green"],
    "condition": "New",
    "rating": 5,
    "SKU": "CTB2002",
    "no_of_reviews": 15,
    "for_gender": "Female"
  },
  {
      "title": "Messenger Bag",
    "description": "Durable messenger bag for work or school",
    "url": ["https://example.com/messenger-bag"],
    "price": 80,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Messenger Bag",
    "brand": "DEF Designs",
    "available_colors": ["Black", "Gray"],
    "condition": "New",
    "rating": 4,
    "SKU": "MB3003",
    "no_of_reviews": 8,
    "for_gender": "Male"
  },
  {
      "title": "Travel Duffel Bag",
    "description": "Spacious travel duffel bag for your adventures",
    "url": ["https://example.com/travel-duffel-bag"],
    "price": 120,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Duffel Bag",
    "brand": "GHI Outdoors",
    "available_colors": ["Navy Blue", "Green"],
    "condition": "New",
    "rating": 4,
    "SKU": "TDB4004",
    "no_of_reviews": 12,
    "for_gender": null
  },
  {
      "title": "Laptop Backpack",
    "description": "Functional backpack with laptop compartment",
    "url": ["https://example.com/laptop-backpack"],
    "price": 90,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "JKL Gear",
    "available_colors": ["Black", "Gray"],
    "condition": "New",
    "rating": 4,
    "SKU": "LB5005",
    "no_of_reviews": 7,
    "for_gender": null
  },
  {
      "title": "Crossbody Bag",
    "description": "Versatile crossbody bag for everyday use",
    "url": ["https://example.com/crossbody-bag"],
    "price": 70,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Crossbody Bag",
    "brand": "MNO Fashions",
    "available_colors": ["Brown", "Beige"],
    "condition": "New",
    "rating": 3,
    "SKU": "CB6006",
    "no_of_reviews": 5,
    "for_gender": null
  },
  {
      "title": "Satchel Bag",
    "description": "Classic satchel bag with adjustable shoulder strap",
    "url": ["https://example.com/satchel-bag"],
    "price": 60,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Satchel Bag",
    "brand": "PQR Designs",
    "available_colors": ["Black", "Brown"],
    "condition": "New",
    "rating": 4,
    "SKU": "SB7007",
    "no_of_reviews": 9,
    "for_gender": null
  },
  {
      "title": "Weekender Bag",
    "description": "Stylish weekender bag for short trips",
    "url": ["https://example.com/weekender-bag"],
    "price": 110,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Weekender Bag",
    "brand": "STU Creations",
    "available_colors": ["Gray", "Black"],
    "condition": "New",
    "rating": 5,
    "SKU": "WB8008",
    "no_of_reviews": 11,
    "for_gender": null
  },
  {
      "title": "Rolling Luggage",
    "description": "Convenient rolling luggage for hassle-free travel",
    "url": ["https://example.com/rolling-luggage"],
    "price": 150,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Luggage",
    "brand": "VWX Travel",
    "available_colors": ["Black", "Blue"],
    "condition": "New",
    "rating": 4,
    "SKU": "RL9009",
    "no_of_reviews": 6,
    "for_gender": null
  },
  {
        "title": "Shoulder Bag",
    "description": "Chic shoulder bag with adjustable strap",
    "url": ["https://example.com/shoulder-bag"],
    "price": 75,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Shoulder Bag",
    "brand": "YZA Collections",
    "available_colors": ["Red", "Brown"],
    "condition": "New",
    "rating": 4,
    "SKU": "SB1010",
    "no_of_reviews": 8,
    "for_gender": null
  },
  {
        "title": "Backpack Purse",
    "description": "Trendy backpack purse for casual outings",
    "url": ["https://example.com/backpack-purse"],
    "price": 85,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack Purse",
    "brand": "ABC Accessories",
    "available_colors": ["Black", "Pink"],
    "condition": "New",
    "rating": 4,
    "SKU": "BP1111",
    "no_of_reviews": 7,
    "for_gender": "Female"
  },
  {
        "title": "Convertible Backpack",
    "description": "Versatile backpack that converts to a shoulder bag",
    "url": ["https://example.com/convertible-backpack"],
    "price": 95,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "DEF Outdoors",
    "available_colors": ["Blue", "Gray"],
    "condition": "New",
    "rating": 4,
    "SKU": "CB1212",
    "no_of_reviews": 6,
    "for_gender": null
  },
  {
        "title": "Leather Satchel",
    "description": "Classic leather satchel with vintage charm",
    "url": ["https://example.com/leather-satchel"],
    "price": 120,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Satchel Bag",
    "brand": "GHI Leatherworks",
    "available_colors": ["Brown", "Tan"],
    "condition": "New",
    "rating": 5,
    "SKU": "LS1313",
    "no_of_reviews": 9,
    "for_gender": null
  },
  {
        "title": "Trolley Backpack",
    "description": "Convenient trolley backpack for school or travel",
    "url": ["https://example.com/trolley-backpack"],
    "price": 100,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "JKL Travel",
    "available_colors": ["Black", "Blue"],
    "condition": "New",
    "rating": 4,
    "SKU": "TB1414",
    "no_of_reviews": 7,
    "for_gender": null
  },
  {
        "title": "Hiking Backpack",
    "description": "Sturdy hiking backpack with hydration compatibility",
    "url": ["https://example.com/hiking-backpack"],
    "price": 110,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "MNO Outdoors",
    "available_colors": ["Green", "Gray"],
    "condition": "New",
    "rating": 4,
    "SKU": "HB1515",
    "no_of_reviews": 8,
    "for_gender": null
  },
  {
        "title": "Leather Briefcase",
    "description": "Professional leather briefcase for business needs",
    "url": ["https://example.com/leather-briefcase"],
    "price": 130,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Briefcase",
    "brand": "PQR Leather Goods",
    "available_colors": ["Black", "Brown"],
    "condition": "New",
    "rating": 5,
    "SKU": "LB1616",
    "no_of_reviews": 10,
    "for_gender": null
  },
  {
        "title": "Travel Backpack",
    "description": "Versatile travel backpack for adventurers",
    "url": ["https://example.com/travel-backpack"],
    "price": 95,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "STU Gear",
    "available_colors": ["Gray", "Blue"],
    "condition": "New",
    "rating": 4,
    "SKU": "TB1717",
    "no_of_reviews": 6,
    "for_gender": null
  },
  {
        "title": "Fashion Backpack",
    "description": "Trendy fashion backpack for urban outings",
    "url": ["https://example.com/fashion-backpack"],
    "price": 80,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Backpack",
    "brand": "VWX Style",
    "available_colors": ["Black", "Red"],
    "condition": "New",
    "rating": 4,
    "SKU": "FB1818",
    "no_of_reviews": 5,
    "for_gender": null
  },
  {
        "title": "Weekender Duffel Bag",
    "description": "Spacious weekender duffel bag for short trips",
    "url": ["https://example.com/weekender-duffel-bag"],
    "price": 115,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Duffel Bag",
    "brand": "YZA Travel",
    "available_colors": ["Navy Blue", "Gray"],
    "condition": "New",
    "rating": 4,
    "SKU": "WDB1919",
    "no_of_reviews": 7,
    "for_gender": null
  },
  {
        "title": "Gym Duffel Bag",
    "description": "Functional gym duffel bag with shoe compartment",
    "url": ["https://example.com/gym-duffel-bag"],
    "price": 70,
    "created_at": "2024-02-18T12:00:00Z",
    "category": "Duffel Bag",
    "brand": "ABC Fitness",
    "available_colors": ["Black", "Blue"],
    "condition": "New",
    "rating": 4,
    "SKU": "GDB2020",
    "no_of_reviews": 6,
    "for_gender": null
  }
]
const fetchImageUrls = async (query) => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=3&client_id=7BmlBd-if-k59J4snBJCKlHWUkl_elVRhWijd4UWXjU`);
    const data = await response.json();
    return data.map(item => item.urls.regular);
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error.message);
    return [];
  }
};
export default function InsertProducts() {
  useEffect(() => {
    async function insertProducts() {
      try {
        for (const product of products) {
          const urls = await fetchImageUrls(product.title);
          product.url = urls;
        }
        const { data, error } = await supabase.from('Products').insert(products);
        console.log(data)
        if (error) {
          throw error;
        }
        console.log('Products inserted successfully:', data);
      } catch (error) {
        console.error('Error inserting products:', error.message);
      }
    }

    insertProducts();
  }, []);

  return <div>Inserting products...</div>;
}