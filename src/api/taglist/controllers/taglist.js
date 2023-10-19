'use strict';

/**
 * A set of functions called "actions" for `taglist`
 */
function findItemsByKeyword(keyword) {
  const data = {
    "Companies": [
      "Apple",
      "Microsoft",
      "Google",
      "Amazon",
      "Tesla",
      "Meta",
      "NVIDIA",
      "Samsung",
      "Tencent",
      "TSMC",
      "Intel",
      "Adobe",
      "SpaceX",
      "Toyota",
      "Mercedes-Benz",
      "Binance",
      "Netflix",
      "Spotify",
      "Sony",
      "Logitech"
    ],
    "Software": [
      "iOS",
      "macOS",
      "Windows",
      "Android",
      "watchOS",
      "iPadOS"
    ],
    "Hardware": [
      "Laptop",
      "Smartphone",
      "TV",
      "Office",
      "Home",
      "School"
    ],
    "Innovation": [
      "Business",
      "Startup",
      "IoT",
      "5G",
      "VR",
      "AR",
      "Cybersecurity",
      "Blockchain",
      "AI",
      "ML",
      "Cloud",
      "Robotics",
      "Space"
    ],
    "Car": [
      "Toyota",
      "Volkswagen",
      "Mercedes-Benz",
      "Ford",
      "General Motors",
      "Honda",
      "Hyundai",
      "Nissan",
      "KIA",
      "Tesla",
      "BMW",
      "Suzuki",
      "Mazda",
      "Renault",
      "Subaru",
      "Geely",
      "Porsche",
      "Jeep",
      "Lamborghini",
      "Formula 1"
    ],
    "Entertainment": [
      "Esports",
      "Streaming"
    ]
  }
  const category = Object.keys(data).find(key => data[key].includes(keyword));
  
  if (!category) {
    console.error(`Keyword '${keyword}' not found in any category.`);
    return [];
  }

  const filteredItems = data[category].filter(item => item.toLowerCase() !== keyword.toLowerCase());
  return filteredItems;

}

module.exports = {
  getTagList: async (ctx, next) => {
    try {
      const { tag } = ctx.request.query;
      ctx.body = findItemsByKeyword(tag);
    } catch (err) {
      ctx.body = err;
    }
  }
};
