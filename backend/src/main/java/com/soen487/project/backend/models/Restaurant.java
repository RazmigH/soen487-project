package com.soen487.project.backend.models;

/**
 * Actually it is not a must in this case, keep it only for futher needs.
 * Created by ericl on 4/1/2017.
 */
public class Restaurant {
    private String name;
    private String address;
    private double rating;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getTypes() {
        return types;
    }

    public void setTypes(String types) {
        this.types = types;
    }

    public boolean isOpen_now() {
        return open_now;
    }

    public void setOpen_now(boolean open_now) {
        this.open_now = open_now;
    }

    private String types;
    private boolean open_now;

    public Restaurant(String name, String address, double rating, String types, boolean open_now){
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.open_now = open_now;
    }


}
