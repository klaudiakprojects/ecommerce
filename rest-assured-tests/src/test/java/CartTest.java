import io.restassured.RestAssured;
import jdk.jfr.Description;
import org.hamcrest.Matchers;
import org.junit.BeforeClass;
import org.junit.Test;
import static io.restassured.RestAssured.*;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import io.restassured.response.Response;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


class DatabaseUtil {

    public static void clearDatabase() throws SQLException, ClassNotFoundException {
        String jdbcUrl = "jdbc:postgresql://localhost:5432/products";
        String username = "postgres";
        String password = "postgres";

        // Register the PostgreSQL driver

        Class.forName("org.postgresql.Driver");

        // Connect to the database

        Connection connection = DriverManager.getConnection(jdbcUrl, username, password);

        // Perform desired database operations

        // Close the connection
        connection.close();
    }
}

public class CartTest {

    @BeforeClass
    public static void setUp() throws SQLException, ClassNotFoundException {
        RestAssured.baseURI = "http://localhost:8888/";


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
}
