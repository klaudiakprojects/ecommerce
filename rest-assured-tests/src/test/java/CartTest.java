import io.restassured.RestAssured;
import io.restassured.response.Response;
import jdk.jfr.Description;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


class DatabaseUtil {

    public static void clearDatabase() throws SQLException, ClassNotFoundException {
        String jdbcUrl = "jdbc:postgresql://localhost:5432/products";
        String username = "postgres";
        String password = "postgres";

        Class.forName("org.postgresql.Driver");

        Connection connection = DriverManager.getConnection(jdbcUrl, username, password);

        PreparedStatement statement = connection.prepareStatement("DELETE FROM cart_items");
        statement.executeUpdate();

        connection.close();
    }
}

public class CartTest {

    @BeforeAll
    public static void setUp() {
        RestAssured.baseURI = "http://localhost:8888/";
    }

    @BeforeEach
    public void each() throws SQLException, ClassNotFoundException {
        DatabaseUtil.clearDatabase();
    }

    @Test
    @Description("Get should return empty list of products in the basket")
    public void returnEmptyListFromGetRequest() {
        get("/cart").
                then().
                body(equalTo("[]")).
                and().
                statusCode(200);
    }

    @Test
    @Description("Get should return one cart item after post request")
    public void returnOneCartItemAfterPostRequest() {
        given().
                body("{\"productId\":5,\"quantity\":1}").
                when().
                contentType("application/json").
                post("/cart").
                then().
                statusCode(200);

        given().
                when().
                get("/cart").
                then().
                contentType("application/json").
                statusCode(200).
                body("", hasItem(allOf(
                hasEntry("product_id", 5),
                hasEntry("quantity", 1)
        )));
    }

    @Test
    @Description("Get should return empty list after delete request")
    public void returnEmptyListAfterDeleteRequest() {
        given().
                body("{\"productId\":5,\"quantity\":1}").
                when().
                contentType("application/json").
                post("/cart").
                then().
                statusCode(200);

        Response response = given().
                when().
                get("/cart").
                then().
                extract().
                response();

        int cartItemId = response.jsonPath().getInt("[0].cart_item_id");

        given().
                pathParam("cartItemId", cartItemId).
                when().
                delete("/cart/{cartItemId}");

given().
    when().get("/cart").then().statusCode(200).body(equalTo("[]"));

    }

    @Test
    @Description("Delete non existent cart item should return 404")
    public void return404AfterDeletingNonExistentCartItem() {
        given().
                when().
                delete("/cart/54898423").then().statusCode(404);
    }

    @Test
    public void postShouldReturn400AfterSendingIncorrectDataInBody() {
        Object[][] inputs = {
                { "null values", new InputData(null, null) },
                { "undefined values", new InputData(null, null) }, // Java doesn't have 'undefined', use null
                { "empty array", new InputData(new Object[]{}, new Object[]{}) },
                { "period", new InputData(".", ".") },
                { "string test", new InputData("test", "test") },
                { "zero", new InputData(0, 0) },
                { "negative numbers", new InputData(-1, -2) },
                { "float numbers", new InputData(1.2, 1.3) },
                { "empty object", new InputData(new Object(), new Object()) },
                { "array with strings", new InputData(new String[]{"test"}, new String[]{"test"}) },
                { "boolean true", new InputData(true, true) }
        };
}
