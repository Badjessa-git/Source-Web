package com.lehigh.source;

import java.util.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/*
 * This will be our database, this is where we will be
 * sending our data to our database as well as querrying them
 */
public class Database {

    //We need a conncection to the database
    private Connection dConnection;

    //Private constructor for our database
    private Database() {
        //Empty
    }

    /*
     *  Create the Database that we will be using through out our application to connect to heroku
     */
    static Database getDatabase() {
        //unconfigured database object;
        Database db = new Database();
        Map<String, String> env = System.getenv();
        String db_url = env.get("postgres://fjdfpctspidkxy:40d9a191d6db012d89caa8bb75d4ef8a56ef0e2073fc4e63bcd193b1c7e2d904@ec2-107-22-169-45.compute-1.amazonaws.com:5432/defqfeg6ruk335");
    
        try {
            Class.forName("org.postgresql.Driver");
            URI dbURI = new URI(db_url);
            String username = dbURI.getUserInfo().split(":")[0];
            String password = dbURI.getUserInfo().split(":")[1];

            //Get the Url of the database on Heroku
            String dbURL = "jdbc:postgresql://" + dbURI.getHost() + ':' + dbURI.getPort() + dbURI.getPath();

            //Creating a connection to the database
            Connection con = DriverManager.getConnection(dbURL, username, password);

            //Print erro if null is returned and exit
            if (con == null) {
                System.err.println("Error connecting to the database with DriverManager");
                return null;
            }
            db.dConnection = con;
        } catch (Exception e) {
            System.err.println("There was an error in the connection");
            e.printStackTrace();
        }

        return db;
    }


}