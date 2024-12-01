import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AiFillStar} from "react-icons/ai";
// set tạm data vì chưa nối backend
const products = [
    {
        id: "1",
        path: "/images/Pizza/BBQ Chicken Pizza.jpeg",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732639087/BBQ_Chicken_Pizza_gkqcuf.jpg",
        title: "BBQ Chicken Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "2",
        path: "/images/Pizza/Breakfast Pizza.jpeg",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732639087/Breakfast_Pizza_umy5vx.jpg",
        title: "Breakfast Pizza",
        title: "Breakfast Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "3",
        path: "/images/Pizza/Buffalo Chicken Pizza.jpeg",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732639090/Buffalo_Chicken_Pizza_u5sntq.jpg",
        title: "Buffalo Chicken Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "4",
        path: "/images/Pizza/Capricciosa Pizza.jpeg",
        title: "Capricciosa Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "5",
        path: "/images/Pizza/Cheese Pizza.jpeg",
        title: "Cheese Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "6",
        path: "/images/Pizza/Detroit Style Pizza.jpeg",
        title: "Detroit Style Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "7",
        path: "/images/Pizza/Diavola Pizza.jpeg",
        title: "Diavola Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "8",
        path: "/images/Pizza/Hawaiian Pizza.jpeg",
        title: "Hawaiian Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "9",
        path: "/images/Pizza/Margherita Pizza.jpeg",
        title: "Margherita Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "10",
        path: "/images/Pizza/Meat Lovers Pizza.jpeg",
        title: "Meat Lovers Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "11",
        path: "/images/Pizza/Pepperoni Pizza.jpeg",
        title: "Pepperoni Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "12",
        path: "/images/Pizza/Seafood Pizza.jpeg",
        title: "Seafood Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "13",
        path: "/images/Pizza/Vegetarian Pizza.jpeg",
        title: "Vegetarian Pizza",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Pizza"
    },

    {
        id: "14",
        path: "/images/Chicken/BBQ Grilled Chicken.jpeg",
        title: "BBQ Grilled Chicken",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "15",
        path: "/images/Chicken/Boneless Fried Chicken.jpeg",
        title: "Boneless Fried Chicken",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "16",
        path: "/images/Chicken/Buffalo Wings.jpeg",
        title: "Buffalo Wings",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "17",
        path: "/images/Chicken/Cheese coated Wings.jpeg",
        title: "Cheese coated Wings",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "18",
        path: "/images/Chicken/Cheese-coated Wings.jpeg",
        title: "Cheese-coated Wings",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews)",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "19",
        path: "/images/Chicken/Chicken & Fries.jpeg",
        title: "Chicken & Fries",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "20",
        path: "/images/Chicken/Chicken Sandwich.jpeg",
        title: "Chicken Sandwich",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "21",
        path: "/images/Chicken/Chicken Strips Wrap.jpeg",
        title: "Chicken Strips Wrap",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "22",
        path: "/images/Chicken/Chicken Tenders.jpeg",
        title: "Chicken Tenders",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "23",
        path: "/images/Chicken/Crispy Chicken Burger.jpeg",
        title: "Crispy Chicken Burger",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "24",
        path: "/images/Chicken/Double Down.jpeg",
        title: "Double Down",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "25",
        path: "/images/Chicken/Family Bucket.jpeg",
        title: "Family Bucket",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "26",
        path: "/images/Chicken/Fried Chicken.jpeg",
        title: "Fried Chicken",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "27",
        path: "/images/Chicken/Grilled Chicken Burger.jpeg",
        title: "Grilled Chicken Burger",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "28",
        path: "/images/Chicken/Honey BBQ Wings.jpeg",
        title: "Honey BBQ Wings",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "29",
        path: "/images/Chicken/Hot & Spicy Chicken.jpeg",
        title: "Hot & Spicy Chicken",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "30",
        path: "/images/Chicken/Popcorn Chicken.jpeg",
        title: "Popcorn Chicken",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "31",
        path: "/images/Chicken/Sweet Chili Wings.jpeg",
        title: "Sweet Chili Wings",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Chicken"
    },

    {
        id: "32",
        path: "/images/Cake/Apple Pie.jpeg",
        title: "Apple Pie",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "33",
        path: "/images/Cake/Biscuits.jpeg",
        title: "Biscuits",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "34",
        path: "/images/Cake/Cheesy Bites.jpeg",
        title: "Cheesy Bites",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "35",
        path: "/images/Cake/Chocolate Lava Cake.jpeg",
        title: "Chocolate Lava Cake",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "36",
        path: "/images/Cake/Cinnamon Rolls.jpeg",
        title: "Cinnamon Rolls",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "37",
        path: "/images/Cake/Cornbread.jpeg",
        title: "Cornbread",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "38",
        path: "/images/Cake/Croissants.jpeg",
        title: "Croissants",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "39",
        path: "/images/Cake/Donuts.jpeg",
        title: "Donuts",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "40",
        path: "/images/Cake/Flatbread.jpeg",
        title: "Flatbread",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "41",
        path: "/images/Cake/Garlic Bread.jpeg",
        title: "Garlic Bread",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "42",
        path: "/images/Cake/Mozzarella Sticks.jpeg",
        title: "Mozzarella Sticks",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },

    {
        id: "43",
        path: "/images/Cake/Wraps.jpeg",
        title: "Wraps",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Cake"
    },



    {
        id: "44",
        path: "/images/Drink/7-Up.jpeg",
        title: "7-Up",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "45",
        path: "/images/Drink/Apple Juice.jpeg",
        title: "Apple Juice",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "46",
        path: "/images/Drink/Cappuccino.jpeg",
        title: "Cappuccino",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "47",
        path: "/images/Drink/Coca-cola.jpeg",
        title: "Coca-cola",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },



    {
        id: "49",
        path: "/images/Drink/Iced Tea.jpeg",
        title: "Iced Tea",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },



    {
        id: "50",
        path: "/images/Drink/Latte.jpeg",
        title: "Latte",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "51",
        path: "/images/Drink/Lemon Tea.jpeg",
        title: "Lemon Tea",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "52",
        path: "/images/Drink/Mineral Water.jpg",
        title: "Mineral Water",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "53",
        path: "/images/Drink/Mountain Dew.jpeg",
        title: "Mountain Dew",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "54",
        path: "/images/Drink/Orange Juice.jpeg",
        title: "Orange Juice",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "55",
        path: "/images/Drink/Sprite.jpeg",
        title: "Sprite",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "56",
        path: "/images/Drink/Strawberry Milkshake.jpeg",
        title: "Strawberry Milkshake",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "57",
        path: "/images/Drink/Pineapple Juice.jpeg",
        title: "Pineapple Juice",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },

    {
        id: "48",
        path: "/images/Drink/Mocktail.jpeg",
        title: "Mocktail",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    },


    {
        id: "59",
        path: "/images/Drink/Vanilla Milkshake.jpeg",
        title: "Vanilla Milkshake",
        star: <AiFillStar className="rating-star"/>,
        review: "(45 reviews",
        price: "$10",
        category: "Drink"
    }
];

// lấy api từ backend, thay queryFn bằng dòng cmt ở dưới
export const ProductsAPI = createApi({
    reducerPath: "ProductsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/products/" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            queryFn: () => {
                return { data: products };
            },
            // query: () => products,
        }),
    }),
});

export const { useGetAllProductsQuery } = ProductsAPI;