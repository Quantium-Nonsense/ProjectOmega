/*
package com.project.omega.bean;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
@Builder
public class User extends BaseEntity {

    private String name;
    private String email;
    private String country;
    private String city;

    public User(String id, String name, String email, String country, String city) {
        super.id = id;
        this.name = name;
        this.email = email;
        this.country = country;
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public static class UserBuilder {

        private String id;
        private String name;
        private String email;
        private String country;
        private String city;


        public UserBuilder() {
        }

        public UserBuilder setId(String id) {
            this.id = id;
            return this;
        }

        public UserBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder setCountry(String country) {
            this.country = country;
            return this;
        }

        public UserBuilder setCity(String city) {
            this.city = city;
            return this;
        }

        public User build() {
            return new User(id, name, email, country, city);
        }
    }

}
*/
