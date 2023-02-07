import "cypress-localstorage-commands";
// import data from "../../submissionData.json"; // do not create this file

let data = [{ submission_link: "http://localhost:5500", id: 67890 }];

describe("Test", () => {
  let acc_score = 1;
  let initialData = 0;
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  data.map(({ submission_link: url, id }) => {
    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }

    it("Should make get request to the mock server when page loads", () => {
      cy.visit(url);
      cy.intercept("GET", "**/products").as("get-products");
      cy.wait("@get-products").then((res) => {
        // console.log(res.body.length);
        initialData += res.response.body.length;
        expect(res.response).to.have.property("statusCode", 200);
      });
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("Should post the data on mock server", () => {
      cy.visit(url);
      cy.get("#name").type("Shoe-1");
      cy.get("#price").type(3000);
      cy.get("#description").type("sample");
      cy.get("#image").type(
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b3a42f2af8c3435384ddaebd00c7c95c_9366/SEIZE_THE_STREET_SHOES_White_GA1134_01_standard.jpg"
      );
      cy.get("#add_product").click();
      cy.then(() => {
        initialData += 1;
      });
      cy.intercept("POST", "**/products").as("post-products");
      //   cy.wait("@post-products").then(console.log);
      cy.wait("@post-products").then((res) => {
        // console.log(res);
        expect(res.response).to.have.property("statusCode", 201);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("should be able to post more than one data", () => {
      cy.get("#name").type("Shoe-2");
      cy.get("#price").type(5000);
      cy.get("#description").type("sample-2");
      cy.get("#image").type(
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b3a42f2af8c3435384ddaebd00c7c95c_9366/SEIZE_THE_STREET_SHOES_White_GA1134_01_standard.jpg"
      );
      cy.get("#add_product").click();
      cy.then(() => {
        initialData += 1;
      });
      cy.intercept("GET", "**/products").as("get-products");
      cy.wait("@get-products").then((res) => {
        // console.log(res);
        expect(res.response.body).to.have.length(initialData);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("After posting new data DOM should also be updated", () => {
      cy.get("#container").children().should("have.length", initialData);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should update price using window.prompt", () => {
      cy.visit(url);
      cy.window().then((win) => {
        cy.stub(win, "prompt").returns(8888);
      });
      cy.get(".update_price").eq(1).click();
      cy.intercept("PATCH", "**/products/*").as("patch-product");
      cy.wait("@patch-product").then((res) => {
        // console.log(res);
        expect(res.response).to.have.property("statusCode", 200);
      });

      cy.wait(1000);
      cy.get(".product_price").eq(1).should("have.text", 8888);

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("On clicking remove it should remove that item", () => {
      cy.get(".remove_item").eq(1).click();
      cy.then(() => {
        initialData -= 1;
      });
      cy.intercept("DELETE", "**/products/*").as("delete-product");
      cy.wait("@delete-product").then((res) => {
        // console.log(res);
        expect(res.response).to.have.property("statusCode", 200);
      });

      cy.get("#container").children().should("have.length", initialData);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("Sorting low to high should sort the data using query params", () => {
      cy.get("#sort-low-to-high").click();
      // var d = new Date("2011-04-20T09:30:51.01");
      // console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
      cy.wait(10000);
      cy.get(".product_price").then((x) => {
        const temp = [];
        for (const el of x) {
          temp.push(+el.innerText);
        }

        let sorted = true;
        for (let x = 0; x < temp.length - 1; x++) {
          if (temp[x] > temp[x + 1]) {
            sorted = false;
          }
        }
        assert.isTrue(sorted);
      });
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("Sorting high to low should sort the data using query params", () => {
      cy.get("#sort-high-to-low").click();
      cy.wait(10000);
      cy.get(".product_price").then((x) => {
        const temp = [];
        for (const el of x) {
          temp.push(+el.innerText);
        }

        let sorted = true;
        for (let x = 0; x < temp.length - 1; x++) {
          if (temp[x] < temp[x + 1]) {
            sorted = false;
          }
        }
        assert.isTrue(sorted);
      });
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("filtering items with price > 4000 should filter the data using query param", () => {
      cy.get("#greater-than").click();
      cy.wait(10000);
      cy.get(".product_price").then((x) => {
        const temp = [];
        for (const el of x) {
          temp.push(+el.innerText);
        }

        let sorted = true;
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] < 4000) {
            sorted = false;
          }
        }
        assert.isTrue(sorted);
      });
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("filtering items with price < 4000 should filter the data using query param", () => {
      cy.get("#less-than").click();
      cy.wait(10000);
      cy.get(".product_price").then((x) => {
        const temp = [];
        for (const el of x) {
          temp.push(+el.innerText);
        }

        let sorted = true;
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] > 4000) {
            sorted = false;
          }
        }
        assert.isTrue(sorted);
      });
      cy.then(() => {
        acc_score += 1;
      });
    });
  });
});
