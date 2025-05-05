import defaultImage from "./../images/man.png";
import Electronics from "./../images/ProductCategory/Electronic.png";
import fashion from "./../images/ProductCategory/fashion.png";
import HomeLiving from "./../images/ProductCategory/Home&Living.png";
import beauty from "./../images/ProductCategory/beauty.png";
import Smartphones from "./../images/ProductCategory/smartphone.png";
import mobileAccessories from "./../images/ProductCategory/mobileAccessories.png";
import featuresphone from "./../images/ProductCategory/featurephone.png";
import GamingLaptop from "./../images/ProductCategory/GamingLaptop.png";
import laptopBags from "./../images/ProductCategory/laptopBags.png";
import bussinasLAptop from "./../images/ProductCategory/bussinasLAptop.png";

export const categoriesData = [
  {
    id: "1",
    name: "Electronics",
    icon: Electronics,
    subcategories: [
      {
        name: "Mobiles",
        categories: [
          {
            name: "Smartphones",
            image: Smartphones,
          },
          {
            name: "Feature Phones",
            image: featuresphone,
          },
          {
            name: "Mobile Accessories",
            image: mobileAccessories,
          },
        ],
      },
      {
        name: "Laptops",
        categories: [
          {
            name: "Gaming Laptops",
            image: GamingLaptop,
          },
          {
            name: "Business Laptops",
            image: bussinasLAptop,
          },
          {
            name: "Laptop Bags",
            image: laptopBags,
          },
        ],
      },
      "Cameras",
      "Chargers",
      "Headphones",
    ],
  },
  {
    id: "2",
    name: "Fashion",
    icon: fashion,
    subcategories: [
      {
        name: "Men",
        categories: ["Shirts", "Trousers", "Watches"],
      },
      "Women",
      "Kids",
      "Footwear",
      "Bags",
    ],
  },
  {
    id: "3",
    name: "Home & Living",
    icon: HomeLiving,
    subcategories: [
      "Furniture",
      "Decor",
      "Kitchen",
      "Lighting",
      "Storage",
      "Bedsheets",
    ],
  },
  {
    id: "4",
    name: "Beauty",
    icon: beauty,
    subcategories: [
      "Skincare",
      "Makeup",
      "Fragrances",
      "Haircare",
      "Men's Grooming",
      "Tools",
    ],
  },
  {
    id: "5",
    name: "Baby",
    icon: defaultImage,
    subcategories: [
      "Diapers",
      "Baby Food",
      "Toys",
      "Clothing",
      "Bath",
      "Wipes",
    ],
  },
  {
    id: "6",
    name: "Groceries",
    icon: defaultImage,
    subcategories: [
      "Fruits",
      "Vegetables",
      "Snacks",
      "Drinks",
      "Canned Food",
      "Oil",
    ],
  },
  {
    id: "7",
    name: "Health",
    // icon: require("./assets/health.png"),
    icon: defaultImage,
    subcategories: [
      "Supplements",
      "Medical",
      "Equipment",
      "Vitamins",
      "Sanitizers",
      "Masks",
    ],
  },
  {
    id: "8",
    name: "Sports",
    icon: defaultImage,
    // icon: require("./assets/sports.png"),
    subcategories: ["Cricket", "Football", "Gym", "Cycling", "Swim", "Tennis"],
  },
  {
    id: "9",
    name: "Books",
    icon: defaultImage,
    // icon: require("./assets/books.png"),
    subcategories: [
      "Novels",
      "School",
      "Magazines",
      "Children",
      "Comics",
      "Journals",
    ],
  },
  {
    id: "10",
    name: "Automotive",
    icon: defaultImage,
    // icon: require("./assets/automotive.png"),
    subcategories: [
      "Car Parts",
      "Motorbike",
      "Helmets",
      "Tires",
      "Tools",
      "Oils",
    ],
  },
  {
    id: "11",
    name: "Pets",
    icon: defaultImage,
    // icon: require("./assets/pets.png"),
    subcategories: ["Food", "Toys", "Care", "Cages", "Grooming", "Litter"],
  },
  {
    id: "12",
    name: "Gaming",
    icon: defaultImage,
    // icon: require("./assets/gaming.png"),
    subcategories: [
      "Consoles",
      "Games",
      "Controllers",
      "PC Gaming",
      "VR",
      "Accessories",
    ],
  },
  {
    id: "13",
    name: "Tools",
    icon: defaultImage,
    // icon: require("./assets/tools.png"),
    subcategories: [
      "Hand Tools",
      "Power Tools",
      "Safety",
      "Repair",
      "Drills",
      "Screws",
    ],
  },
  {
    id: "14",
    name: "Travel",
    icon: defaultImage,
    // icon: require("./assets/travel.png"),
    subcategories: [
      "Luggage",
      "Bags",
      "Travel Kits",
      "Organizers",
      "Adapters",
      "Tags",
    ],
  },
  {
    id: "15",
    name: "Stationery",
    icon: defaultImage,
    // icon: require("./assets/stationery.png"),
    subcategories: [
      "Pens",
      "Notebooks",
      "Folders",
      "Colors",
      "Glue",
      "Staplers",
    ],
  },
];
