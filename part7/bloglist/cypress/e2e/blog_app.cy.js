describe("Blog App Test", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
      username: "testuser",
      password: "testpassword",
      name: "Test User",
    });

    cy.visit("");
  });

  describe("Test Login attempts", () => {
    it("Login form is shown", function () {
      cy.contains("login").click();
      cy.contains("username");
      cy.contains("password");
      cy.contains("login");
      cy.contains("cancel");
    });

    it("Successful login", function () {
      cy.contains("login").click();

      // Fill in the login form with valid credentials
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login").click();

      // Assert that the user is logged in (you may need to adapt this based on your app's behavior)
      cy.contains("logged in"); // This assumes a successful login message is displayed.
    });

    it("Unsuccessful login", function () {
      cy.contains("login").click();

      // Fill in the login form with invalid credentials
      cy.get("#username").type("testuser");
      cy.get("#password").type("wrongpassword");
      cy.get("#login").click();

      // Assert that the login failed (you may need to adapt this based on your app's behavior)
      cy.contains("Wrong credentials").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)",
      );
    });
  });

  describe("After Succesfull login", () => {
    beforeEach(function () {
      cy.login({
        username: "testuser",
        password: "testpassword",
      });
    });

    it("A blog can be created and it appears in list", function () {
      cy.contains("New Note").click();

      cy.get("#title").type("New Blog Title");
      cy.get("#author").type("Author");
      cy.get("#url").type("http://localhost.local");

      cy.get("#create").click();

      cy.contains("New Blog Title by Author added");

      cy.contains("New Blog Title Author");
      cy.contains("Show Details").click();
      cy.contains("http://localhost.local");
    });

    describe("Operations on Listed Blog", () => {
      beforeEach(function () {
        cy.addBlog({
          title: "Test Blog",
          author: "Test Author",
          url: "http://testblog.com",
        });
      });
      it("A blog can be liked", function () {
        // Find and click the "Show Details" button to view the blog details
        cy.contains("Show Details").click();

        // Find and click the "Like" button on the blog
        cy.get("#upvotes").click();

        // After clicking "Like," you may want to confirm that the like count has increased by 1.
        // You can find the element that displays the like count and assert its new value.
        cy.contains("upvotes: 1"); // This assumes the initial like count was 0.

        // Optionally, you can click "Like" again to verify multiple likes.
        cy.get("#upvotes").click();
        cy.contains("upvotes: 2"); // This assumes the count increases with each like.
      });

      it("A blog can be removed", () => {
        cy.contains("Show Details").click();
        cy.get("#remove").click();

        cy.contains("Test Blog Test Author").should("not.exist");
      });

      it("A different user cannot remove the blog created by other user", () => {
        cy.contains("logout").click();

        cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
          username: "testuser1",
          password: "testpassword",
          name: "Test User1",
        });

        cy.login({
          username: "testuser1",
          password: "testpassword",
        });

        cy.contains("Show Details").click();

        cy.get("#remove").should("not.exist");
      });

      it("Blogs are order by number of likes", function () {
        cy.get(".blog").eq(0).get("#showDetails").click();
        cy.get(".blog").eq(0).get("#upvotes").click();
        cy.get(".blog").eq(0).get("#upvotes").click();

        cy.addBlog({
          title: "Second Blog",
          author: "Second Author",
          url: "http://testblog.com",
        });

        //The part below ensures that initially Test blog with 2 upvotes is at top of second blog
        cy.get(".blog").eq(0).should("contain", "Test Blog");
        cy.get(".blog").eq(1).should("contain", "Second Blog");

        cy.contains("Second Blog").parent().contains("Show Details").click();
        // expanding second blog and upvoting it 3 times
        cy.contains("upvote").click();
        cy.contains("upvote").click();
        cy.contains("upvote").click();

        // Now checking if ordering has changed

        cy.get(".blog").eq(0).should("contain", "Second Blog");
        cy.get(".blog").eq(1).should("contain", "Test Blog");
      });
    });
  });
});
