// 'use strict';

// Позиции меню
function Item(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
}

// Параметры гамбургера
function Hamburger(size, stuffing) {
    Item.call(this, Hamburger.name);
    this.price = size.price + stuffing.price;
    this.calories = size.calories + stuffing.calories;
    this.size = size.name;
    this.stuffing = stuffing.name;
}

// Размеры, виды начинок и добавок гамбургера
Hamburger.SIZE_SMALL = {name: 'SmallBurger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'BigBurger', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'withCheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'withSalad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'withPotato', price: 15, calories: 10};

// Узнать размер гамбургера
Hamburger.prototype.getSize = function () {
    console.log('The size of this Burger:' + this.size);
};
// Узнать начинку гамбургера
Hamburger.prototype.getStuffing = function () {
    console.log('This Burger contains:' + this.stuffing);
};
// Узнать цену гамбургера
Hamburger.prototype.calculatePrice = function () {
    console.log('The price of this Burger:' + this.price + ' tgrk');
};
// Узнать калорийность гамбургера
Hamburger.prototype.calculateCalories = function () {
    console.log('Calories in this Burger:' + this.calories + ' kkal');
};
Hamburger.prototype = Object.create(Item.prototype);


// Параметры салата
function Salad(salad, weight) {
    Item.call(this, salad.name);
    var grams = 100;
    this.weight = weight || grams;
    this.calories = this.getCalories(this.calories, grams);
    this.price = this.getPrice(salad.price, grams);
}

// Виды салатов, калорийность и цены
Salad.CAESAR_SALAD = {name: 'Caesar', price: 100, calories: 20};
Salad.OLIVIE_SALAD = {name: 'Olivier', price: 50, calories: 80};

// Узнать кол-во калорий в салате
Salad.prototype.getCalories = function (calories, grams) {
    return (calories * this.weight) / grams;
};
// Узнать итоговую цену салата
Salad.prototype.getPrice = function (price, grams) {
    return (price * this.weight) / grams;
};
Salad.prototype = Object.create(Item.prototype);


// Параметры напитков
function Drink(drink) {
    Item.call(this, drink.name, drink.price, drink.calories);
}

// Виды напитков, калорийность и цены
Drink.COLA_DRINK = {name: 'Cola', price: 50, calories: 40};
Drink.COFFEE_DRINK = {name: 'Coffee', price: 80, calories: 20};

// Узнать кол-во калорий в напитке
Drink.prototype.getCalories = function () {
    console.log('Calories in this Drink:' + this.calories + ' kkal');
};
// Узнать итоговую цену напитка
Drink.prototype.getPrice = function () {
    console.log('The price of this Drink:' + this.price + ' tgrk');
};
Drink.prototype = Object.create(Item.prototype);


// Параметры заказа
function Order(...items) {
    this.items = items;
    this.payment = false;
}

Order.prototype = Object.create(Item.prototype);

// Калорийность заказа
Order.prototype.fullCalories = function () {
    var totalCal = 0;
    this.items.forEach(function (item) {
        totalCal += item.calories;
    });
    console.log('Full Calories:' + totalCal + ' kkal')
};

// Удаление позиций
Order.prototype.deleteItem = function (...deleteItem) {
    if (this.payment === false) {
        var search = this.items.findIndex(function (item) {
            return item.name === deleteItem.name;
        }, 1);
        deleteItem.forEach(function (elem) {
            elem.items.splice(search)
        });
        console.log('Item was successfully remove');
    }
    console.log('The order was successfully paid for. You cannot remove a position.');
};

// Добавление позиций
Order.prototype.addItem = function (...newItem) {
    if (this.payment === false) {
        this.items = this.items.concat(newItem);
        console.log('Item was successfully added');
    }
    console.log('The order was successfully paid for. You cannot add a position.');
};

// Стоимость заказа
Order.prototype.fullPrice = function () {
    var totalPrice = 0;
    this.items.forEach(function (item) {
        totalPrice += item.price;
    });
    console.log('Full Price:' + totalPrice + ' tgrk')
};

// Оплата заказа
Order.prototype.payOrder = function () {
    if (this.payment === false) {
        this.payment = true;
        console.log('The order was successfully paid for.');
    }
    console.log('You must pay for the order.');
};


// Пробный заказ
var fastfood = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_SALAD);
var russianSalad = new Salad(Salad.OLIVIE_SALAD, 150);
var notRussianSalad = new Salad(Salad.CAESAR_SALAD, 100);
var americanDrink = new Drink(Drink.COLA_DRINK);
var order = new Order(fastfood, russianSalad, notRussianSalad, americanDrink);

// Данные заказа
console.log(order.fullCalories());
console.log(order.fullPrice());

// Живот урчит во время выполнения этого дз
var moreFastfood = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
var moreEnergy = new Drink(Drink.COFFEE_DRINK);
console.log(order.addItem(moreFastfood, moreEnergy));

// Данные заказа
console.log(order.fullCalories());
console.log(order.fullPrice());

// Минус правильное питание
console.log(order.deleteItem(russianSalad, notRussianSalad, moreEnergy));

// Итоговые данные заказа
console.log(order.fullCalories());
console.log(order.fullPrice());

// Оплата заказа
console.log(order.payOrder());

// Попытка изменить заказ
var moreDrink = new Drink(Drink.COLA_DRINK);
console.log(order.addItem(moreDrink));
console.log(order.deleteItem(moreFastfood));

