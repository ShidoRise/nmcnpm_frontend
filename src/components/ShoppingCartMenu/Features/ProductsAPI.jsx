import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const products = [
    {
        id: "1",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732639087/BBQ_Chicken_Pizza_gkqcuf.jpg",
        title: "BBQ Chicken Pizza",
        property: "BBQ",
        review: "(45 reviews)",
        price: "10",
        description: "BBQ Chicken Pizza is a flavorful dish featuring a crispy pizza crust topped with tangy BBQ sauce, tender BBQ-seasoned chicken, melted mozzarella cheese, and toppings like red onions, bell peppers, and fresh herbs. Perfectly balanced with smoky, sweet, and savory notes!",
        category: "Pizza"
    },

    {
        id: "2",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732639087/Breakfast_Pizza_umy5vx.jpg",
        title: "Breakfast Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Breakfast Pizza is a delicious twist on classic pizza, designed for morning meals. It features a soft or crispy crust topped with breakfast staples like scrambled eggs, melted cheese, crispy bacon or sausage, and sometimes veggies like spinach or tomatoes. It's a hearty and flavorful start to the day!",
        category: "Pizza"
    },

    {
        id: "3",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732639090/Buffalo_Chicken_Pizza_u5sntq.jpg",
        title: "Buffalo Chicken Pizza",
        property: "Buffalo",
        review: "(45 reviews)",
        price: "10",
        description: "Buffalo Chicken Pizza is a bold and spicy pizza featuring a crispy crust topped with tangy Buffalo sauce, shredded or grilled chicken tossed in the sauce, gooey mozzarella or cheddar cheese, and often garnished with red onions, celery, or a drizzle of ranch or blue cheese dressing for a cooling contrast. It's a perfect blend of heat and creamy flavors!",
        category: "Pizza"
    },

    {
        id: "4",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773522/Capricciosa_Pizza_pyuiti.jpg",
        title: "Capricciosa Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Capricciosa Pizza is a classic Italian pizza known for its rich and varied toppings. It features a tomato sauce base with melted mozzarella cheese, ham, mushrooms, artichoke hearts, and black olives. The combination offers a perfect balance of savory, tangy, and earthy flavors, embodying the spirit of traditional Italian cuisine.",
        category: "Pizza"
    },

    {
        id: "5",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773522/Cheese_Pizza_dnulpp.jpg",
        title: "Cheese Pizza",
        property: "Cheese",
        review: "(45 reviews)",
        price: "10",
        description: "Cheese Pizza is a simple yet timeless favorite, featuring a crispy crust topped with rich tomato sauce and a generous layer of melted cheese, typically mozzarella. Its creamy, tangy, and savory flavors make it a classic choice for all pizza lovers!",
        category: "Pizza"
    },

    {
        id: "6",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773528/Detroit_Style_Pizza_tmfyz2.jpg",
        title: "Detroit Style Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Detroit-Style Pizza is a square, thick-crust pizza known for its crispy edges, chewy interior, and unique preparation. The dough is baked in a rectangular pan, often oiled for a golden, crunchy crust. It’s topped with Wisconsin brick cheese that caramelizes at the edges, and tomato sauce is traditionally ladled on top after baking. Popular toppings include pepperoni, sausage, or vegetables, making it a hearty, satisfying pizza with a signature texture and flavor.",
        category: "Pizza"
    },

    {
        id: "7",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773528/Diavola_Pizza_rw0ws6.jpg",
        title: "Diavola Pizza",
        property: "Buffalo",
        review: "(45 reviews)",
        price: "10",
        description: "Diavola Pizza is a spicy Italian favorite, featuring a thin crust topped with rich tomato sauce, melted mozzarella, and spicy Italian salami or pepperoni. It’s often finished with chili flakes or oil for an extra kick. The name Diavola, meaning devil, reflects its fiery, bold flavors!",
        category: "Pizza"
    },

    {
        id: "8",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773528/Hawaiian_Pizza_nxj0ni.jpg",
        title: "Hawaiian Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Hawaiian Pizza is a sweet and savory delight, featuring a classic crust topped with tangy tomato sauce, melted mozzarella cheese, slices of ham, and juicy pineapple chunks. Its unique combination of flavors offers a refreshing twist to traditional pizza!",
        category: "Pizza"
    },

    {
        id: "60",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732852139/Designer_5_dhfc4r.jpg",
        title: "Pizza Ramadan Mubarak",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Pizza Ramadan Mubarak is a festive, customizable pizza often crafted to celebrate the holy month of Ramadan. It features a flavorful crust topped with ingredients that cater to Iftar tastes, such as spiced chicken, minced meat, or lamb, alongside fresh vegetables like peppers, tomatoes, and olives. Cheese, often mozzarella or a mix, adds richness, while herbs like parsley or mint provide a refreshing finish. It's a perfect dish to share, blending tradition with a modern twist!",
        category: "Pizza"
    },

    {
        id: "9",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773529/Margherita_Pizza_ejosuj.jpg",
        title: "Margherita Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Margherita pizza is a classic Italian dish made with a simple yet delicious combination of ingredients: a thin, crispy crust topped with tomato sauce, fresh mozzarella cheese, basil leaves, and a drizzle of olive oil. The colors of the toppings—red, white, and green—are meant to represent the Italian flag.",
        category: "Pizza"
    },

    {
        id: "10",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773525/Meat_Lovers_Pizza_wsbtg9.jpg",
        title: "Meat Lovers Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "Meat Lovers pizza is a hearty and indulgent pizza topped with a variety of meats, typically including pepperoni, sausage, bacon, ham, and sometimes ground beef. It is often paired with a rich tomato sauce, melted mozzarella cheese, and a flavorful crust. This pizza is perfect for meat enthusiasts looking for a filling, savory meal.",
        category: "Pizza"
    },

    {
        id: "11",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773525/Pepperoni_Pizza_nsqqsr.jpg",
        title: "Pepperoni Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "A Pepperoni Pizza is a classic Italian-American dish topped with a layer of marinara sauce, melted mozzarella cheese, and sliced pepperoni. The pepperoni adds a savory, slightly spicy flavor, and the pizza is typically baked in a hot oven until the crust is golden and crispy. It's a popular choice for pizza lovers due to its bold and flavorful toppings.",
        category: "Pizza"
    },

    {
        id: "12",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773528/Seafood_Pizza_h6rodv.jpg",
        title: "Seafood Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "A Seafood Pizza is a flavorful pizza topped with a variety of seafood, such as shrimp, mussels, squid, and sometimes clams or anchovies. It is typically paired with a creamy or tomato-based sauce, mozzarella cheese, and herbs like garlic, basil, or oregano. The combination of fresh seafood and the savory crust creates a delicious and unique alternative to traditional meat or vegetarian pizzas.",
        category: "Pizza"
    },

    {
        id: "62",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732852133/Designer_6_ltgnmh.jpg",
        title: "Cheezy Burger",
        property: "Humburger",
        review: "(45 reviews)",
        price: "10",
        description: "A Cheezy Burger is a delicious hamburger topped with a generous amount of melted cheese, often cheddar, American, or a blend of different cheeses. The burger typically includes a juicy beef patty, fresh lettuce, tomato, pickles, and onions, all sandwiched between a soft bun. The melted cheese adds extra creaminess and flavor, making it a rich and satisfying option for cheese lovers.",
        category: "Pizza"
    },

    {
        id: "13",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732773527/Vegetarian_Pizza_t7kee7.jpg",
        title: "Vegetarian Pizza",
        property: "Special",
        review: "(45 reviews)",
        price: "10",
        description: "A Vegetarian Pizza is a pizza topped with a variety of fresh vegetables, such as bell peppers, onions, mushrooms, olives, spinach, and tomatoes. It often includes mozzarella cheese and a tomato-based or pesto sauce. Some variations may also feature additional toppings like artichokes, zucchini, or eggplant. The combination of flavorful vegetables and cheese offers a delicious, meat-free alternative for pizza lovers.",
        category: "Pizza"
    },

    {
        id: "14",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774048/BBQ_Grilled_Chicken_mx48lr.jpg",
        title: "BBQ Grilled Chicken",
        property: "BBQ",
        review: "(45 reviews)",
        price: "10",
        description: "BBQ Grilled Chicken is a dish featuring chicken pieces that are marinated in a smoky, tangy barbecue sauce and then grilled to perfection. The grilling process imparts a charred, smoky flavor, while the BBQ sauce adds a sweet, savory, and slightly spicy kick. It is often served with sides like coleslaw, cornbread, or grilled vegetables, making it a popular choice for outdoor cookouts and casual meals.",
        category: "Chicken"
    },

    {
        id: "15",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774049/Boneless_Fried_Chicken_nubmba.jpg",
        title: "Boneless Fried Chicken",
        property: "Fried",
        review: "(45 reviews)",
        price: "10",
        description: "Boneless Fried Chicken refers to chicken pieces that have been seasoned, battered, and deep-fried until crispy and golden brown, but without the bones. It is typically made from chicken breast or thighs, offering a tender and juicy texture. The coating is often seasoned with a blend of spices, giving it a flavorful crunch. This dish is a popular option for those who prefer the convenience of boneless meat while enjoying the crispy, savory taste of fried chicken.",
        category: "Chicken"
    },

    {
        id: "16",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774046/Buffalo_Wings_lrogxt.jpg",
        title: "Buffalo Wings",
        property: "Buffalo",
        review: "(45 reviews)",
        price: "10",
        description: "Buffalo Wings are chicken wings that are deep-fried and coated in a spicy, tangy sauce made primarily from hot sauce and butter. The wings are typically served with a side of celery sticks and creamy blue cheese or ranch dressing for dipping. Known for their bold, spicy flavor, Buffalo wings are a popular appetizer or snack, often enjoyed during sports events or casual gatherings. They can be served mild to extra hot, depending on personal preference.",
        category: "Chicken"
    },

    {
        id: "17",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774051/Cheese-coated_Wings_tdnnvr.jpg",
        title: "Cheese coated Wings",
        property: "Cheese",
        review: "(45 reviews)",
        price: "10",
        description: "Cheese Coated Wings are chicken wings that are fried until crispy and then generously coated with a layer of melted cheese, typically cheddar, mozzarella, or a blend of cheeses. The cheese adds a rich, creamy flavor that complements the crispy texture of the wings. These wings may also be drizzled with additional seasonings, herbs, or sauces, creating a savory and indulgent treat. They are a popular choice for cheese lovers looking for a rich and cheesy twist on traditional chicken wings.",
        category: "Chicken"
    },

    {
        id: "19",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774051/Chicken_Fries_utcn9v.jpg",
        title: "Chicken & Fries",
        property: "Fried",
        review: "(45 reviews",
        price: "10",
        description: "Chicken & Fries is a classic and simple meal consisting of crispy fried chicken paired with golden, seasoned French fries. The chicken is typically battered or breaded and fried to a crunchy texture, while the fries are often seasoned with salt or other spices for extra flavor. This combination is a popular comfort food, often served as a quick meal or in fast food settings, providing a satisfying balance of savory, crispy, and tender elements.",
        category: "Chicken"
    },

    {
        id: "58",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732852153/Designer_4_vlqo0y.jpg",
        title: "Chicken Tacos",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "Chicken Tacos are a delicious Mexican dish made with soft or crispy tortillas filled with seasoned, cooked chicken. The chicken is often marinated with a blend of spices, such as cumin, chili powder, garlic, and lime, then grilled or sautéed for added flavor. The tacos are typically topped with fresh ingredients like lettuce, tomatoes, cheese, onions, cilantro, and a drizzle of salsa or sour cream. This versatile dish can be customized with a variety of toppings, offering a tasty, flavorful option for taco lovers.",
        category: "Chicken"


    },

    {
        id: "20",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774048/Chicken_Sandwich_senikp.jpg",
        title: "Chicken Sandwich",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "A Chicken Sandwich is a popular meal consisting of a breaded or grilled chicken breast placed between two slices of bread or a bun. It is often served with a variety of toppings such as lettuce, tomato, pickles, onions, cheese, and sauces like mayonnaise, ketchup, or mustard. The sandwich can be customized with different seasonings, and sometimes features a spicy or tangy twist, like a buffalo or barbecue chicken variation. It is a versatile and satisfying option for a quick meal or snack.",
        category: "Chicken"
    },

    {
        id: "21",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774048/Chicken_Strips_Wrap_z2uqpx.jpg",
        title: "Chicken Strips Wrap",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "Chicken & Vegetables is a wholesome dish that combines tender chicken, often grilled, baked, or sautéed, with a variety of fresh vegetables. Common vegetables used in this dish include carrots, broccoli, bell peppers, zucchini, and spinach, providing a colorful and nutritious balance. The chicken and vegetables can be seasoned with herbs and spices like garlic, thyme, or rosemary, and sometimes served with a light sauce or dressing. This dish is popular for its healthy, low-calorie option and can be enjoyed as a main course for lunch or dinner.",
        category: "Chicken"
    },

    {
        id: "22",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774049/Chicken_Tenders_ft7u9q.jpg",
        title: "Chicken Tenders",
        property: "Fried",
        review: "(45 reviews",
        price: "10",
        description: "Chicken Tenders are breaded and deep-fried strips of chicken breast meat, known for their crispy, golden coating and tender, juicy interior. Often served as an appetizer or main dish, chicken tenders are typically paired with dipping sauces such as honey mustard, barbecue sauce, ranch, or buffalo sauce. They are a popular choice for both kids and adults, offering a flavorful and convenient meal that's easy to eat with hands.",
        category: "Chicken"
    },

    {
        id: "23",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774051/Crispy_Chicken_Burger_rts6he.jpg",
        title: "Crispy Chicken Burger",
        property: "Humburger",
        review: "(45 reviews",
        price: "10",
        description: "A Crispy Chicken Burger is a sandwich featuring a breaded and deep-fried chicken fillet, served in a soft burger bun. The crispy chicken patty is often complemented by fresh lettuce, tomato, pickles, and a variety of sauces like mayonnaise, ketchup, or spicy mayo. The crispy exterior of the chicken contrasts with the tender interior, making it a satisfying and flavorful meal. It’s a popular choice for fast food or casual dining, offering a delicious alternative to traditional beef burgers.",
        category: "Chicken"
    },

    {
        id: "24",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774051/Double_Down_elpay5.jpg",
        title: "Double Down",
        property: "Humburger",
        review: "(45 reviews",
        price: "10",
        description: "The Double Down is a unique and indulgent fast food sandwich that replaces the traditional bun with two pieces of crispy fried chicken fillets. Instead of bread, the chicken fillets act as the bun holding fillings like melted cheese, bacon, and a sauce, typically mayonnaise or a spicy variant. The result is a high-protein, low-carb option that is rich in flavor, with the crispy chicken providing a savory and satisfying crunch. The Double Down is a popular choice for those seeking a more decadent and meat-heavy sandwich.",
        category: "Chicken"
    },

    {
        id: "25",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774069/Family_Bucket_dyqumt.jpg",
        title: "Family Bucket",
        property: "Fried",
        review: "(45 reviews",
        price: "10",
        description: "A Family Bucket is a large serving of food, typically from a fast-food chain, designed to feed multiple people. It usually includes a variety of items such as fried chicken pieces (legs, thighs, wings, and breasts), along with sides like mashed potatoes, coleslaw, biscuits, or fries. The Family Bucket is perfect for sharing at gatherings, providing a convenient and satisfying meal for families or groups of friends. The portion size and variety make it a popular choice for those looking for a hearty and communal meal.",
        category: "Chicken"
    },

    {
        id: "26",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774070/Fried_Chicken_j6wrgd.jpg",
        title: "Fried Chicken",
        property: "Fried",
        review: "(45 reviews",
        price: "10",
        description: "Fried Chicken is a classic dish made by coating chicken pieces in seasoned flour or batter and deep-frying them until golden and crispy. The chicken is usually seasoned with a blend of herbs and spices, giving it a flavorful, savory taste. The frying process creates a crispy outer layer while keeping the meat tender and juicy on the inside. Fried chicken is a popular comfort food, often served with sides like mashed potatoes, coleslaw, or cornbread, making it a satisfying meal for any occasion.",
        category: "Chicken"
    },

    {
        id: "27",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774070/Grilled_Chicken_Burger_fw9k3m.jpg",
        title: "Grilled Chicken Burger",
        property: "Humburger",
        review: "(45 reviews",
        price: "10",
        description: "A Grilled Chicken Burger is a healthier alternative to the classic fried chicken burger. It features a grilled chicken breast seasoned with herbs and spices, placed between a soft bun. The burger is often topped with fresh ingredients like lettuce, tomato, pickles, onions, and cheese, along with sauces such as mayonnaise, mustard, or a tangy barbecue sauce. The grilled chicken provides a flavorful, smoky taste, offering a lighter and juicy option compared to fried chicken burgers, making it a popular choice for those looking for a leaner, yet satisfying meal.",
        category: "Chicken"
    },

    {
        id: "28",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774071/Honey_BBQ_Wings_llg2oz.jpg",
        title: "Honey BBQ Wings",
        property: "BBQ",
        review: "(45 reviews",
        price: "10",
        description: "Honey BBQ Wings are chicken wings that are coated in a sweet and savory sauce made from honey and barbecue sauce. The sauce blends the rich, smoky flavors of BBQ with the sweetness of honey, creating a delicious balance. The wings are typically deep-fried or baked until crispy, then tossed in the sauce for added flavor. This dish is often served as an appetizer or snack, paired with sides like celery, carrots, and dipping sauces such as ranch or blue cheese. The combination of sweetness and tanginess makes honey BBQ wings a crowd favorite.",
        category: "Chicken"
    },

    {
        id: "29",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774071/Hot_Spicy_Chicken_ixi6cy.jpg",
        title: "Hot & Spicy Chicken",
        property: "Spicy",
        review: "(45 reviews",
        price: "10",
        description: "Hot & Spicy Chicken is a flavorful dish where chicken is seasoned with bold spices and heat-inducing ingredients like chili peppers, hot sauce, or cayenne pepper. The chicken can be grilled, fried, or baked to create a crispy exterior while maintaining a juicy, tender interior. The spiciness of the dish provides a fiery kick, while the seasoning adds layers of depth and flavor. Hot & Spicy Chicken is often served with cooling sides like coleslaw, rice, or a refreshing drink to balance the heat. It’s a favorite for those who enjoy bold, spicy flavors.",
        category: "Chicken"
    },

    {
        id: "30",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774072/Popcorn_Chicken_bjnp8m.jpg",
        title: "Popcorn Chicken",
        property: "Fried",
        review: "(45 reviews",
        price: "10",
        description: "Popcorn Chicken consists of small, bite-sized pieces of chicken breast that are seasoned, breaded, and deep-fried until crispy. The name popcorn comes from the small, snackable size of the chicken, making it easy to pop into your mouth, much like popcorn. Often served with dipping sauces such as honey mustard, barbecue, or ranch, popcorn chicken is a popular snack or appetizer in fast food chains and casual dining. Its crispy texture and juicy interior make it a delicious, convenient choice for chicken lovers.",
        category: "Chicken"
    },

    {
        id: "31",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774074/Sweet_Chili_Wings_qxz3v5.jpg",
        title: "Sweet Chili Wings",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Sweet Chili Wings are chicken wings coated in a flavorful, tangy-sweet chili sauce. The sauce typically combines the sweetness of ingredients like honey or sugar with the heat from chili peppers, garlic, and other spices. The wings are usually fried until crispy, then tossed in the sauce to create a glossy, sticky coating. The balance of sweet and spicy flavors makes these wings a popular choice for those who enjoy a bit of heat with a touch of sweetness. They're often served as an appetizer or snack, accompanied by dipping sauces like ranch or blue cheese.",
        category: "Chicken"
    },

    {
        id: "32",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774842/Apple_Pie_nlqgwx.jpg",
        title: "Apple Pie",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Apple Pie is a classic dessert made with a buttery, flaky crust filled with sweetened, spiced apple slices. The apples are typically seasoned with cinnamon, nutmeg, and sugar, creating a warm, aromatic filling. The pie is baked until golden brown, allowing the flavors to meld together and the crust to become crisp. Apple pie is often served warm, sometimes with a scoop of vanilla ice cream or a dollop of whipped cream. It's a beloved comfort food, especially popular in American cuisine, and is often enjoyed during holidays or family gatherings.",
        category: "Cake"
    },

    {
        id: "33",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774839/Biscuits_csmxld.jpg",
        title: "Biscuits",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Biscuits are soft, fluffy baked goods, typically made from a simple dough of flour, butter, baking powder, and milk. They have a light and airy texture, with a golden-brown, slightly crisp outer layer. Biscuits are a popular side dish in Southern cuisine, often served with meals like fried chicken, gravy, or alongside breakfast with eggs and sausage. They can be enjoyed plain or with added ingredients like cheese, herbs, or honey for extra flavor. Biscuits are versatile and comforting, perfect for any time of day.",
        category: "Cake"
    },

    {
        id: "34",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774841/Cheesy_Bites_cnadq6.jpg",
        title: "Cheesy Bites",
        property: "Cheese",
        review: "(45 reviews",
        price: "10",
        description: "Cheesy Bites are bite-sized snacks or appetizers made with a cheesy filling or coating, typically consisting of melted cheese or a cheese blend. They are often breaded or wrapped in dough and then baked or deep-fried to a golden, crispy texture. Cheesy bites can come in various forms, such as small pockets, balls, or sticks, and may be seasoned with herbs or spices for added flavor. They're usually served with dipping sauces like marinara, ranch, or spicy sriracha, making them a popular choice for parties, appetizers, or casual snacking.",
        category: "Cake"
    },

    {
        id: "35",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774842/Chocolate_Lava_Cake_yuataf.jpg",
        title: "Chocolate Lava Cake",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Chocolate Lava Cake is a decadent dessert featuring a rich, molten chocolate center that flows out when cut. The cake is typically made from a blend of chocolate, butter, eggs, and sugar, baked in individual ramekins or molds. The outer layer is firm and fudgy, while the inside remains gooey and molten, creating a delightful contrast in texture. Chocolate lava cake is often served warm, and it's commonly paired with vanilla ice cream or whipped cream to balance the richness. It's a favorite indulgence for chocolate lovers, offering an irresistible burst of flavor with every bite.",
        category: "Cake"
    },

    {
        id: "36",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774842/Cinnamon_Rolls_kp05gp.jpg",
        title: "Cinnamon Rolls",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Cinnamon Rolls are soft, sweet, and sticky pastries made from a dough that is rolled up with a cinnamon-sugar filling. The dough is typically enriched with butter, milk, and eggs, giving it a tender, fluffy texture. After being rolled into a spiral shape, the rolls are baked until golden brown, and then often topped with a creamy glaze or frosting, usually made from powdered sugar, butter, and cream cheese. Cinnamon rolls are a beloved breakfast treat or dessert, often enjoyed warm, with the sweet, aromatic cinnamon flavor making them a comforting favorite.",
        category: "Cake"
    },

    {
        id: "37",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774846/Cornbread_zivrhu.jpg",
        title: "Cornbread",
        property: "Flour",
        review: "(45 reviews",
        price: "10",
        description: "Cornbread is a savory, slightly sweet baked dish made primarily from cornmeal, flour, sugar, eggs, milk, and butter. It has a golden-brown, crumbly texture on the outside with a moist and tender interior. Cornbread is often served as a side dish with Southern meals, such as fried chicken, chili, or barbecue. It can be baked in a pan, cast-iron skillet, or even as muffins. Some variations include adding ingredients like corn kernels, cheese, or jalapeños for extra flavor. Cornbread is a comforting, versatile dish enjoyed for its warm, slightly sweet, and rich taste.",
        category: "Cake"
    },

    {
        id: "38",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774842/Croissants_h9sgpz.jpg",
        title: "Croissants",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Croissants are flaky, buttery, and crescent-shaped pastries originating from France. Made from a laminated dough that involves folding butter into the dough multiple times to create thin layers, croissants are known for their light, airy texture and golden-brown, crisp exterior. They can be enjoyed plain or filled with various ingredients such as chocolate, almond paste, ham, and cheese. Croissants are often served as a breakfast item or snack, and their rich, buttery flavor makes them a beloved pastry around the world.",
        category: "Cake"
    },

    {
        id: "39",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774844/Donuts_n7zv9l.jpg",
        title: "Donuts",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Donuts (or doughnuts) are sweet, fried pastries typically shaped in a ring or sometimes as filled balls. They are made from a dough that is leavened with yeast or baking powder, giving them a light, fluffy texture. Donuts can be glazed with a sugary coating, dipped in chocolate, or sprinkled with toppings like sprinkles, powdered sugar, or cinnamon sugar. Some donuts are filled with jams, creams, or custards. They're a popular breakfast treat or snack, often enjoyed with coffee or milk, and are available in a wide range of flavors and styles.",
        category: "Cake"
    },

    {
        id: "40",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774844/Flatbread_jaf4du.jpg",
        title: "Flatbread",
        property: "Flour",
        review: "(45 reviews",
        price: "10",
        description: "Flatbread is a type of unleavened or lightly leavened bread that is rolled or stretched into thin, flat rounds. Made from simple ingredients like flour, water, and salt, flatbread can be baked, grilled, or cooked on a stovetop. It has a soft, chewy texture or a crispy finish, depending on how it's prepared. Flatbread is a staple in many cultures, including Middle Eastern, Indian, and Mediterranean cuisines. Variations include naan, pita, lavash, and focaccia. It is often served as a side dish, used for wraps, or paired with dips like hummus or tzatziki.",
        category: "Cake"
    },

    {
        id: "41",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774843/Garlic_Bread_dblijf.jpg",
        title: "Garlic Bread",
        property: "Flour",
        review: "(45 reviews",
        price: "10",
        description: "Garlic Bread is a savory side dish made from bread, typically a baguette or Italian loaf, that is spread with a mixture of butter, garlic, and herbs, then baked or toasted until golden and crispy. The garlic butter gives the bread a rich, aromatic flavor, and the herbs (like parsley) add freshness. Garlic bread is often served as an accompaniment to pasta dishes, salads, or soups, and is beloved for its warm, fragrant, and satisfying taste. It's a popular choice in Italian cuisine and casual dining.",
        category: "Cake"
    },

    {
        id: "42",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774844/Mozzarella_Sticks_kda6az.jpg",
        title: "Mozzarella Sticks",
        property: "Cheese",
        review: "(45 reviews",
        price: "10",
        description: "Mozzarella Sticks are deep-fried snacks made from mozzarella cheese, typically coated in a crispy breadcrumb or batter coating. The cheese is cut into sticks, then dipped in an egg wash, breaded, and fried until golden brown and crispy on the outside. Inside, the mozzarella remains soft and gooey. These cheesy treats are often served as appetizers or snacks, accompanied by marinara sauce or ranch dressing for dipping. Mozzarella sticks are a popular comfort food, loved for their delicious combination of crunchy exteriors and melty cheese.",
        category: "Cake"
    },

    {
        id: "43",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732774845/Wraps_hkugmo.jpg",
        title: "Wraps",
        property: "Flour",
        review: "(45 reviews",
        price: "10",
        description: "Wraps are a type of sandwich where ingredients such as meats, vegetables, cheeses, and sauces are rolled up in a flat, flexible tortilla or flatbread. Common fillings include grilled chicken, beef, or vegetables, along with fresh lettuce, tomatoes, cucumbers, and condiments like hummus or ranch dressing. Wraps can be served cold or hot and are often considered a healthier alternative to traditional sandwiches due to their lighter, more compact nature. They are a versatile meal option, easy to customize, and perfect for lunch or a quick snack.",
        category: "Cake"
    },



    {
        id: "44",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775397/7-Up_bbi23e.jpg",
        title: "7-Up",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "7-Up is a refreshing lemon-lime soda with a crisp, citrus flavor, typically served chilled. It's a caffeine-free soft drink often enjoyed on its own or as a mixer in cocktails.",
        category: "Drink"
    },

    {
        id: "45",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775395/Apple_Juice_afgxto.jpg",
        title: "Apple Juice",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Apple Juice is a sweet, refreshing drink made from pressed apples, often enjoyed chilled.",
        category: "Drink"
    },

    {
        id: "46",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775396/Cappuccino_eolmeu.jpg",
        title: "Cappuccino",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "Cappuccino is a popular coffee drink made with equal parts espresso, steamed milk, and frothed milk, creating a rich and creamy texture with a bold coffee flavor.",
        category: "Drink"
    },

    {
        id: "47",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775397/Coca-cola_syhhnh.jpg",
        title: "Coca-cola",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Coca-Cola is a sweet, carbonated soft drink known for its refreshing taste, made with a blend of caramel, caffeine, and other ingredients. It's one of the most popular beverages worldwide.",
        category: "Drink"
    },

    {
        id: "49",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775398/Iced_Tea_nbxdfy.jpg",
        title: "Iced Tea",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "Iced Tea is a chilled, refreshing beverage made by brewing tea and then cooling it over ice. It can be served sweetened or unsweetened and is often flavored with lemon, peach, or other fruits.",
        category: "Drink"
    },



    {
        id: "50",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775398/Latte_dpcgob.jpg",
        title: "Latte",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "A Latte is a coffee drink made with espresso and steamed milk, topped with a small amount of foam. It's creamy and mild in flavor, often enjoyed with flavors like vanilla or caramel.",
        category: "Drink"
    },

    {
        id: "51",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775398/Lemon_Tea_si5aga.jpg",
        title: "Lemon Tea",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "Lemon Tea is a refreshing beverage made by infusing tea with lemon juice, often sweetened to taste. It combines the bold flavors of tea with the tangy citrus of lemon, and can be served hot or iced.",
        category: "Drink"
    },

    {
        id: "52",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775397/Mineral_Water_awq7qb.jpg",
        title: "Mineral Water",
        property: "Natural",
        review: "(45 reviews",
        price: "10",
        description: "Mineral Water is water that contains natural minerals and salts, typically sourced from springs or underground reservoirs. It is often consumed for its clean taste and potential health benefits due to its mineral content.",
        category: "Drink"
    },

    {
        id: "53",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775400/Mountain_Dew_izx21d.jpg",
        title: "Mountain Dew",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Mountain Dew is a citrus-flavored carbonated soft drink known for its bright yellow-green color and refreshing, sweet taste. It contains caffeine and is popular for its bold flavor and energizing effect.",
        category: "Drink"
    },

    {
        id: "54",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775399/Orange_Juice_gzgtkp.jpg",
        title: "Orange Juice",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Orange Juice is a refreshing drink made by extracting juice from fresh oranges. It is naturally sweet and tangy, often enjoyed as a breakfast beverage or a healthy snack.",
        category: "Drink"
    },

    {
        id: "55",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775399/Sprite_l83ama.jpg",
        title: "Sprite",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Sprite is a clear, lemon-lime flavored carbonated soft drink known for its crisp, refreshing taste. It is caffeine-free and often enjoyed on its own or as a mixer in beverages.",
        category: "Drink"
    },

    {
        id: "56",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775399/Strawberry_Milkshake_d16gr0.jpg",
        title: "Strawberry Milkshake",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "A Strawberry Milkshake is a creamy, sweet drink made with blended strawberries, milk, and ice cream. It's often topped with whipped cream and sometimes garnished with a strawberry.",
        category: "Drink"
    },

    {
        id: "57",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775400/Pineapple_Juice_lck2cf.jpg",
        title: "Pineapple Juice",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "Pineapple Juice is a sweet and tangy beverage made from the juice of fresh pineapples. It’s often enjoyed chilled and can be served on its own or mixed into cocktails.",
        category: "Drink"
    },

    {
        id: "48",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775401/Mocktail_uqwiri.jpg",
        title: "Mocktail",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "A Mocktail is a non-alcoholic beverage that mimics the flavors and presentation of a cocktail. It combines fruit juices, soda, herbs, and syrups to create refreshing, flavorful drinks without alcohol.",
        category: "Drink"
    },


    {
        id: "59",
        image: "https://res.cloudinary.com/dxxiercxx/image/upload/v1732775401/Vanilla_Milkshake_smkodq.jpg",
        title: "Vanilla Milkshake",
        property: "Energy",
        review: "(45 reviews",
        price: "10",
        description: "A Vanilla Milkshake is a creamy, sweet drink made by blending vanilla ice cream, milk, and sugar. It's often topped with whipped cream and a cherry for extra flavor.",
        category: "Drink"
    }
];


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