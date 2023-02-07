# JS-Inventory-Mock-Server

## Submission Instructions [Please note]

- The Submission should not contain spaces, for example,/js-101 folder/eval will not work
- Do not push node_modules and package_lock.json to GitHub

## Installation

- you can use any node version that works for you ( 14+ )
- please make sure you do not push package-lock.json
- Download and unzip the boilerplate
- Navigate to the correct path

## Folder structure

- index.html
- src
  - scripts
    - index.js
- styles
  - index.css
- README.md
- package.json
- cypress (ignore the file under cypress)

### You haven't taught cypress to run the test cases locally, you can see the passed/ failed test cases and test errors on CP itself.

# Boilerplate

[JS-Inventory-Mock-Server-master.zip](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2022-11-07/JS-Inventory-Mock-Server-master_285620.zip)

## Description

- Create an inventory system, where user will be adding data to their inventory, and can perform basic crud operations.

*All the operations will be performed using json-server.
*You can refer this Documentation: https://www.npmjs.com/package/json-server https://github.com/typicode/json-server

- Create an index.html page where user will be able to add the product data and can see and update in real time.

- Refer this image for more clarity
  ![Screenshot 2022-08-21 at 9.23.50 PM.png](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2022-08-21/Screenshot%202022-08-21%20at%209.23.50%20PM_392260.png)

- Provide a remove and update button on every item.
- Remove will remove the item from dom and your json server database as well.
- Update will prompt an input box which will update the price of any item.

```
use window.prompt
 'const new_price = prompt( ‘Enter new price`)'
```

- Provide two buttons on to for sorting both from high to low and vice versa (based on price).
- Also provide two buttons 'price > 4000" and 'Price <= 4000" for filtering.

#### Note:-

- Always store price as a number not string. Otherwise you may face difficulty while sorting and filtering.
- Sorting and filtering will be done using Json-Server only.

## Requirements

- API details( use `Fetch`)
- `url`: `http://localhost:3000/products`
- query params:
  <!-- sort by price in ascending order -->

  - `_sort=price&_order=asc`: this will sort the products by price in ascending order.
  <!-- sort by price in descending order -->

  - `_sort=price&_order=desc`: this will sort the products by price in descending order.
  <!-- filter the products price <=4000> -->
  - `price_lte=4000` - this will filter the products price <=4000
  - `price_gte=4001` - this will filter the products price >= 4001

- example `http://localhost:3000/products?_sort=price&_order=asc`

- By default when the user loads the page, the user should be shown all products

- You should use JSON server
- use useEffect to display the data on the UI
- db.json is given in the boilerplate with initial data
- Sample product given below

```
 {
     "id": "1667755893510Shoe 2",
     "name": "Shoe 2",
     "price": 1234,
     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing",
     "delivery": "2022-11-06",
     "image": "https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-web-donut-19090.jpg&fm=jpg"
   },
```

#### Things to follow :-

```
 1. Product form input boxes will have IDs as "name", "price", "description", "delivery" & "image" respectively.
 2. Add Product button ID :- "add_product".
 3. Sort Low to High button ID :- "sort-low-to-high"
 4. Sort High to Low button ID :- "sort-high-to-low"
 5. Price > 4000 button ID :-  "greater-than"
 6. Price < = 4000 button ID :- "less-than"
 7. All the products will be appended inside div with ID :- "container".
 8. Every product card will have class :- "item",
 9. The price in every card will have class :- "product_price" ,
 NOTE:- Show only price amount in number, no extra text should be there.
 10.The delivery in every card will have class :- "product_delivery"
 11. The remove button will have class :- "remove_item",
 12. The update button will have class :- "update_price"
```

- you can add styling under the `styles` folder

**Note:- Do not use any other names for the Ids, Classes and local storage key other than those mentioned.**

####

#### Submission guidelines

- You need to **Submit Github Link as well as netify link**.
- Make sure you use masai github account provided by MasaiSchool(submit link to root folder of your repository on github).
- Make Sure you have netify account, else you will be getting zero marks as netify takes down your app in few days if your account does not exist.
