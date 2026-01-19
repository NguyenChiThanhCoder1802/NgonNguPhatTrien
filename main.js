let Product = {
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    isAvailable: Boolean
}
//câu 1
Product = function (id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}
//câu 2
let Products = [
    new Product(1, "Laptop", 1500, 10, "Electronics", true),
    new Product(2, "Smartphone", 800, 25, "Electronics", true),
    new Product(3, "Desk Chair", 120, 15, "Furniture", true),
    new Product(4, "Book", 20, 50, "Education", true),
    new Product(5, "Headphones", 200, 30, "Electronics", false),
    new Product(6, "Coffee Maker", 100, 8, "Appliances", true),
];
//Câu 3
let ProductNamePrices = Products.map(product => ({
    name: product.name,
    price: product.price
}));
//Câu 4 
let ProductQuantityOver0 = Products.filter(product => product.quantity > 0);
console.log("ProductQuantityOver0", ProductQuantityOver0);
//Câu 5
let ProductPriceOver = Products.some(product => product.price > 30000000);
console.log("ProductPriceOver", ProductPriceOver);
//Câu 6
let ProductCategory = Products.filter(product => product.category === "Accessories" && product.isAvailable);
console.log("ProductCategory", ProductCategory);
//Câu 7
let Total = Products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
console.log("Total", Total);
//Câu 8
for (const product of Products) {
    console.log("Tên sản phẩm:", product.name);
    console.log("Danh mục:", product.category);
    console.log("Trạng thái:", product.isAvailable);
}
//Câu 9
for (const product in Products) {
    console.log("Tên sản phẩm:", Products[product].name);
    console.log("Giá sản phẩm:", Products[product].price);

}
//câu 10 
let AvailableProductNames = Products
    .filter(product => product.isAvailable && product.quantity > 0)
    .map(product => product.name);
console.log("AvailableProductNames", AvailableProductNames);
