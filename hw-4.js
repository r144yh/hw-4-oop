// Параметры заказа
function Order(...items) {
    this.items = items;
    this.payment = false;
}

// Позиции меню
function Item(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
}

// Параметры гамбургера
function Hamburger(size, stuffing) {
    Item.call(this, Hamburger.name);
    this.stuffing = stuffing;
    this.size = size.name;
    this.calories = this.calculateCalories() + size.calories;
    this.price = this.calculatePrice() + size.price;
}

Hamburger.prototype = Object.create(Item.prototype);

// Размеры, виды начинок и добавок гамбургера
Hamburger.SIZE_SMALL = {name: 'SmallBurger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'BigBurger', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'withCheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'withSalad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'withPotato', price: 15, calories: 10};

// Узнать размер гамбургера
Hamburger.prototype.getSize = function () {
    return ('The size of this Burger: ' + this.size);
};
// Узнать начинку гамбургера
Hamburger.prototype.getStuffing = function () {
    return ('This Burger contains: ' + this.stuffing);
};
// Узнать цену гамбургера
Hamburger.prototype.calculatePrice = function () {
    var totalPrice = 0;
    this.stuffing.forEach(function (stuff) {
        totalPrice += stuff.price;
    });
    return totalPrice;
};
// Узнать калорийность гамбургера
Hamburger.prototype.calculateCalories = function () {
    var totalCalc = 0;
    this.stuffing.forEach(function (stuff) {
        totalCalc += stuff.calories;
    });
    return totalCalc;
};


// Параметры салата
function Salad(salad, weight) {
    Item.call(this, salad.name);
    var grams = 100;
    this.weight = weight || 100;
    this.calories = this.getCalories(salad.calories, weight, grams);
    this.price = this.getPrice(salad.price, weight, grams);
}

Salad.prototype = Object.create(Item.prototype);

// Виды салатов, калорийность и цены
Salad.CAESAR_SALAD = {name: 'Caesar', price: 100, calories: 20};
Salad.OLIVIE_SALAD = {name: 'Olivier', price: 50, calories: 80};

// Узнать кол-во калорий в салате
Salad.prototype.getCalories = function (calories, weight, grams) {
    return (calories * weight) / grams;
};
// Узнать итоговую цену салата
Salad.prototype.getPrice = function (price, weight, grams) {
    return (price * weight) / grams;
};


// Параметры напитков
function Drink(drink) {
    Item.call(this, drink.name, drink.price, drink.calories);
}

Drink.prototype = Object.create(Item.prototype);

// Виды напитков, калорийность и цены
Drink.COLA_DRINK = {name: 'Cola', price: 50, calories: 40};
Drink.COFFEE_DRINK = {name: 'Coffee', price: 80, calories: 20};

// Узнать кол-во калорий в напитке
Drink.prototype.getCalories = function () {
    return ('Calories in this Drink: ' + this.calories + ' kkal');
};
// Узнать итоговую цену напитка
Drink.prototype.getPrice = function () {
    return ('The price of this Drink: ' + this.price + ' tgrk');
};


Order.prototype = Object.create(Item.prototype);

// Калорийность заказа
Order.prototype.fullCalories = function () {
    var totalCal = 0;
    this.items.forEach(function (item) {
        totalCal += item.calories;
    });
    return ('Full Calories: ' + totalCal + ' kkal')
};

// Удаление позиций
Order.prototype.deleteItem = function (deleteItem) {
    if (this.payment === false) {
        if ((this.items.indexOf(deleteItem)) === -1) {
            return ('There is no such item in the order.')
        } else {
            var elem = this.items.indexOf(deleteItem);
            this.items.splice(elem, 1);
            return ('Item was successfully remove');
        }
    }
    return ('The order was successfully paid for. You cannot remove a position.');
};

// Добавление позиций
Order.prototype.addItem = function (...newItem) {
    if (this.payment === false) {
        this.items = this.items.concat(newItem);
        return ('Item was successfully added');
    }
    return ('The order was successfully paid for. You cannot add a position.');
};

// Стоимость заказа
Order.prototype.fullPrice = function () {
    var totalPrice = 0;
    this.items.forEach(function (item) {
        totalPrice += item.price;
    });
    return ('Full Price: ' + totalPrice + ' tgrk')
};

// Оплата заказа
Order.prototype.payOrder = function () {
    if (this.payment === false) {
        this.payment = true;
        return ('The order was successfully paid for.');
    }
    return ('You must pay for the order.');
};


// Пробный заказ
var fastfood = new Hamburger(Hamburger.SIZE_SMALL, [Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_SALAD]);
var russianSalad = new Salad(Salad.OLIVIE_SALAD, 150);
var notRussianSalad = new Salad(Salad.CAESAR_SALAD, 100);
var americanDrink = new Drink(Drink.COLA_DRINK);
var order = new Order(fastfood, russianSalad, notRussianSalad, americanDrink);

// Данные заказа
console.log(order.fullCalories());
console.log(order.fullPrice());

// Живот урчит во время выполнения этого дз
var moreFastfood = new Hamburger(Hamburger.SIZE_SMALL, [Hamburger.STUFFING_POTATO]);
var moreEnergy = new Drink(Drink.COFFEE_DRINK);
console.log(order.addItem(moreFastfood, moreEnergy));

// Данные заказа
console.log(order.fullCalories());
console.log(order.fullPrice());

// Минус правильное питание
console.log(order.items);
console.log(order.deleteItem(russianSalad));
console.log(order.items);
console.log(order.deleteItem(russianSalad));
console.log(order.deleteItem(notRussianSalad));
console.log(order.items);

// Итоговые данные заказа
console.log(order.fullCalories());
console.log(order.fullPrice());

// Оплата заказа
console.log(order.payOrder());

// Попытка изменить заказ
var moreDrink = new Drink(Drink.COLA_DRINK);
console.log(order.addItem(moreDrink));
console.log(order.deleteItem(moreFastfood));

